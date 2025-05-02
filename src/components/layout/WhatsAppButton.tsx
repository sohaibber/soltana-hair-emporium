
import React from "react";
import { Phone } from "lucide-react";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "+1234567890"; // Replace with your business phone number

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      aria-label="Chat with us on WhatsApp"
    >
      <Phone size={24} className="fill-current" />
    </button>
  );
};

export default WhatsAppButton;
