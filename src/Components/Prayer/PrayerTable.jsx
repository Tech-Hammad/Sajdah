import React from 'react';

const PrayerTable = ({ prayerTimings, timezone, month, year, onMonthChange, onYearChange }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const parseTime = (t) => {
    return t.split(' ')[0];
  };

  const getTimezone = () => {
    const first = prayerTimings[0];
    if (!first) return 'Local Time';
    if (first.timezone) return first.timezone;
    const sources = [first.Fajr, first.Dhuhr, first.Asr, first.Maghrib, first.Isha];
    for (const value of sources) {
      if (value) {
        const match = value.match(/\(([^)]+)\)/);
        if (match?.[1]) return match[1];
      }
    }
    return 'Local Time';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Month/Year Selector */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Prayer Times for {monthNames[month - 1]} {year}
          </h2>
          <span className="ml-2 text-sm text-secondary">
            ({timezone || getTimezone()})
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={month}
              onChange={(e) => onMonthChange(parseInt(e.target.value))}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {monthNames.map((name, index) => (
                <option key={index} value={index + 1}>
                  {name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              min="2020"
              max="2030"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent w-24"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/10 dark:bg-primary/20">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Weekday
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Hijri
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Fajr
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Dhuhr
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Asr
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Maghrib
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Isha
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Jumma Mubarik
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {prayerTimings.map((element, index) => {
                const isToday = new Date().toDateString() === new Date(element.date).toDateString();

                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${isToday ? 'bg-primary/5 dark:bg-primary/10' : ''
                      }`}
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {element.date}
                      </div>
                      {isToday && (
                        <span className="text-xs text-primary dark:text-primary-light font-semibold">
                          Today
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {element.weekday}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {element.hijri}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {parseTime(element.Fajr)}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {parseTime(element.Dhuhr)}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {parseTime(element.Asr)}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {parseTime(element.Maghrib)}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {parseTime(element.Isha)}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                      {element.weekday === "Friday"
                        ? parseTime(element.Jumua || element.Dhuhr)
                        : "—"}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrayerTable;
