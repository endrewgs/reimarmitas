import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, SkipForward, Music } from "lucide-react";
import { Button } from "./ui/button";

const PLAYLIST = [
  {
    title: "Happy - Pharrell Williams",
    src: "/music/happy.mp3",
  },
  {
    title: "Can't Stop The Feeling! - Justin Timberlake",
    src: "/music/cant-stop-the-feeling.mp3",
  },
];

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cria o elemento de áudio apenas uma vez
    audioRef.current = new Audio(PLAYLIST[0].src);
    audioRef.current.volume = 0.1; // Volume baixo (10%) como solicitado

    // Tenta tocar automaticamente quando a música terminar (próxima faixa)
    const handleEnded = () => {
      handleNext();
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);

  // Monitora interação do usuário para tentar dar play (bypass autoplay policy)
  useEffect(() => {
    const tryAutoPlay = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Falha silenciosa se o navegador bloquear (comum)
            console.log("Autoplay bloqueado aguardando clique");
          });
      }
    };

    // Adiciona listener de clique na página inteira para iniciar o áudio na primeira interação
    window.addEventListener("click", tryAutoPlay, { once: true });

    return () => window.removeEventListener("click", tryAutoPlay);
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentSongIndex].src;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao tocar:", e));
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-card/80 backdrop-blur-md p-2 rounded-full shadow-lg border border-border transition-all hover:opacity-100 opacity-70 hover:scale-105">
      
      {/* Botão Play/Pause */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-primary/20"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Info da Música (Visível apenas quando tocando ou hover) */}
      <div className="hidden md:flex items-center gap-2 px-2 overflow-hidden max-w-[150px]">
        <Music className={`h-3 w-3 ${isPlaying ? 'animate-pulse text-secondary' : 'text-muted-foreground'}`} />
        <span className="text-xs truncate font-medium">
          {PLAYLIST[currentSongIndex].title}
        </span>
      </div>

      {/* Controles Extras */}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/20"
          onClick={handleNext}
          title="Próxima"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/20"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};