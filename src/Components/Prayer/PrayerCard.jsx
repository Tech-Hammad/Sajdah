import React from 'react';
import { namazIcons } from '../../assets/assets';

const PrayerCard = ({ todayPrayer, currentPrayer, nextPrayer, countdown, timezone }) => {
  if (!todayPrayer) return null;

  const parseTime = (t) => t.split(' ')[0];
  const parseZone = (t) => t.match(/\(([^)]+)\)/)?.[1] || '';

  const prayers = [
    { name: 'Fajr', time: parseTime(todayPrayer.timings.Fajr), zone: parseZone(todayPrayer.timings.Fajr), icon: namazIcons.namaz_Icon_1 },
    { name: 'Dhuhr', time: parseTime(todayPrayer.timings.Dhuhr), zone: parseZone(todayPrayer.timings.Dhuhr), icon: namazIcons.namaz_Icon_2 },
    { name: 'Asr', time: parseTime(todayPrayer.timings.Asr), zone: parseZone(todayPrayer.timings.Asr), icon: namazIcons.namaz_Icon_3 },
    { name: 'Maghrib', time: parseTime(todayPrayer.timings.Maghrib), zone: parseZone(todayPrayer.timings.Maghrib), icon: namazIcons.namaz_Icon_4 },
    { name: 'Isha', time: parseTime(todayPrayer.timings.Isha), zone: parseZone(todayPrayer.timings.Isha), icon: namazIcons.namaz_Icon_5 },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 
        dark:from-primary/20 dark:via-primary/10 dark:to-gray-900 
        rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-lg">

        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Today's Prayer Status
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-1">
            {timezone ? `Timezone: ${timezone}` : 'Timezone: Local Time'}
          </p>
        </div>

        {/* Status Row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Current Prayer", value: currentPrayer || "—", highlight: true },
            { label: "Next Prayer", value: nextPrayer || "—" },
            { label: "Time Remaining", value: countdown || "—", mono: true }
          ].map((item, i) => (
            <div key={i} className="bg-white/80 dark:bg-gray-900/70 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <p className={`text-lg font-bold ${item.highlight ? 'text-primary' : 'text-gray-900 dark:text-white'} ${item.mono ? 'font-mono' : ''}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Prayer Times */}
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Today's Prayer Times ({todayPrayer.date.gregorian.date})
        </h3>

        <div className="grid sm:grid-cols-5 gap-3">
          {prayers.map((prayer) => {
            const isCurrent = currentPrayer === prayer.name;
            const isNext = nextPrayer === prayer.name || nextPrayer?.startsWith(prayer.name);

            return (
              <div
                key={prayer.name}
                className={`rounded-xl p-4 text-center transition-all duration-300 hover:scale-105
                ${isCurrent
                  ? 'bg-primary text-white shadow-lg'
                  : isNext
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {/* Icon */}
                <div className={`mx-auto mb-2 w-10 h-10 flex items-center justify-center rounded-full
                  ${isCurrent ? 'bg-white/20' : isNext ? 'bg-primary/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <img
                    src={prayer.icon}
                    alt={prayer.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                <p className={`text-sm font-semibold mb-1 
                  ${isCurrent ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {prayer.name}
                </p>

                <p className={`text-base font-bold 
                  ${isCurrent ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {prayer.time}
                </p>

                {isCurrent && (
                  <span className="text-xs text-black/90 mt-1 block">Current</span>
                )}

                {isNext && !isCurrent && (
                  <span className="text-xs text-primary mt-1 block font-semibold">Next</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;
