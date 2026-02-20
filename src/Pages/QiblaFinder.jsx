import React, { useState, useEffect, useRef } from 'react';

// Coordinates of the Kaaba in Mecca
const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

const QiblaFinder = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [qiblaBearing, setQiblaBearing] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [compassPermission, setCompassPermission] = useState('requesting');
  
  const compassRef = useRef(null);
  const qiblaArrowRef = useRef(null);

  // Calculate bearing from user location to Mecca
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    bearing = (bearing + 360) % 360;
    return bearing;
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get location name from coordinates
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

  // Request geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        // Get location name
        const name = await getLocationName(lat, lon);
        setLocationName(name);

        // Calculate Qibla bearing
        const bearing = calculateBearing(lat, lon, MECCA_LAT, MECCA_LON);
        setQiblaBearing(bearing);

        // Calculate distance
        const dist = calculateDistance(lat, lon, MECCA_LAT, MECCA_LON);
        setDistance(dist);

        setLoading(false);
      },
      (err) => {
        setError('Location access denied. Please enable location permissions.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Device orientation (compass) handling
  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      setCompassPermission('unsupported');
      return;
    }

    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        // alpha is the compass direction (0-360)
        setDeviceHeading(event.alpha);
      }
    };

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            setCompassPermission('granted');
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setCompassPermission('denied');
          }
        })
        .catch(() => {
          setCompassPermission('denied');
        });
    } else {
      // For non-iOS devices
      setCompassPermission('granted');
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Update compass rotation
  useEffect(() => {
    if (compassRef.current && qiblaBearing !== null) {
      // Rotate compass to show Qibla direction relative to device heading
      const angle = qiblaBearing - deviceHeading;
      compassRef.current.style.transform = `rotate(${-deviceHeading}deg)`;
      if (qiblaArrowRef.current) {
        qiblaArrowRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }
  }, [deviceHeading, qiblaBearing]);

  const requestCompassPermission = () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            setCompassPermission('granted');
            window.addEventListener('deviceorientation', (event) => {
              if (event.alpha !== null) {
                setDeviceHeading(event.alpha);
              }
            });
          } else {
            setCompassPermission('denied');
          }
        })
        .catch(() => {
          setCompassPermission('denied');
        });
    }
  };

  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
  };

  const formatBearing = (bearing) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return `${Math.round(bearing)}° ${directions[index]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-secondary/5 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-24 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Qibla Finder
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the direction of the Kaaba in Mecca from anywhere in the world
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Getting your location...
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && latitude && longitude && (
          <div className="max-w-4xl mx-auto">
            {/* Location Info Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-5 sm:p-6 mb-6">
              <div className="grid sm:grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Your Location
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {locationName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Distance to Mecca
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-primary dark:text-primary-light">
                    {formatDistance(distance)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Qibla Direction
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {formatBearing(qiblaBearing)}
                  </p>
                </div>
              </div>
            </div>

            {/* Compass Card */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-gray-900 rounded-3xl border border-primary/20 dark:border-primary/40 shadow-xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Compass */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-inner"></div>
                  
                  {/* Compass face */}
                  <div
                    ref={compassRef}
                    className="absolute inset-2 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-transform duration-100"
                  >
                    {/* Cardinal directions */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900 dark:text-white">
                      N
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900 dark:text-white">
                      S
                    </div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-900 dark:text-white">
                      W
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-900 dark:text-white">
                      E
                    </div>

                    {/* Degree markers */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <div
                        key={deg}
                        className="absolute top-0 left-1/2 origin-bottom"
                        style={{
                          transform: `translateX(-50%) rotate(${deg}deg)`,
                          transformOrigin: '50% 100%',
                        }}
                      >
                        <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-600"></div>
                      </div>
                    ))}

                    {/* Qibla Arrow */}
                    {qiblaBearing !== null && (
                      <div
                        ref={qiblaArrowRef}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${qiblaBearing - deviceHeading}deg)`,
                        }}
                      >
                        <div className="relative">
                          {/* Arrow pointing to Qibla */}
                          <div className="w-1 h-24 bg-gradient-to-t from-primary to-emerald-400 rounded-full shadow-lg"></div>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-primary"></div>
                        </div>
                      </div>
                    )}

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-2">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Point your device towards the green arrow
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md">
                    The arrow shows the direction to the Kaaba in Mecca. Rotate your device to align the arrow with the top (North).
                  </p>
                </div>

                {/* Compass Permission */}
                {compassPermission === 'requesting' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                      Enable device orientation for compass functionality
                    </p>
                    <button
                      onClick={requestCompassPermission}
                      className="px-6 py-2 bg-primary text-dark rounded-full font-semibold hover:scale-105 transition-transform"
                    >
                      Enable Compass
                    </button>
                  </div>
                )}

                {compassPermission === 'denied' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-center">
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                      Compass access denied. The Qibla direction is still shown, but the compass won't rotate automatically.
                    </p>
                  </div>
                )}

                {compassPermission === 'unsupported' && (
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Device orientation not supported. The Qibla direction is shown, but compass rotation requires device support.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                How to use
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Hold your device flat and rotate it until the green arrow points upward (towards the top of your screen).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>The arrow always points towards the Kaaba in Mecca, regardless of which way you're facing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>For best accuracy, enable compass permissions when prompted and use the device in an open area away from magnetic interference.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>The compass will automatically rotate as you move your device, showing the correct Qibla direction in real-time.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QiblaFinder;
