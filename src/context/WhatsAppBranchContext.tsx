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
    address: 'Centro / Batel / Água Verde',
    phone: '5541999999999', // <--- Troque pelo número real da Matriz
  },
  {
    id: 'fazenda',
    name: 'Unidade Fazenda Rio Grande',
    address: 'Região Metropolitana',
    phone: '5541988888888', // <--- Troque pelo número real da Filial
  }
];

type BranchCallback = (phoneNumber: string) => string;

interface WhatsAppBranchContextType {
  openBranchDialog: (callback: BranchCallback) => void;
}

const WhatsAppBranchContext = createContext<WhatsAppBranchContextType | undefined>(undefined);

export const WhatsAppBranchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Armazena a função de callback no estado
  const [pendingCallback, setPendingCallback] = useState<BranchCallback | null>(null);

  const openBranchDialog = (callback: BranchCallback) => {
    // O React pede que, ao salvar uma função no useState, usemos essa sintaxe () => callback
    setPendingCallback(() => callback);
    setIsOpen(true);
  };

  const handleBranchSelect = (phone: string) => {
    if (pendingCallback) {
      const url = pendingCallback(phone);
      
      // --- CORREÇÃO DO ERRO ---
      // window.open é bloqueado em muitos iPhones/Androids.
      // Usar window.location.href força o navegador a abrir o link/app imediatamente.
      window.location.href = url;
    }
    
    // Fecha o modal e limpa o estado
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
              Selecione a unidade mais próxima para agilizar seu atendimento.
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
