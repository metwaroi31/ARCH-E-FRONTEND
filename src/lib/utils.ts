import Keys from "@/config/keys";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryToString = (
  text: string | string[] | undefined | any,
  arrayReturn: "first" | "last" | "joined" = "first",
  arrayJoinSeparator: string = ","
) => {
  if (text === undefined) {
    return "";
  }
  if (typeof text === "string") {
    return text;
  }
  if (Array.isArray(text)) {
    switch (arrayReturn) {
      case "first":
        return text[0];
      case "last":
        return text[text.length - 1];
      case "joined":
        return text.join(arrayJoinSeparator);
    }
  }
  return "";
};

export function numberSentences(text: string) {
  const sentences = text
    .split(".")
    .filter((sentence) => sentence.trim().length > 0);

  const numberedSentences = sentences.map((sentence, index) => {
    const sentenceNumber = index + 1;
    return `<span class="sentence-number">${sentenceNumber}</span> <span>${sentence.trim()}</span><span>.</span><br /><br />`;
  });

  return numberedSentences.join(" ");
}

export function getWebSocketURL(path = "") {
  const protocolPrefix = "wss:";
  const host = Keys.SOCKET_BASE_URL; // Includes hostname and port

  return protocolPrefix + "//" + host + path;
}

export function getYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname !== "www.youtube.com" &&
      urlObj.hostname !== "youtube.com"
    ) {
      return null;
    }

    const videoId = urlObj.searchParams.get("v");
    return videoId && videoId.length === 11 ? videoId : null;
  } catch (error) {
    // Handle any errors, such as invalid URLs
    return null;
  }
}
