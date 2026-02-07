import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { BRANCHES_WHATSAPP } from '@/data/products';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';

type GetLinkForNumber = (whatsappNumber: string) => string;

interface WhatsAppBranchContextType {
  openBranchDialog: (getLink: GetLinkForNumber) => void;
}

const WhatsAppBranchContext = createContext<WhatsAppBranchContextType | undefined>(undefined);

/** Formata número (55XXXXXXXXXXX) para exibição: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX */
function formatWhatsAppDisplay(fullNumber: string): string {
  const d = fullNumber.slice(2); // remove 55
  if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  return fullNumber;
}

export const WhatsAppBranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const getLinkRef = useRef<GetLinkForNumber | null>(null);

  const openBranchDialog = useCallback((getLinkForNumber: GetLinkForNumber) => {
    getLinkRef.current = getLinkForNumber;
    setOpen(true);
  }, []);

  const handleSelectBranch = useCallback((whatsappNumber: string) => {
    const getLink = getLinkRef.current;
    if (getLink) {
      const url = getLink(whatsappNumber);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    getLinkRef.current = null;
    setOpen(false);
  }, []);

  return (
    <WhatsAppBranchContext.Provider value={{ openBranchDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              Escolha a unidade para contato
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-4">
            Selecione a unidade que deseja contatar pelo WhatsApp:
          </p>
          <div className="grid gap-3">
            {BRANCHES_WHATSAPP.map((branch) => (
              <button
                key={branch.whatsappNumber}
                type="button"
                onClick={() => handleSelectBranch(branch.whatsappNumber)}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-muted hover:bg-muted/80 hover:border-primary/30 border border-transparent transition-all text-left"
              >
                <span className="font-medium text-foreground">{branch.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatWhatsAppDisplay(branch.whatsappNumber)}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </WhatsAppBranchContext.Provider>
  );
};

export const useWhatsAppBranch = () => {
  const context = useContext(WhatsAppBranchContext);
  if (!context) {
    throw new Error('useWhatsAppBranch must be used within WhatsAppBranchProvider');
  }
  return context;
};
