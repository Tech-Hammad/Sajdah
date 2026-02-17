import React from 'react';
import assets from '../assets/assets';

const About = () => {
  return (
    <section
      id="about"
      className="px-4 sm:px-12 lg:px-24 xl:px-40 py-16 bg-white dark:bg-black"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-[0.2em]">
            About Sajdah
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay connected to your deen, wherever you are.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
            Sajdah is built to gently guide you through your day with salah
            reminders, qibla direction, dhikr tools, and more. Whether you are
            at home, at work, or on the go, Sajdah keeps your worship at the
            center of your life.
          </p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
            Our goal is to combine a beautiful, modern interface with reliable
            Islamic tools, making it easier to be punctual with prayers, keep
            up with adhkar, and reconnect with the Quran.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-secondary/20 dark:bg-gray-900 rounded-2xl px-4 py-3">
              <p className="font-semibold text-gray-900 dark:text-white">
                Accurate timings
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by trusted global prayer time calculations.
              </p>
            </div>
            <div className="bg-secondary/20 dark:bg-gray-900 rounded-2xl px-4 py-3">
              <p className="font-semibold text-gray-900 dark:text-white">
                Simple interface
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Clean, focused screens with no distractions.
              </p>
            </div>
            <div className="bg-secondary/20 dark:bg-gray-900 rounded-2xl px-4 py-3">
              <p className="font-semibold text-gray-900 dark:text-white">
                Built for Muslims
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Designed around real daily routines and needs.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
            <img
              src={assets.about_img}
              alt="Muslim using Sajdah app"
              className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

