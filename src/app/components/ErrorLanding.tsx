import { motion } from "motion/react";
import { AlertTriangle, Play } from "lucide-react";

interface Props {
  errorCode?: number;
  onStartGame: () => void;
}

export function ErrorLanding({ errorCode = 404, onStartGame }: Props) {
  const getErrorMessage = () => {
    switch (errorCode) {
      case 404:
        return "Resource not found in the matrix";
      case 500:
        return "Internal system malfunction detected";
      default:
        return "Network breach detected";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-3xl mx-auto p-6 text-center space-y-8"
    >
      {/* Glitch effect on error icon */}
      <motion.div
        className="relative inline-block"
        animate={{
          x: [0, -2, 2, -2, 2, 0],
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(90deg)",
            "hue-rotate(180deg)",
            "hue-rotate(270deg)",
            "hue-rotate(0deg)",
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <AlertTriangle
          className="w-32 h-32 text-[#ff0040] mx-auto"
          style={{ filter: "drop-shadow(0 0 30px #ff0040)" }}
        />
      </motion.div>

      {/* Error Code */}
      <div className="space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="font-['VT323'] text-8xl text-[#00ff41]"
          style={{ textShadow: "0 0 30px #00ff41" }}
        >
          ERROR {errorCode}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-['Orbitron'] text-xl text-[#ffb000] tracking-wider"
        >
          ⚠️ FIREWALL BREACH DETECTED
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-['Share_Tech_Mono'] text-[#ffffff80] max-w-md mx-auto"
        >
          {getErrorMessage()}
        </motion.p>
      </div>

      {/* Animated divider */}
      <motion.div
        className="relative h-px max-w-md mx-auto overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-4"
      >
        <p className="font-['Share_Tech_Mono'] text-[#00ff41]">
          But you can fix it... 😎
        </p>

        <p className="font-['Share_Tech_Mono'] text-sm text-[#ffb000] max-w-lg mx-auto">
          Complete security training to restore system access.
          <br />
          Prove your cyber defense skills in a randomly selected challenge.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartGame}
          className="relative px-8 py-4 font-['Orbitron'] text-lg tracking-wider bg-[#0a0e27] border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4120] transition-all overflow-hidden group mt-6"
          style={{ boxShadow: "0 0 20px #00ff4140" }}
        >
          <motion.div
            className="absolute inset-0 bg-[#00ff41]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ opacity: 0.1 }}
          />
          <Play className="inline-block mr-2 w-6 h-6" />
          BEGIN SECURITY TRAINING
        </motion.button>
      </motion.div>

      {/* Footer glitch text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="font-['VT323'] text-sm text-[#ff0040] pt-8"
      >
        &gt; INITIALIZING DEFENSE PROTOCOLS...
      </motion.div>

      {/* Scan lines effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10 z-50"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff41 2px, #00ff41 4px)",
        }}
      />
    </motion.div>
  );
}
