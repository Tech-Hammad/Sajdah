import React from "react";
import assets, { socialIcons } from "../assets/assets";
const date = new Date().getFullYear();

const Footer = () => {
  return (
    <footer
      className="bg-[#0f2b1c] text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(15,43,28,.9),rgba(15,43,28,.9)),url(${assets.footer_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-5 items-center">

        <div>
          <img src={assets.logo} className="w-20 ml-8" alt="logo" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Connect with us</h2>
          <div className="flex justify-center gap-4">
            {[socialIcons.facebook, socialIcons.github, socialIcons.google, socialIcons.linkedin].map((icon, i) => (
              <div key={i} className="w-12 h-12 border-2 border-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-400 transition">
                <img src={icon} className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-2xl font-serif mb-4">Subscribe Newsletter</h2>
          <div className="flex bg-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-6 py-3 text-black outline-none"
            />
            <button className="bg-yellow-400 px-8 font-semibold text-black hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-white-600" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        <div>
          <h2 className="text-2xl font-serif mb-4">Information</h2>
          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-serif mb-6">Contact Info</h2>

          <div className="flex items-center gap-4 mb-5">
            <div className="bg-yellow-400 p-3 rounded-full">
              <img src={assets.phone} className="w-5" />
            </div>
            <div>
              <p className="font-semibold">Phone No:</p>
              <p className="hover:text-yellow-400 cursor-pointer transition">+92 (300) 1234 567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="bg-yellow-400 p-3 rounded-full">
              <img src={assets.mail} className="w-5" />
            </div>
            <div>
              <p className="font-semibold">Email Address:</p>
              <p className="hover:text-yellow-400 cursor-pointer transition">info.Sajdah@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-3 rounded-full">
              <img src={assets.location} className="w-5" />
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p className="hover:text-yellow-400 cursor-pointer transition">123 Iqbal Town, Lahore, Pakistan</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-6">Quick Links</h2>
          <ul className="grid grid-cols-2 gap-y-3 text-white-300">
            {[
              "Salah Tracking",
              "Tasbeeh Counter",
              "Sehri & Iftar",
              "Qibla Finder",
              "Islamic Calendar",
              "About Ibadat",
              "Quranic Verses",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
                <span className="text-yellow-400">›</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white-800 py-4 px-6 flex flex-col md:flex-row justify-between text-sm text-white-300">
        <p>Copyright © Sajdah {date}. All rights reserved.</p>
        <a href="https://github.com/Tech-Hammad/Sajdah" className="hover:text-yellow-400 cursor-pointer">Developer Github Repository Link</a>
        <div className="flex gap-6 mt-2 md:mt-0">
          <span className="hover:text-yellow-400 cursor-pointer">Terms and Conditions</span>
          <span className="hover:text-yellow-400 cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
