/**
 * Cybersecurity-Themed Gamified Error Page
 *
 * A fully interactive error page that transforms error states into an engaging
 * cyberpunk gaming experience. Features:
 *
 * - 3 mini-games: Phishing Detector, Password Fortifier, Firewall Defender
 * - localStorage-based leaderboard system
 * - Particle effects and animations powered by Motion & tsparticles
 * - Retro terminal aesthetic with custom fonts and glitch effects
 * - Fully responsive and optimized for performance
 * - No backend required - works entirely client-side
 *
 * DEPLOYMENT:
 * - Vercel: Deploy as-is, works out of the box
 * - Next.js: Use this as pages/404.tsx or app/not-found.tsx
 * - React Router: Add as catch-all route
 *
 * CUSTOMIZATION:
 * - Error codes: Pass different codes to ErrorLanding component
 * - Games: Add more games by creating new components
 * - Styling: Modify CSS variables in theme.css
 * - Leaderboard: Change LEADERBOARD_KEY for separate scoreboards
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ParticleBackground } from "./components/ParticleBackground";
import { ErrorLanding } from "./components/ErrorLanding";
import { ResultScreen } from "./components/ResultScreen";
import { Leaderboard } from "./components/Leaderboard";

// Lazy load games for better performance
const PhishingDetector = lazy(() =>
  import("./components/PhishingDetector").then((module) => ({
    default: module.PhishingDetector,
  }))
);

const PasswordBuilder = lazy(() =>
  import("./components/PasswordBuilder").then((module) => ({
    default: module.PasswordBuilder,
  }))
);

const FirewallDefender = lazy(() =>
  import("./components/FirewallDefender").then((module) => ({
    default: module.FirewallDefender,
  }))
);

type GameType = "phishing" | "password" | "firewall";
type AppState = "landing" | "game" | "result" | "leaderboard";

interface LeaderboardEntry {
  username: string;
  score: number;
  gameType: string;
  timestamp: number;
  id: string;
}

const LEADERBOARD_KEY = "cyber-defense-leaderboard";
const USERNAME_KEY = "cyber-defense-username";

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [username, setUsername] = useState("");
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard and username from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
    if (savedLeaderboard) {
      try {
        setLeaderboardEntries(JSON.parse(savedLeaderboard));
      } catch (e) {
        console.error("Failed to parse leaderboard", e);
      }
    }

    const savedUsername = localStorage.getItem(USERNAME_KEY);
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Save leaderboard to localStorage
  const saveToLeaderboard = (score: number, gameType: string) => {
    let playerName = username;

    if (!playerName) {
      playerName = prompt("Enter your name for the leaderboard:") || "Anonymous";
      setUsername(playerName);
      localStorage.setItem(USERNAME_KEY, playerName);
    }

    const newEntry: LeaderboardEntry = {
      username: playerName,
      score,
      gameType,
      timestamp: Date.now(),
      id: `${Date.now()}-${Math.random()}`,
    };

    const updatedEntries = [...leaderboardEntries, newEntry];
    setLeaderboardEntries(updatedEntries);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedEntries));
  };

  const clearLeaderboard = () => {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
      setLeaderboardEntries([]);
      localStorage.removeItem(LEADERBOARD_KEY);
    }
  };

  const selectRandomGame = () => {
    const games: GameType[] = ["phishing", "password", "firewall"];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setSelectedGame(randomGame);
    setAppState("game");
  };

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
    if (selectedGame) {
      saveToLeaderboard(score, selectedGame);
    }
    setAppState("result");
  };

  const handlePlayAgain = () => {
    selectRandomGame();
  };

  const handleGoHome = () => {
    setSelectedGame(null);
    setAppState("landing");
  };

  const handleViewLeaderboard = () => {
    setAppState("leaderboard");
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const gameProps = {
      onComplete: handleGameComplete,
    };

    switch (selectedGame) {
      case "phishing":
        return <PhishingDetector {...gameProps} />;
      case "password":
        return <PasswordBuilder {...gameProps} />;
      case "firewall":
        return <FirewallDefender {...gameProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative size-full min-h-screen bg-[#0a0e27] overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* CRT Screen Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)",
          }}
        />
      </div>

      {/* Vignette Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(10, 14, 39, 0.8) 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {appState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ErrorLanding errorCode={404} onStartGame={selectRandomGame} />
            </motion.div>
          )}

          {appState === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <Suspense
                fallback={
                  <div className="text-center">
                    <div className="font-['VT323'] text-4xl text-[#00ff41] animate-pulse">
                      LOADING SYSTEM...
                    </div>
                  </div>
                }
              >
                {renderGame()}
              </Suspense>
            </motion.div>
          )}

          {appState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ResultScreen
                score={finalScore}
                gameType={selectedGame || "phishing"}
                onPlayAgain={handlePlayAgain}
                onGoHome={handleGoHome}
                onViewLeaderboard={handleViewLeaderboard}
              />
            </motion.div>
          )}

          {appState === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Leaderboard
                entries={leaderboardEntries}
                currentScore={finalScore}
                onClear={clearLeaderboard}
                onClose={handleGoHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-[#0a0e27] border-t-2 border-[#00ff41] py-2 px-4 z-30"
        style={{ boxShadow: "0 -5px 20px #00ff4140" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-['Share_Tech_Mono'] text-xs text-[#00ff41]">
            CYBER DEFENSE SYSTEM v2.0.26
          </div>
          <div className="flex gap-6 font-['VT323'] text-sm">
            <span className="text-[#ffb000]">
              STATUS: <span className="text-[#00ff41]">ACTIVE</span>
            </span>
            <span className="text-[#ffb000]">
              THREAT LEVEL: <span className="text-[#ff0040]">HIGH</span>
            </span>
          </div>
          <div className="font-['Share_Tech_Mono'] text-xs text-[#ffffff60]">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
