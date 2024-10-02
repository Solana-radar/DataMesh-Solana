// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [
    function ({ addUtilities } : any) {
      addUtilities({
        ".scroll-enabled": {
          overflow: "auto !important", // Force scroll when this class is applied
        },
      });
    },
  ],
};

export default config;
