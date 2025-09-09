import type { BaseApp } from "@/apps/base/types";
import PicflixAppComponent from "./components/PicflixAppComponent";

interface GOONIFYInitialData {
  url?: string;
}

export const helpItems = [
  {
    icon: "📺",
    title: "Open GOONIFY",
    description: "Browse the GOONIFY site inside this window.",
  },
  {
    icon: "🔁",
    title: "Reload",
    description: "Refresh the page if it's not loading properly.",
  },
  {
    icon: "🔗",
    title: "Open Externally",
    description: "Open GOONIFY in a new browser tab.",
  },
];

export const appMetadata = {
  name: "GOONIFY",
  version: "1.0.0",
  creator: { name: "auxe-os", url: "https://github.com/auxe-os" },
  github: "https://github.com/auxe-os/auxOSv1",
  icon: "/icons/default/mac-classic.png",
};

export const GOONIFYApp: BaseApp<GOONIFYInitialData> = {
  id: "goonify",
  name: "GOONIFY",
  description: "Embedded GOONIFY site",
  icon: { type: "image", src: appMetadata.icon },
  component: PicflixAppComponent,
  helpItems,
  metadata: appMetadata,
};

export default GOONIFYApp;
