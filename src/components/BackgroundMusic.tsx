import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { Button } from "./ui/button";

// Definição do tipo para o TypeScript não reclamar do window
declare global {
  interface Window {
    _bgMusicInstance?: HTMLAudioElement;
  }
}

const SONG_SRC = "/music/happy.mp3";

export const BackgroundMusic = () => {
  // Estado visual apenas (a verdade está no objeto de áudio)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 1. SINGLETON: Verifica se JÁ existe um áudio rodando no navegador
    // Se existir, usamos ele. Se não, criamos um novo e salvamos no window.
    if (!window._bgMusicInstance) {
      const audio = new Audio(SONG_SRC);
      audio.loop = true;
      audio.volume = 0.1;
      window._bgMusicInstance = audio;
    }

    const audio = window._bgMusicInstance!;

    // 2. SINCRONIA: Atualiza o botão baseado na realidade do áudio
    // (Caso ele já estivesse tocando de antes ou tenha sido pausado pelo sistema)
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);

    // Listeners para manter o botão de Play/Pause sempre fiel ao que está acontecendo
    const syncPlay = () => setIsPlaying(true);
    const syncPause = () => setIsPlaying(false);
    
    audio.addEventListener("play", syncPlay);
    audio.addEventListener("pause", syncPause);

    // 3. AUTOPLAY UNLOCKER: Tenta tocar no primeiro clique na tela
    const unlockAudio = () => {
      if (audio.paused) {
        audio.play().catch((e) => console.log("Autoplay bloqueado:", e));
      }
    };
    // Adiciona listener global apenas se estiver pausado
    if (audio.paused) {
      window.addEventListener("click", unlockAudio, { once: true });
    }

    // CLEANUP: Ao sair do componente, apenas removemos os listeners.
    // NÃO pausamos o áudio aqui, para que a música continue ao navegar entre páginas.
    return () => {
      audio.removeEventListener("play", syncPlay);
      audio.removeEventListener("pause", syncPause);
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  // CONTROLES MANUAIS
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = window._bgMusicInstance;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = window._bgMusicInstance;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md p-2 rounded-full shadow-sm border border-border transition-all hover:bg-card/90">
      
      {/* Botão Play/Pause */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-primary/20 text-foreground"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </Button>

      {/* Nome da Música */}
      <div className="hidden md:flex items-center gap-2 px-2 overflow-hidden max-w-[150px]">
        <Music className={`h-3 w-3 ${isPlaying ? 'animate-pulse text-secondary' : 'text-muted-foreground'}`} />
        <span className="text-xs truncate font-medium select-none text-foreground/90">
          Happy - Pharrell Williams
        </span>
      </div>

      {/* Botão Mute */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-primary/20 text-foreground"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

    </div>
  );
};