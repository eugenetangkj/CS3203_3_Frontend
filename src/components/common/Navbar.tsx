import Image from "next/image";
import Logo from "../../../public/logo.svg";

/**
This file represents the Navbar component that is used in the web application for
navigation. It is mobile responsive, offering a hambuger menu and a drawer for mobile
screen sizes.  
*/
export default function Navbar() {
    return (
        <nav className="fixed w-full top-0 start-0 z-20 bg-white font-afacad text-lg">
            <div className="flex justify-between items-center px-12">
                {/* Logo */}
                <a href="/">
                    <Image src={Logo} alt="Just Yap!" className="w-40 h-20" />
                </a>


                {/* Links */}
                <div className="flex justify-center items-center space-x-16">
                    <a href="/yap" className='text-yap-brown-900 hover:text-yap-brown-800 duration-200'>Yap!</a>
                    <a href="/polls" className='text-yap-brown-900 hover:text-yap-brown-800 duration-200'>Polls</a>
                    <button className="rounded-full bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 text-white px-6 py-1">Login</button>

                </div>
            </div>

        </nav>

    );
}