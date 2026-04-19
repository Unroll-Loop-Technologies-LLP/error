import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock, Unlock, Check, X } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
}

const weakPasswords = [
  "password123",
  "admin",
  "qwerty",
  "12345678",
  "welcome",
];

export function PasswordBuilder({ onComplete }: Props) {
  const [currentPasswordIndex, setCurrentPasswordIndex] = useState(0);
  const [password, setPassword] = useState(weakPasswords[0]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [improvements, setImprovements] = useState(0);

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

  const calculateStrength = (pwd: string) => {
    let strength = 0;
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      noCommon: !weakPasswords.some((weak) => pwd.toLowerCase().includes(weak)),
    };

    Object.values(checks).forEach((check) => {
      if (check) strength += 16.67;
    });

    return { strength: Math.min(100, strength), checks };
  };

  const { strength, checks } = calculateStrength(password);

  const getStrengthColor = () => {
    if (strength < 40) return "#ff0040";
    if (strength < 70) return "#ffb000";
    return "#00ff41";
  };

  const getStrengthLabel = () => {
    if (strength < 40) return "CRITICAL";
    if (strength < 70) return "MODERATE";
    return "SECURE";
  };

  const handleSubmit = () => {
    if (strength >= 70) {
      const timeBonus = Math.floor(timeLeft / 2);
      const improvementBonus = improvements * 50;
      setScore((prev) => prev + Math.floor(strength) * 10 + timeBonus + improvementBonus);

      if (currentPasswordIndex < weakPasswords.length - 1) {
        setCurrentPasswordIndex((prev) => prev + 1);
        setPassword(weakPasswords[currentPasswordIndex + 1]);
        setImprovements(0);
      } else {
        onComplete(score + Math.floor(strength) * 10 + timeBonus);
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    const oldStrength = calculateStrength(password).strength;
    const newStrength = calculateStrength(value).strength;

    if (newStrength > oldStrength) {
      setImprovements((prev) => prev + 1);
    }

    setPassword(value);
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
              PASSWORD FORTIFIER
            </h2>
            <p className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Strengthen weak credentials
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="font-['VT323'] text-2xl text-[#00ff41]">
              {timeLeft}s
            </div>
            <div className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Score: {score}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="relative h-2 bg-[#0a0e27] border border-[#00ff41] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#00ff41]"
            animate={{ width: `${((currentPasswordIndex + 1) / weakPasswords.length) * 100}%` }}
            style={{ boxShadow: "0 0 10px #00ff41" }}
          />
        </div>

        {/* Password Input */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-[#0a0e27] border-2 border-[#00ff41] p-8"
          style={{ boxShadow: "0 0 20px #00ff4140" }}
        >
          <div className="font-['Share_Tech_Mono'] text-xs text-[#ffb000] mb-4">
            CREDENTIAL {currentPasswordIndex + 1}/{weakPasswords.length}
          </div>

          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full bg-[#151b3d] border-2 border-[#00ff4160] px-4 py-3 font-['VT323'] text-2xl text-white focus:outline-none focus:border-[#00ff41] transition-all"
              style={{ boxShadow: "inset 0 0 10px #00ff4120" }}
              placeholder="Enter password..."
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {strength >= 70 ? (
                <Lock className="w-6 h-6 text-[#00ff41]" />
              ) : (
                <Unlock className="w-6 h-6 text-[#ff0040]" />
              )}
            </div>
          </div>

          {/* Strength Meter */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-['Share_Tech_Mono'] text-sm" style={{ color: getStrengthColor() }}>
                {getStrengthLabel()}
              </span>
              <span className="font-['VT323'] text-xl" style={{ color: getStrengthColor() }}>
                {Math.floor(strength)}%
              </span>
            </div>
            <div className="relative h-3 bg-[#151b3d] border border-[#00ff4140] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0"
                animate={{
                  width: `${strength}%`,
                  backgroundColor: getStrengthColor(),
                }}
                transition={{ duration: 0.3 }}
                style={{ boxShadow: `0 0 15px ${getStrengthColor()}` }}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { key: "length", label: "12+ characters" },
              { key: "uppercase", label: "Uppercase" },
              { key: "lowercase", label: "Lowercase" },
              { key: "numbers", label: "Numbers" },
              { key: "special", label: "Special chars" },
              { key: "noCommon", label: "No common words" },
            ].map((req) => (
              <motion.div
                key={req.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 font-['Share_Tech_Mono'] text-sm"
              >
                {checks[req.key as keyof typeof checks] ? (
                  <Check className="w-4 h-4 text-[#00ff41]" />
                ) : (
                  <X className="w-4 h-4 text-[#ff0040]" />
                )}
                <span
                  style={{
                    color: checks[req.key as keyof typeof checks]
                      ? "#00ff41"
                      : "#ffffff60",
                  }}
                >
                  {req.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={strength < 70}
          className="relative w-full py-4 font-['Orbitron'] tracking-wider text-lg bg-[#0a0e27] border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff4120] disabled:opacity-30 disabled:cursor-not-allowed transition-all overflow-hidden"
          style={{ boxShadow: "0 0 10px #00ff4140" }}
        >
          <motion.div
            className="absolute inset-0 bg-[#00ff41]"
            initial={{ x: "-100%" }}
            whileHover={strength >= 70 ? { x: 0 } : {}}
            transition={{ duration: 0.3 }}
            style={{ opacity: 0.1 }}
          />
          <span className="relative z-10">
            {strength >= 70 ? "DEPLOY SECURE PASSWORD" : "STRENGTH TOO LOW"}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
