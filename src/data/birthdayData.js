/**
 * =========================================================================
 * BIRTHDAY SURPRISE CONFIGURATION
 * =========================================================================
 * Customize all text, photos, memories, and personal messages right here!
 * You do not need to modify component code to personalize this surprise.
 * =========================================================================
 */

export const birthdayData = {
  // Friend's Name (shown throughout the experience)
  name: "Girija",

  // Nickname or title
  nickname: "Paasakaari",

  // Audio track configuration
  // You can put your own mp3 file at: public/assets/music/birthday.mp3
  // If no file exists, the built-in gentle acoustic music-box synthesizer automatically plays!
  music: {
    src: "/assets/music/birthday.mp3",
    title: "Sweet Birthday Lullaby (Music Box & Piano)",
    artist: "With Love"
  },

  // Opening screen greeting
  intro: {
    greeting: "Heyy Girija",
    nicknameTag: "Paasakaari",
    subtitle: "I made something special for you.",
    buttonText: "Open Your Surprise ✨"
  },

  // Birthday Reveal section
  reveal: {
    title: "Happy Birthday",
    tagline: "Today is your special day, and the world is brighter because you're in it.",
    scrollPrompt: "Continue the journey ↓"
  },

  // Transition quotes
  memoryIntro: {
    quote1: "Every friendship has moments worth remembering.",
    quote2: "And these are some of my favorites with you."
  },

  // Memory Timeline items (5 memories)
  memories: [
    {
      id: 1,
      number: "01",
      date: "August 2021",
      title: "The Day We First Met",
      description: "From awkward small talk to laughing until our stomachs hurt within ten minutes. That day I knew we'd either become partners in crime or get each other into trouble.",
      image: "/assets/photos/memory1.jpg",
      tag: "Where it all began"
    },
    {
      id: 2,
      number: "02",
      date: "December 2022",
      title: "Planned Temple Trip",
      description: "Early morning calm, traditional vibes, serene bells, and seeking blessings together. A peaceful journey filled with positivity and good memories.",
      image: "/assets/photos/memory2.jpg",
      tag: "Blessings & Peace",
      aspectRatio: "16/9"
    },
    {
      id: 3,
      number: "03",
      date: "May 2023",
      title: "Snap Forgettable Chats",
      description: "From hilarious face filters to silly 10-second snaps and random chats that disappear on screen, but stay forever in our memories!",
      image: "/assets/photos/memory3.jpg",
      tag: "Streaks & Chaos",
      aspectRatio: "1/1"
    },
    {
      id: 4,
      number: "04",
      date: "November 2024",
      title: "Silly Fights & Epic Roasts",
      description: "Fighting with each other over the most silly, simple things, and then teaming up to roast each other and the people we secretly hate! No matter how much we argue, we always end up laughing together.",
      image: "/assets/photos/memory4.jpg",
      tag: "Chaos & Endless Roasts",
      aspectRatio: "1/1"
    },
    {
      id: 5,
      number: "05",
      date: "2025 & Beyond",
      title: "To A Lifetime Of More Adventures",
      description: "Growing up, traveling to new places, chasing big dreams, and remaining the same chaotic duo through every single chapter of life.",
      image: "/assets/photos/memory5.jpg",
      tag: "Forever best friends",
      aspectRatio: "4/3"
    }
  ],

  // 7 Secret Photo Gallery Vaults (Password Protected)
  // Edit the passwords, hints, captions, and images right here!
  photos: [
    {
      id: 1,
      vaultNumber: "01",
      title: "Secret Vault 01",
      password: "gokul",
      hint: "Your loved ones [short name]",
      image: "/assets/photos/photo1.jpg",
      caption: "Just for fun 😄! Always be happy with your loved ones, and remember your brother always loves and supports you forever! 🤍✨",
      date: "Pure Happiness",
      span: "tall"
    },
    {
      id: 2,
      vaultNumber: "02",
      title: "Secret Vault 02",
      password: "7",
      hint: "When Karthi always calls you [number]",
      image: "/assets/photos/photo2.jpg",
      caption: "Look at that innocence! Little Girija with those curious eyes and sweet bindi. Some things never change — still the same kind soul and pure heart! 👧🌸",
      date: "Little Girija 🤍",
      span: "tall"
    },
    {
      id: 3,
      vaultNumber: "03",
      title: "Secret Vault 03",
      password: "pasakaari",
      hint: "Your special nickname",
      image: "/assets/photos/photo3.jpg",
      caption: "Cutest smile with the prettiest filters! Always our gorgeous Paasakaari radiating charm and happiness 💜✨",
      date: "Filter Queen 👑",
      span: "tall"
    },
    {
      id: 4,
      vaultNumber: "04",
      title: "Secret Vault 04",
      password: "karthi",
      hint: "The one who made this surprise for you",
      image: "/assets/photos/photo4.jpg",
      caption: "Your crazy brother in his natural goofy element! Always ready to roast you, laugh with you, and have your back forever 🧢🤪",
      date: "Brother's Swag 😎",
      span: "tall"
    },
    {
      id: 5,
      vaultNumber: "05",
      title: "Secret Vault 05",
      password: "birthday",
      hint: "What we are celebrating today!",
      image: "/assets/photos/photo5.jpg",
      caption: "Sending love to the mountains and dreaming big! Always reaching for the skies with a pure heart 🏔️❤️",
      date: "Mountain Vibes",
      span: "tall"
    },
    {
      id: 6,
      vaultNumber: "06",
      title: "Secret Vault 06",
      password: "bestie",
      hint: "Our friendship bond forever",
      image: "/assets/photos/photo6.jpg",
      caption: "The sweetest travel companions! Bus rides, laughter, and moments made special just by being together 🚌🌸",
      date: "Sisterly Love 💖",
      span: "tall"
    },
    {
      id: 7,
      vaultNumber: "07",
      title: "Secret Vault 07",
      password: "7",
      hint: "KGHR2S2 [how many people in that word]",
      image: "/assets/photos/photo7.jpg",
      caption: "The entire gang together! 7 hearts, endless laughs, and memories that stay etched forever in our hearts 🌟✨",
      date: "The Iconic 7 💫",
      span: "wide"
    }
  ],

  // Personal Letter Section (Interactive Envelope)
  letter: {
    heading: "A Little Message For You",
    teaser: "Open this when you're ready...",
    date: "Special Birthday Edition",
    salutation: "Dearest Girija,",
    paragraphs: [
      "Some people make ordinary days feel extraordinarily bright just by being in them, and you have been that person for me since day one.",
      "Thank you for being the one who celebrates my smallest victories, listens to my longest rants, and never fails to pull me out of my darkest moods with just a funny meme or a spontaneous phone call.",
      "You have a heart so genuine, a mind so sharp, and an energy so infectious that anyone lucky enough to know you is truly blessed. Through every up and down, you've remained constant, loyal, and unapologetically yourself.",
      "On your birthday, my only wish for you is boundless happiness, peace of mind, wild success in everything your heart desires, and laughter that leaves you breathless.",
      "I hope you always remember how deeply loved, appreciated, and cherished you are."
    ],
    closing: "With all my love,",
    signature: "By Karthi, your brother 🤍"
  },

  // Interactive Surprise Box Section
  surprise: {
    preTitle: "Wait... there's still one more thing.",
    title: "I saved a little surprise for you.",
    boxPrompt: "Tap the gift box to unlock your surprise 🎁",
    giftTitle: "Special Birthday Privilege Pass 🎟️✨",
    giftSubtitle: "Golden Best Friend Pass — Redeemable Anytime",
    giftPerks: [
      "✨ 1x Full day outing with free food, coffee & dessert on me",
      "✨ Unlimited late-night phone therapy & emergency rant sessions",
      "✨ 1x Master of Playlist veto power on our next road trip",
      "✨ 1x Free pass to make me do any silly TikTok/Reel challenge"
    ],
    secretWish: "May this upcoming year be the chapter where all your biggest dreams turn into reality. Happy Birthday beautiful!"
  },

  // Final Celebration Section
  celebration: {
    headline: "Happy Birthday, Girija!",
    subheadline: "Here's to another year of amazing memories, endless laughter, and unbreakable friendship.",
    wishes: [
      "Keep smiling.",
      "Keep being uniquely, wonderfully you.",
      "And keep making amazing memories."
    ],
    finalQuote: "Have the most wonderful birthday! ✨🎂🥂",
    replayButton: "Replay the Surprise ↺"
  }
};
