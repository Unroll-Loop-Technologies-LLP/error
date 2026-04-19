import { useCallback, useRef, useState } from "react";

/**
 * Custom hook for managing sound effects
 *
 * Usage:
 * ```tsx
 * const { playSound, toggleMute, isMuted } = useSoundEffects({
 *   click: '/sounds/click.mp3',
 *   success: '/sounds/success.mp3',
 *   error: '/sounds/error.mp3',
 * });
 *
 * // Play a sound
 * playSound('click');
 *
 * // Toggle mute
 * <button onClick={toggleMute}>
 *   {isMuted ? 'Unmute' : 'Mute'}
 * </button>
 * ```
 *
 * Note: Add your own sound files to the public directory
 */

interface SoundMap {
  [key: string]: string;
}

export function useSoundEffects(sounds: SoundMap) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("sound-muted");
    return saved === "true";
  });

  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Preload sounds
  const preloadSound = useCallback((key: string, url: string) => {
    if (!audioRefs.current.has(key)) {
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.volume = 0.5;
      audioRefs.current.set(key, audio);
    }
  }, []);

  // Preload all sounds on mount
  Object.entries(sounds).forEach(([key, url]) => {
    preloadSound(key, url);
  });

  const playSound = useCallback(
    (key: string) => {
      if (isMuted) return;

      const audio = audioRefs.current.get(key);
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.warn(`Failed to play sound: ${key}`, err);
        });
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newValue = !prev;
      localStorage.setItem("sound-muted", String(newValue));
      return newValue;
    });
  }, []);

  return {
    playSound,
    toggleMute,
    isMuted,
  };
}
