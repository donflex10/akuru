import "dotenv/config";

//______________________________SETTINGS______________________________
//____________________________________________________________________

export const session = process.env.SESSION || "session_A7D44FBE";
export const phone = process.env.PHONE || "254725693306";
export const prefix = process.env.PREFIX || "%";
export const githubToken = process.env.GITHUB_TOKEN || "";

// Auto-view WhatsApp Status/Stories (Set to true to enable, false to disable)
export const autoViewStatus = process.env.AUTO_VIEW_STATUS !== undefined
  ? process.env.AUTO_VIEW_STATUS === "true"
  : true;

// Auto-react to WhatsApp Status/Stories (Set to true to enable, false to disable)
export const autoReactStatus = process.env.AUTO_REACT_STATUS !== undefined
  ? process.env.AUTO_REACT_STATUS === "true"
  : true;

// Pool of 40 emojis for status reactions (randomly picks one per status update)
export const statusEmojis = [
  '💚', '❤️', '🔥', '✨', '⚡', '🥰', '👏', '🌟', '💯', '😍',
  '🎉', '🤩', '🙌', '💎', '🌸', '🚀', '😎', '🫡', '🤍', '🧡',
  '💛', '💙', '💜', '💫', '👑', '🌈', '💐', '🥳', '🪄', '🦋',
  '🎈', '🌺', '🌹', '🕊️', '🍹', '🎯', '🏆', '💃', '🕺', '🍿'
];

// Anti-Delete Recovery (Recover deleted messages and send to bot number)
export const antiDelete = process.env.ANTI_DELETE !== undefined
  ? process.env.ANTI_DELETE === "true"
  : true;

// View-Once Recovery (Extract and reveal view-once media back to sender)
export const antiViewOnce = process.env.ANTI_VIEW_ONCE !== undefined
  ? process.env.ANTI_VIEW_ONCE === "true"
  : true;

// Port for Localhost Media Preview Web Server
export const previewPort = Number(process.env.PREVIEW_PORT) || 5050;

export const autoPostStatus =true
