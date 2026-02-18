import React, { useState, useEffect } from 'react';

const countries = [
  { name: 'Saudi Arabia', cities: ['Mecca', 'Medina', 'Riyadh', 'Jeddah', 'Dammam'] },
  { name: 'United Arab Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'] },
  { name: 'Pakistan', cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'] },
  { name: 'India', cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Chennai'] },
  { name: 'Bangladesh', cities: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'] },
  { name: 'Turkey', cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'] },
  { name: 'Egypt', cities: ['Cairo', 'Alexandria', 'Giza', 'Luxor'] },
  { name: 'Indonesia', cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan'] },
  { name: 'Malaysia', cities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Malacca'] },
  { name: 'United Kingdom', cities: ['London', 'Birmingham', 'Manchester', 'Leeds'] },
  { name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
  { name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
  { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'] },
  { name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice'] },
  { name: 'Germany', cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'] },
];

const LocationSelector = ({
  locationStatus,
  onRequestLocation,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
  onLocationSelect,
  error,
}) => {
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.name === selectedCountry);
      setAvailableCities(country ? country.cities : []);
      onCityChange(''); // Reset city when country changes
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  return (
    <div className="max-w-2xl mx-auto mb-8">
      {/* Geolocation Request Card */}
      {locationStatus === 'requesting' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300">
            Requesting location access...
          </p>
        </div>
      )}

      {locationStatus === 'granted' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
          <p className="text-sm sm:text-base text-green-700 dark:text-green-300">
            ✓ Location access granted
          </p>
        </div>
      )}

      {/* Manual Location Selection */}
      {(locationStatus === 'denied' || locationStatus === 'manual') && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Your Location
            </h3>
            <button
              onClick={onRequestLocation}
              className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
            >
              <span>📍</span>
              Use My Location
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {/* Country Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                disabled={!selectedCountry}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select City</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={onLocationSelect}
            disabled={!selectedCountry || !selectedCity}
            className="w-full bg-primary text-dark px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Get Prayer Times
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
