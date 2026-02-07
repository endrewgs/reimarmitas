import { MessageCircle } from "lucide-react";
import { useWhatsAppBranch } from "@/context/WhatsAppBranchContext";

export const FloatingWhatsApp = () => {
  const { openBranchDialog } = useWhatsAppBranch();
  return (
    <button
      type="button"
      onClick={() => openBranchDialog((num) => `https://wa.me/${num}`)}
      className="fixed bottom-20 md:bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full
                 shadow-elevated hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Pedir pelo WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  );
};
