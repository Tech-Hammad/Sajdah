import React from 'react';
import assets from '../assets/assets';

const Hero = () => {
  return (
    <section className="px-4 sm:px-12 lg:px-24 xl:px-40 pt-10 pb-16 bg-secondary/10 dark:bg-black">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-[0.2em]">
            Assalamu Alaikum
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-4">
            Your daily companion for{' '}
            <span className="text-primary">Salah, Dhikr & Quran</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
            Sajdah is a comprehensive Islamic app designed to assist you in your
            daily worship — from prayer times and qibla direction to tasbeeh,
            reminders, and more.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-primary text-dark px-6 py-3 rounded-full font-medium hover:scale-105 transition-all">
              Download the App
            </button>
            <a
              href="#prayer"
              className="border border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/10 transition-all"
            >
              View Prayer Times
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white">
                Salah Tracer
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track your daily prayers with gentle reminders.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white">
                Tasbeeh Counter
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Beautiful, simple digital tasbeeh wherever you are.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-900/60 rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white">
                Qibla Finder
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Quickly orient yourself towards the Qibla.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/40 dark:border-gray-800">
            <img
              src={assets.hero_img}
              className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover"
            />
          </div>

          <div className="hidden sm:block absolute -bottom-10 -left-6 w-32 sm:w-40 rounded-2xl overflow-hidden shadow-xl border border-white/30 dark:border-gray-800 bg-black/80">
            <img
              src={assets.hero_img_2}
              className="w-full h-32 sm:h-40 object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;