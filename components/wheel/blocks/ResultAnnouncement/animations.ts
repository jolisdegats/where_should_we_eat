interface CelebAnimation {
  text: (result: string) => string;
  className?: string;
  gif?: string;
}

export const CELEB_ANIMATIONS: Record<string, CelebAnimation> = {
  "Dr Dre": {
    text: (result) => `Still ${result}! 🎵`,
    className: "bounce-text",
    gif: "/gifs/drdre.gif",
  },
  "The Rock": {
    text: (result) => `Can you smell what ${result} is cooking? 🤨`,
    className: "eyebrow-raise",
    gif: "/gifs/rock.gif",
  },
  "Chuck Norris": {
    text: (result) => `${result} was chosen because Chuck Norris said so. 👊`,
    className: "punch-text",
    gif: "/gifs/norris.gif",
  },
  "Nicolas Cage": {
    text: (result) => `NOT THE ${result.toUpperCase()}! 🐝`,
    className: "cage-rage",
    gif: "/gifs/cage.gif",
  },
  "John Cena": {
    text: (result) => `You can't see ${result}! 👋`,
    className: "invisible-visible",
    gif: "/gifs/cena.gif",
  },
  "Britney Spears": {
    text: (result) => `Oops, ${result} did it again! 💃`,
    className: "spin-dance",
    gif: "/gifs/britney.gif",
  },
  "Paris Hilton": {
    text: (result) => `${result}? That's hot! 💅`,
    className: "glitter-text",
    gif: "/gifs/paris.gif",
  },
  "Mariah Carey": {
    text: (result) => `All I want for dinner is ${result}! 🎤`,
    className: "high-note",
    gif: "/gifs/mariah.gif",
  },
  "Cristina Cordula": {
    text: (result) => `${result}? Ma chérie, c'est MAGNIFAIK! ✨`,
    className: "magnifaik-text",
    gif: "/gifs/cristina.gif",
  },
} as const; 