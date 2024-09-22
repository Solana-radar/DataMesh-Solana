import {nextui} from '@nextui-org/theme';
// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  plugins: [nextui()],
  content: [
    "./src/app/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(button|link|navbar|ripple|spinner).js"
  ].js"
  ],
  presets: [sharedConfig],
};

export default config;
