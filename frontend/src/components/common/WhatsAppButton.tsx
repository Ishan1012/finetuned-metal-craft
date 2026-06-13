import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({ 
  phoneNumber = "919303311384", 
  message = "Hi! I'm interested in your metal fabrication services." 
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      {/* Button */}
      <div className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with us
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-primary" />
      </div>
    </a>
  );
}
