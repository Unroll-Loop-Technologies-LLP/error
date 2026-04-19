import { motion } from "motion/react";
import { Trophy, User, X } from "lucide-react";

interface LeaderboardEntry {
  username: string;
  score: number;
  gameType: string;
  timestamp: number;
  id: string;
}

interface Props {
  entries: LeaderboardEntry[];
  currentScore?: number;
  onClear: () => void;
  onClose?: () => void;
}

export function Leaderboard({ entries, currentScore, onClear, onClose }: Props) {
  const sortedEntries = [...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const getGameTypeColor = (gameType: string) => {
    switch (gameType) {
      case "phishing": return "#00ff41";
      case "password": return "#ffb000";
      case "firewall": return "#ff0040";
      default: return "#00ff41";
    }
  };

  const getGameTypeLabel = (gameType: string) => {
    switch (gameType) {
      case "phishing": return "PHISHING";
      case "password": return "PASSWORD";
      case "firewall": return "FIREWALL";
      default: return gameType.toUpperCase();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative z-10 w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-[#0a0e27] border-2 border-[#00ff41] p-6 relative" style={{ boxShadow: "0 0 30px #00ff4140" }}>
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#ff0040] hover:text-[#ff0040] opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-[#ffb000]" style={{ filter: "drop-shadow(0 0 10px #ffb000)" }} />
          <h2 className="font-['Orbitron'] text-2xl text-[#00ff41] tracking-wider">
            LEADERBOARD
          </h2>
          <Trophy className="w-8 h-8 text-[#ffb000]" style={{ filter: "drop-shadow(0 0 10px #ffb000)" }} />
        </div>

        {/* Entries */}
        {sortedEntries.length === 0 ? (
          <div className="text-center py-12 font-['Share_Tech_Mono'] text-[#ffb000]">
            No scores yet. Be the first defender!
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries.map((entry, index) => {
              const isCurrentScore = currentScore !== undefined && entry.score === currentScore;
              const rank = index + 1;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 border ${
                    isCurrentScore
                      ? "border-[#00ff41] bg-[#00ff4120]"
                      : "border-[#00ff4140] bg-[#151b3d]"
                  } relative overflow-hidden`}
                  style={{
                    boxShadow: isCurrentScore ? "0 0 20px #00ff4160" : "none",
                  }}
                >
                  {/* Rank */}
                  <div className="w-12 text-center">
                    {rank <= 3 ? (
                      <div
                        className="font-['Orbitron'] text-2xl"
                        style={{
                          color: rank === 1 ? "#ffb000" : rank === 2 ? "#00ff41" : "#ff0040",
                          textShadow: `0 0 10px ${rank === 1 ? "#ffb000" : rank === 2 ? "#00ff41" : "#ff0040"}`,
                        }}
                      >
                        #{rank}
                      </div>
                    ) : (
                      <div className="font-['VT323'] text-xl text-[#ffffff60]">
                        #{rank}
                      </div>
                    )}
                  </div>

                  {/* User icon */}
                  <div className="w-10 h-10 flex items-center justify-center bg-[#0a0e27] border border-[#00ff4160] rounded-full">
                    <User className="w-5 h-5 text-[#00ff41]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="font-['Share_Tech_Mono'] text-white">
                      {entry.username}
                    </div>
                    <div
                      className="font-['Share_Tech_Mono'] text-xs"
                      style={{ color: getGameTypeColor(entry.gameType) }}
                    >
                      {getGameTypeLabel(entry.gameType)} • {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="font-['VT323'] text-3xl text-[#00ff41]">
                    {entry.score}
                  </div>

                  {/* Current indicator */}
                  {isCurrentScore && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2 font-['Share_Tech_Mono'] text-xs text-[#00ff41]"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      YOU
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Clear button */}
        {sortedEntries.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClear}
            className="mt-6 w-full py-3 font-['Share_Tech_Mono'] bg-[#151b3d] border border-[#ff0040] text-[#ff0040] hover:bg-[#ff004020] transition-all"
            style={{ boxShadow: "0 0 10px #ff004040" }}
          >
            Clear Leaderboard
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
