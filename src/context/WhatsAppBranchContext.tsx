import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

// --- CONFIGURE SEUS NÚMEROS AQUI ---
const BRANCHES = [
  {
    id: 'curitiba',
    name: 'Matriz Curitiba',
    address: 'Toda a região de Curitiba',
    phone: '5541999851704', 
  },
  {
    id: 'fazenda',
    name: 'Unidade Fazenda Rio Grande',
    address: 'Exclusivo Fazenda Rio Grande',
    phone: '5541997030071',
  }
];

type BranchCallback = (phoneNumber: string) => string;

interface WhatsAppBranchContextType {
  openBranchDialog: (callback: BranchCallback) => void;
}

const WhatsAppBranchContext = createContext<WhatsAppBranchContextType | undefined>(undefined);

export const WhatsAppBranchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<BranchCallback | null>(null);

  const openBranchDialog = (callback: BranchCallback) => {
    setPendingCallback(() => callback);
    setIsOpen(true);
  };

  const handleBranchSelect = (phone: string) => {
    if (pendingCallback) {
      const url = pendingCallback(phone);
      
      window.location.href = url;
    }
    
    setIsOpen(false);
    setTimeout(() => setPendingCallback(null), 100);
  };

  return (
    <WhatsAppBranchContext.Provider value={{ openBranchDialog }}>
      {children}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Z-INDEX 9999 e !important para garantir que fique em cima de tudo */}
        <DialogContent className="sm:max-w-md z-[9999] !z-[9999] bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-display font-bold text-foreground">
              Escolha a Unidade
            </DialogTitle>
            <DialogDescription className="text-center">
              Peça o cardápio atualizado via Whatsapp.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {BRANCHES.map((branch) => (
              <Button
                key={branch.id}
                variant="outline"
                className="h-auto py-4 px-6 flex items-center justify-between hover:border-primary/50 hover:bg-primary/5 group transition-all cursor-pointer"
                onClick={() => handleBranchSelect(branch.phone)}
              >
                <div className="flex items-center gap-4 text-left pointer-events-none">
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground text-base">
                      {branch.name}
                    </span>
                    <span className="block text-sm text-muted-foreground font-normal">
                      {branch.address}
                    </span>
                  </div>
                </div>
                <Phone className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors pointer-events-none" />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </WhatsAppBranchContext.Provider>
  );
};

export const useWhatsAppBranch = () => {
  const context = useContext(WhatsAppBranchContext);
  if (context === undefined) {
    throw new Error('useWhatsAppBranch must be used within a WhatsAppBranchProvider');
  }
  return context;
};
