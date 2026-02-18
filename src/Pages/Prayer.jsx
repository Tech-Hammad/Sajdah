import { useState, useEffect } from 'react';
import PrayerCard from '../Components/Prayer/PrayerCard';
import LocationSelector from '../Components/Prayer/LocationSelector';
import PrayerTable from '../Components/Prayer/PrayerTable';
import LoadingSpinner from '../Components/Prayer/LoadingSpinner';

const Prayer = () => {
  const [prayerTimings, setPrayerTimings] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [todayPrayer, setTodayPrayer] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState('');
  const [nextPrayer, setNextPrayer] = useState('');
  const [countdown, setCountdown] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 'requesting', 'granted', 'denied', 'manual'
  const [locationStatus, setLocationStatus] = useState('requesting'); 
  const [locationName, setLocationName] = useState('');
  
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [timezone, setTimezone] = useState('Local Time');

  // Request geolocation on component mount
  useEffect(() => {
    requestGeolocation();
  }, []);

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('manual');
      setError('Geolocation is not supported by your browser. Please select your location manually.');
      return;
    }

    setLocationStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        setLocationStatus('granted');
        
        // Get location name from coordinates
        try {
          const locationName = await getLocationName(lat, lon);
          setLocationName(locationName);
        } catch (err) {
          console.error('Error fetching location name:', err);
        }
        
        fetchPrayerTimes(lat, lon);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationStatus('manual');
        setError('Location access denied. Please select your location manually.');
      }
    );
  };

  const getLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      if (data.address) {
        const city = data.address.city || data.address.town || data.address.village || '';
        const country = data.address.country || '';
        return city && country ? `${city}, ${country}` : country || 'Your Location';
      }
      return 'Your Location';
    } catch (err) {
      console.error('Error getting location name:', err);
      return 'Your Location';
    }
  };

  const getCoordinatesFromCity = async (city, country) => {
    try {
      const query = `${city}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
      throw new Error('Location not found');
    } catch (err) {
      throw new Error('Failed to find coordinates for the selected city');
    }
  };

  const fetchPrayerTimes = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=2`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error('Failed to fetch prayer times');
      }
      
      const result = await res.json();
      const prayers = [];
      
      if (result.data && result.data.length > 0) {
        const apiTimezone = result.data[0]?.meta?.timezone;
        const fallbackTimezone = result.data[0]?.timings?.Fajr?.match(/\(([^)]+)\)/)?.[1];
        setTimezone(apiTimezone || fallbackTimezone || 'Local Time');

        result.data.forEach((element) => {
          const p = {
            date: element.date.readable,
            weekday: element.date.gregorian.weekday.en,
            hijri: element.date.hijri.date,
            Fajr: element.timings.Fajr,
            Dhuhr: element.timings.Dhuhr,
            Asr: element.timings.Asr,
            Maghrib: element.timings.Maghrib,
            Isha: element.timings.Isha,
            timezone: element.meta?.timezone,
          };
          prayers.push(p);
        });
        
        setPrayerTimings(prayers);
        const todayIndex = new Date().getDate() - 1;
        if (result.data[todayIndex]) {
          setTodayPrayer(result.data[todayIndex]);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch prayer times. Please try again.');
      console.error('Error fetching prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async () => {
    if (!selectedCountry || !selectedCity) {
      setError('Please select both country and city');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const coords = await getCoordinatesFromCity(selectedCity, selectedCountry);
      setLatitude(coords.lat);
      setLongitude(coords.lon);
      setLocationName(`${selectedCity}, ${selectedCountry}`);
      setLocationStatus('manual');
      await fetchPrayerTimes(coords.lat, coords.lon);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const parseTime = (t) => {
    const time = t.split(' ')[0];
    const [h, m] = time.split(':');
    const d = new Date();
    d.setHours(parseInt(h), parseInt(m), 0, 0);
    return d;
  };

  const updatePrayerStatus = () => {
    if (!todayPrayer) return;

    const now = new Date();
    const t = todayPrayer.timings;

    const times = {
      Fajr: parseTime(t.Fajr),
      Dhuhr: parseTime(t.Dhuhr),
      Asr: parseTime(t.Asr),
      Maghrib: parseTime(t.Maghrib),
      Isha: parseTime(t.Isha),
    };

    const order = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    for (let i = 0; i < order.length; i++) {
      if (now < times[order[i]]) {
        setCurrentPrayer(i === 0 ? 'Isha' : order[i - 1]);
        setNextPrayer(order[i]);
        const timeDiff = times[order[i]] - now;
        setCountdown(formatTime(timeDiff));
        return;
      }
    }

    setCurrentPrayer('Isha');
    setNextPrayer('Fajr (Tomorrow)');
    const tomorrowFajr = new Date(times.Fajr);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    const timeDiff = tomorrowFajr - now;
    setCountdown(formatTime(timeDiff));
  };

  const formatTime = (ms) => {
    if (ms < 0) return '0h 0m 0s';
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchPrayerTimes(latitude, longitude);
    }
  }, [month, year]);

  useEffect(() => {
    if (todayPrayer) {
      updatePrayerStatus();
      const interval = setInterval(updatePrayerStatus, 1000);
      return () => clearInterval(interval);
    }
  }, [todayPrayer]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-secondary/5 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-24 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Prayer Times
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {locationName || 'Select your location to view prayer times'}
          </p>
        </div>

        {/* Location Selector */}
        <LocationSelector
          locationStatus={locationStatus}
          onRequestLocation={requestGeolocation}
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          onCountryChange={setSelectedCountry}
          onCityChange={setSelectedCity}
          onLocationSelect={handleLocationSelect}
          error={error}
        />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Today's Prayer Card */}
        {todayPrayer && !loading && (
          <PrayerCard
            todayPrayer={todayPrayer}
            currentPrayer={currentPrayer}
            nextPrayer={nextPrayer}
            countdown={countdown}
            timezone={timezone}
          />
        )}

        {/* Prayer Table */}
        {prayerTimings.length > 0 && !loading && (
          <PrayerTable
            prayerTimings={prayerTimings}
            timezone={timezone}
            month={month}
            year={year}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prayer;
