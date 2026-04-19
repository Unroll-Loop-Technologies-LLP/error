import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, AlertTriangle } from "lucide-react";

interface PhishingItem {
  text: string;
  isPhishing: boolean;
  hint: string;
}

const phishingData: PhishingItem[] = [
  {
    text: "paypa1-security-alert.com/verify",
    isPhishing: true,
    hint: "Look for the number '1' instead of 'l'",
  },
  {
    text: "github.com/login",
    isPhishing: false,
    hint: "Legitimate GitHub domain",
  },
  {
    text: "Your package is waiting! Click here: amaz0n-delivery.net",
    isPhishing: true,
    hint: "Zero instead of 'o' - suspicious domain",
  },
  {
    text: "google.com/search",
    isPhishing: false,
    hint: "Official Google URL",
  },
  {
    text: "URGENT: Your account will be closed! Login at applе-id-secure.com",
    isPhishing: true,
    hint: "Urgency + suspicious domain",
  },
  {
    text: "linkedin.com/jobs",
    isPhishing: false,
    hint: "Official LinkedIn domain",
  },
  {
    text: "microsoft-support-team.ru/fix-error",
    isPhishing: true,
    hint: "Wrong country domain (.ru) for Microsoft",
  },
  {
    text: "stackoverflow.com/questions",
    isPhishing: false,
    hint: "Legitimate Stack Overflow URL",
  },
];

interface Props {
  onComplete: (score: number) => void;
}

export function PhishingDetector({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [streak, setStreak] = useState(0);

  const currentItem = phishingData[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, onComplete]);

  const handleAnswer = (isPhishing: boolean) => {
    const correct = isPhishing === currentItem.isPhishing;
    setFeedback(correct ? "correct" : "incorrect");

    if (correct) {
      const timeBonus = Math.floor(timeLeft / 5);
      const streakBonus = streak * 10;
      setScore((prev) => prev + 100 + timeBonus + streakBonus);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < phishingData.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(score);
      }
    }, 800);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="font-['Orbitron'] text-[#00ff41] tracking-wider">
              PHISHING DETECTOR
            </h2>
            <p className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Identify threats before they breach
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="font-['VT323'] text-2xl text-[#00ff41]">
              {timeLeft}s
            </div>
            <div className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Score: {score}
            </div>
            {streak > 0 && (
              <div className="font-['Share_Tech_Mono'] text-xs text-[#ff0040]">
                Streak: {streak}x
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="relative h-2 bg-[#0a0e27] border border-[#00ff41] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#00ff41]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / phishingData.length) * 100}%` }}
            style={{ boxShadow: "0 0 10px #00ff41" }}
          />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="relative bg-[#0a0e27] border-2 border-[#00ff41] p-8 overflow-hidden"
          style={{
            boxShadow: feedback === "correct"
              ? "0 0 30px #00ff41"
              : feedback === "incorrect"
              ? "0 0 30px #ff0040"
              : "0 0 20px #00ff4140",
          }}
        >
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff4120] to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10">
            <div className="font-['Share_Tech_Mono'] text-xs text-[#ffb000] mb-2">
              ANALYZE TRANSMISSION {currentIndex + 1}/{phishingData.length}
            </div>
            <div className="font-['VT323'] text-2xl text-white break-all mb-4">
              {currentItem.text}
            </div>
            <div className="font-['Share_Tech_Mono'] text-sm text-[#00ff41] opacity-60">
              {currentItem.hint}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(false)}
            disabled={feedback !== null}
            className="relative py-4 font-['Orbitron'] tracking-wider bg-[#0a0e27] border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4120] disabled:opacity-50 transition-all overflow-hidden group"
            style={{ boxShadow: "0 0 10px #00ff4140" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#00ff41]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
            <Shield className="inline-block mr-2 w-5 h-5" />
            SAFE
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(true)}
            disabled={feedback !== null}
            className="relative py-4 font-['Orbitron'] tracking-wider bg-[#0a0e27] border-2 border-[#ff0040] text-[#ff0040] hover:bg-[#ff004020] disabled:opacity-50 transition-all overflow-hidden group"
            style={{ boxShadow: "0 0 10px #ff004040" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#ff0040]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
            <AlertTriangle className="inline-block mr-2 w-5 h-5" />
            PHISHING
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
