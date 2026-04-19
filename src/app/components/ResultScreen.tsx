import { motion } from "motion/react";
import { CheckCircle, Home, RefreshCw, Gamepad2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { ShareScoreButtons } from "./ShareScoreButtons";

interface Props {
  score: number;
  gameType: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onViewLeaderboard: () => void;
}

export function ResultScreen({ score, gameType, onPlayAgain, onGoHome, onViewLeaderboard }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const getGameTypeName = () => {
    switch (gameType) {
      case "phishing": return "Phishing Detector";
      case "password": return "Password Fortifier";
      case "firewall": return "Firewall Defender";
      default: return "Game";
    }
  };

  const getRank = () => {
    if (score >= 1000) return { label: "ELITE DEFENDER", color: "#ffb000" };
    if (score >= 500) return { label: "SENIOR ANALYST", color: "#00ff41" };
    if (score >= 250) return { label: "SECURITY OFFICER", color: "#00ff41" };
    return { label: "RECRUIT", color: "#ff0040" };
  };

  const rank = getRank();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-[#0a0e27] border-2 border-[#00ff41] p-8 space-y-8" style={{ boxShadow: "0 0 40px #00ff4140" }}>
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex justify-center"
        >
          <CheckCircle className="w-24 h-24 text-[#00ff41]" style={{ filter: "drop-shadow(0 0 20px #00ff41)" }} />
        </motion.div>

        {/* Title */}
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-['Orbitron'] text-3xl text-[#00ff41] tracking-wider"
          >
            SYSTEM SECURED
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-['Share_Tech_Mono'] text-[#ffb000]"
          >
            {getGameTypeName()} - Complete
          </motion.p>
        </div>

        {/* Score */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#151b3d] border-2 border-[#00ff41] p-8 text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff4120] to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 space-y-2">
            <div className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              FINAL SCORE
            </div>
            <div className="font-['VT323'] text-6xl text-[#00ff41]" style={{ textShadow: "0 0 20px #00ff41" }}>
              {displayScore}
              <center><ShareScoreButtons score={displayScore} /></center>
            </div>
            <div
              className="font-['Orbitron'] text-lg tracking-wider"
              style={{ color: rank.color, textShadow: `0 0 10px ${rank.color}` }}
            >
              {rank.label}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGoHome}
            className="relative py-4 font-['Orbitron'] tracking-wider bg-[#0a0e27] border-2 border-[#ffb000] text-[#ffb000] hover:bg-[#ffb00020] transition-all overflow-hidden"
            style={{ boxShadow: "0 0 10px #ffb00040" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#ffb000]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
            <Home className="inline-block mr-2 w-5 h-5" />
            HOME
          </motion.button>

          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="relative py-4 font-['Orbitron'] tracking-wider bg-[#0a0e27] border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4120] transition-all overflow-hidden"
            style={{ boxShadow: "0 0 10px #00ff4140" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff41]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
            <RefreshCw className="inline-block mr-2 w-5 h-5" />
            PLAY AGAIN
          </motion.button>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewLeaderboard}
          className="relative w-full py-4 font-['Orbitron'] tracking-wider bg-[#0a0e27] border-2 border-[#ff0040] text-[#ff0040] hover:bg-[#ff004020] transition-all overflow-hidden"
          style={{ boxShadow: "0 0 10px #ff004040" }}
        >
          <motion.div
            className="absolute inset-0 bg-[#ff0040]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ opacity: 0.1 }}
          />
          <Trophy className="inline-block mr-2 w-5 h-5" />
          VIEW LEADERBOARD
        </motion.button>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center font-['Share_Tech_Mono'] text-xs text-[#ffffff40] pt-4 border-t border-[#00ff4120]"
        >
          Press any key to continue...
        </motion.div>
      </div>
    </motion.div>
  );
}
