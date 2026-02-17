import { useState } from 'react'
import assets from '../assets/assets';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-secondary dark:bg-gray-900/70'
        initial={{opacity:0, y: -50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.6, ease: 'easeOut'}}
        >
            {/* logo */}
            <img
                src={assets.logo}
                className='w-20 sm:w-20 cursor-pointer'
                alt='logo'
            />

            <div className={`text-white sm:text-sm ${isMenuOpen ? "max-sm:w-60 max-sm:pl-10" : "max-sm:w-0 overflow-hidden"} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all duration-300 ease-in-out`}>

                <img src={assets.close_icon} alt="" className='w-5 absolute right-4 top-4 sm:hidden cursor-pointer' onClick={() => setIsMenuOpen(false)} />

                <a href="#" onClick={() => setIsMenuOpen(false)} className='sm:hover:border-b'>Home</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className='sm:hover:border-b'>Salah Tracer</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className='sm:hover:border-b'>Tasbeeh Counter</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className='sm:hover:border-b'>Qibla Finder</a>
            </div>

            <div className='flex items-center gap-2 sm:gap-4'>

                <img src={assets.menu_icon_dark} onClick={() => setIsMenuOpen(true)} alt="" className='w-8 sm:hidden cursor-pointer' />

                <a href="#contact-us" className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-dark px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all'>Download the App
                </a>
            </div>
        </div>
    )
}

export default Navbar;