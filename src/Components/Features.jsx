import React from 'react';

const features = [
  {
    id: 'salah-tracer',
    title: 'Salah Tracer',
    description:
      'Log each prayer, see your weekly and monthly consistency, and stay motivated with gentle reminders.',
  },
  {
    id: 'tasbeeh-counter',
    title: 'Tasbeeh Counter',
    description:
      'A smooth, responsive digital tasbeeh with custom zikr presets and vibration feedback (device support required).',
  },
  {
    id: 'qibla-finder',
    title: 'Qibla Finder',
    description:
      'Quickly find the direction of the Kaaba using your device compass and precise location.',
  },
  {
    id: 'prayer-times',
    title: 'Prayer Times',
    description:
      'Auto-detected location and multiple calculation methods to match your local masjid or region.',
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="px-4 sm:px-12 lg:px-24 xl:px-40 py-16 bg-secondary/10 dark:bg-gray-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-[0.25em]">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Everything you need in one place
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From tracking your salah to staying consistent with dhikr, Sajdah
            brings together the most essential tools for a practicing Muslim in
            one simple app.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={feature.id}
              className="bg-white dark:bg-gray-900 rounded-2xl px-4 py-5 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

