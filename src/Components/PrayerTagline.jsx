import React from 'react';
import { namazIcons } from '../assets/assets';

const prayers = [
    { name: "Fajr", time: "3:24 AM", iqamah: "4:15 AM", icon: namazIcons.namaz_Icon_1 },
    { name: "Zuhr", time: "01:09 PM", iqamah: "1:30 PM", icon: namazIcons.namaz_Icon_2 },
    { name: "Asr", time: "6:29 PM", iqamah: "7:30 PM", icon: namazIcons.namaz_Icon_3, },
    { name: "Magrib", time: "9:01 PM", iqamah: "9:01 PM", icon: namazIcons.namaz_Icon_4 },
    { name: "Isha", time: "10:10 PM", iqamah: "10:45 PM", icon: namazIcons.namaz_Icon_5 },
    { name: "Jummah", time: "01:10 PM", iqamah: "02:45 PM", icon: namazIcons.namaz_Icon_6 },
];

const PrayerTagline = () => {
    return (
        <div className="flex justify-center  p-6 bg-white">
            {prayers.map((prayer, index) => {
                const isActive = prayer.active;

                return (
                    <div
                        key={index}
                        className={`w-48 h-[300px] rounded-b-[120px] rounded-t-3xl 
            flex flex-col items-center justify-between py-6 px-4 
            shadow-md border transition-all duration-100
            green-fill-hover
            ${isActive ? "bg-green-700 text-white" : "bg-white text-green-700 hover:text-white"}`}
                    >
                        <div className="green-fill-content flex flex-col items-center  h-full">

                            {/* Icon */}
                            <img src={prayer.icon} alt={prayer.name} className="w-16 h-16 mt-2" />

                            {/* Name */}
                            <div className='mt-4'>
                                <h2 className="text-3xl font-serif">{prayer.name}</h2>
                            </div>

                            {/* Time */}
                            <div className='text-center mt-6'>
                                <p className="text-lg font-semibold">{prayer.time}</p>
                                <p className="text-sm">Iqamah: {prayer.iqamah}</p>
                            </div>

                            {/* Bottom Dot */}
                            <div className="mt-4">
                                <div className="w-4 h-4 rounded-full border-4 border-yellow-500"></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PrayerTagline;
