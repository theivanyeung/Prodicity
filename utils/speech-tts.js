import Speech from "speak-tts";

export const speech = new Speech();

speech.init({
  volume: 1,
  lang: "en-GB",
  rate: 1,
  pitch: 1,
  voice: "Google UK English Male",
  splitSentences: true,
});
