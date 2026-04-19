/**
 * Application Configuration
 *
 * Customize the gamified error page by modifying these values
 */

export const config = {
  // Error page settings
  errorCodes: {
    notFound: 404,
    serverError: 500,
    networkError: 503,
  },

  // Game settings
  games: {
    phishing: {
      name: "Phishing Detector",
      duration: 30, // seconds
      basePoints: 100,
      streakMultiplier: 10,
    },
    password: {
      name: "Password Fortifier",
      duration: 45,
      basePoints: 10,
      minimumStrength: 70,
    },
    firewall: {
      name: "Firewall Defender",
      duration: 30,
      basePoints: 10,
      comboBonus: 5,
    },
  },

  // Leaderboard settings
  leaderboard: {
    maxEntries: 10,
    storageKey: "cyber-defense-leaderboard",
    usernameKey: "cyber-defense-username",
  },

  // Theme colors (must match theme.css)
  colors: {
    terminalGreen: "#00ff41",
    terminalAmber: "#ffb000",
    terminalRed: "#ff0040",
    cyberBg: "#0a0e27",
    cyberBgSecondary: "#151b3d",
  },

  // Particle settings
  particles: {
    count: 80,
    speed: 1,
    linkDistance: 150,
  },

  // Redirect URLs (customize for your app)
  redirects: {
    home: "/",
    support: "/support",
    documentation: "/docs",
  },

  // Feature flags
  features: {
    soundEffects: false, // Set to true and implement useSoundEffects hook
    hapticFeedback: true,
    particleInteraction: true,
    leaderboardSync: false, // Future: sync to backend
  },
} as const;

export type Config = typeof config;
