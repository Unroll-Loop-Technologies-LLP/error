import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap } from "lucide-react";

interface Threat {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: "malware" | "virus" | "trojan" | "ransomware";
}

interface Props {
  onComplete: (score: number) => void;
}

const threatTypes = ["malware", "virus", "trojan", "ransomware"] as const;

export function FirewallDefender({ onComplete }: Props) {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [blocked, setBlocked] = useState(0);
  const [missed, setMissed] = useState(0);
  const [combo, setCombo] = useState(0);
  const threatIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spawn threats
  useEffect(() => {
    if (timeLeft === 0) {
      onComplete(score);
      return;
    }

    const spawnRate = Math.max(1000 - timeLeft * 20, 300);

    const spawner = setInterval(() => {
      const newThreat: Threat = {
        id: threatIdRef.current++,
        x: Math.random() * 80 + 10,
        y: -10,
        speed: 1 + Math.random() * 2 + timeLeft * 0.05,
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      };
      setThreats((prev) => [...prev, newThreat]);
    }, spawnRate);

    return () => clearInterval(spawner);
  }, [timeLeft, score, onComplete]);

  // Timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Move threats
  useEffect(() => {
    const mover = setInterval(() => {
      setThreats((prev) => {
        const updated = prev
          .map((threat) => ({
            ...threat,
            y: threat.y + threat.speed,
          }))
          .filter((threat) => {
            if (threat.y > 110) {
              setMissed((m) => m + 1);
              setCombo(0);
              return false;
            }
            return true;
          });

        return updated;
      });
    }, 50);

    return () => clearInterval(mover);
  }, []);

  const handleThreatClick = (threatId: number) => {
    setThreats((prev) => prev.filter((t) => t.id !== threatId));
    setBlocked((b) => b + 1);
    setCombo((c) => c + 1);

    const comboBonus = combo * 5;
    const points = 10 + comboBonus;
    setScore((s) => s + points);
  };

  const getThreatColor = (type: string) => {
    switch (type) {
      case "malware": return "#ff0040";
      case "virus": return "#ff6b00";
      case "trojan": return "#ff00ff";
      case "ransomware": return "#ffb000";
      default: return "#ff0040";
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="font-['Orbitron'] text-[#00ff41] tracking-wider">
              FIREWALL DEFENDER
            </h2>
            <p className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Block incoming threats
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="font-['VT323'] text-2xl text-[#00ff41]">
              {timeLeft}s
            </div>
            <div className="font-['Share_Tech_Mono'] text-sm text-[#ffb000]">
              Score: {score}
            </div>
            {combo > 0 && (
              <div className="font-['Share_Tech_Mono'] text-xs text-[#ff0040]">
                Combo: {combo}x
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0a0e27] border border-[#00ff41] p-3 text-center">
            <div className="font-['VT323'] text-3xl text-[#00ff41]">{blocked}</div>
            <div className="font-['Share_Tech_Mono'] text-xs text-[#ffb000]">BLOCKED</div>
          </div>
          <div className="bg-[#0a0e27] border border-[#ff0040] p-3 text-center">
            <div className="font-['VT323'] text-3xl text-[#ff0040]">{missed}</div>
            <div className="font-['Share_Tech_Mono'] text-xs text-[#ffb000]">MISSED</div>
          </div>
          <div className="bg-[#0a0e27] border border-[#ffb000] p-3 text-center">
            <div className="font-['VT323'] text-3xl text-[#ffb000]">{threats.length}</div>
            <div className="font-['Share_Tech_Mono'] text-xs text-[#ffb000]">ACTIVE</div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={containerRef}
          className="relative bg-[#0a0e27] border-2 border-[#00ff41] overflow-hidden"
          style={{
            height: "500px",
            boxShadow: "0 0 30px #00ff4140",
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-[#00ff4140]" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-[#00ff4120]" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-[#00ff4120]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#00ff41] to-transparent" />
          </div>

          {/* Firewall shield at bottom */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-16 h-16 text-[#00ff41]" style={{ filter: "drop-shadow(0 0 10px #00ff41)" }} />
          </motion.div>

          {/* Threats */}
          <AnimatePresence>
            {threats.map((threat) => (
              <motion.button
                key={threat.id}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => handleThreatClick(threat.id)}
                className="absolute cursor-pointer hover:scale-125 transition-transform"
                style={{
                  left: `${threat.x}%`,
                  top: `${threat.y}%`,
                  color: getThreatColor(threat.type),
                  filter: `drop-shadow(0 0 8px ${getThreatColor(threat.type)})`,
                }}
              >
                <Zap className="w-8 h-8" />
              </motion.button>
            ))}
          </AnimatePresence>

          {/* Warning text */}
          {threats.length > 10 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute top-4 left-1/2 -translate-x-1/2 font-['Orbitron'] text-[#ff0040] tracking-wider z-10"
              style={{ textShadow: "0 0 10px #ff0040" }}
            >
              ⚠ HIGH THREAT LEVEL ⚠
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-[#0a0e27] border border-[#00ff4140] p-4">
          <p className="font-['Share_Tech_Mono'] text-sm text-[#00ff41] text-center">
            Click threats before they reach the firewall • Build combos for bonus points
          </p>
        </div>
      </motion.div>
    </div>
  );
}
