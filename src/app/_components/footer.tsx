import { Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-gray-50/50 backdrop-blur-sm border-t border-purple-100 py-12 px-6 ${grotesk.className} relative`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50" />
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-6">

                {/* Logo/Name */}
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Ramy Esam
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 text-gray-600 font-medium">
                    <a href="#hero" className="hover:text-purple-600 transition-colors">Home</a>
                    <a href="#about" className="hover:text-purple-600 transition-colors">About</a>
                    <a href="#projects" className="hover:text-purple-600 transition-colors">Projects</a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4">
                    <a href="https://github.com/Ramy29" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:scale-110 hover:shadow-md transition-all text-gray-700 hover:text-black">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/ramy-esam-03845a226/" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:scale-110 hover:shadow-md transition-all text-gray-700 hover:text-blue-600">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/ramy_e_14?igsh=MWR4ZWNzMjZja2owZw==" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:scale-110 hover:shadow-md transition-all text-gray-700 hover:text-pink-600">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/share/14Pv6VLLKeQ" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:scale-110 hover:shadow-md transition-all text-gray-700 hover:text-blue-600">
                        <Facebook className="w-5 h-5" />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-500 pt-4">
                    © {currentYear} Ramy Esam. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
