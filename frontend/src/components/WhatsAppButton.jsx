import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:right-8 group">
      <div className="absolute inset-0 rounded-full animate-cyan-pulse" style={{ animationDuration: "3s" }} />
      <a
        href="https://wa.me/96512345678?text=Hi%20Luexe%20Digital,%20I'd%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      
      {/* Tooltip */}
      <div className="absolute right-full top-1/2 mr-4 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 pointer-events-none translate-x-2 group-hover:translate-x-0">
        Chat with us
        {/* Triangle pointer */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-white" />
      </div>
    </div>
  );
}
