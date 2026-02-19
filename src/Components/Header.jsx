import React from "react";
import assets, { namazIcons } from "../assets/assets";

const Header = () => {
    return (
        <div className="w-full bg-black/80 text-white text-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src={namazIcons.namaz_Icon_1} className="w-8 h-8 text-yellow-400" alt="sunrise" />
                        <span className="text-yellow-400">Sunrise At:</span>
                        <span>4:44 AM</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={namazIcons.namaz_Icon_5} className="w-8 h-8" alt="sunset" />
                        <span className="text-yellow-400">Sunset At:</span>
                        <span>7:35 PM</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 ">
                    <div className="bg-yellow-400 p-3 rounded-full">
                        <img src={assets.location} className="w-5 h-5" alt="location" />
                    </div>
                    <span className="text-yellow-400 ">Lahore, Pakistan</span>
                </div>

            </div>
        </div>
    );
};

export default Header;
