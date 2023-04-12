import { createClient } from "agora-rtc-react";

// HOOKS

export const useClient = createClient({
  mode: "live",
  codec: "vp8",
});
