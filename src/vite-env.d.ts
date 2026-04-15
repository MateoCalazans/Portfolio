/// <reference types="vite/client" />

declare module "unicornstudio-react" {
  import { ComponentType } from "react";

  interface UnicornSceneProps {
    projectId: string;
    width?: string | number;
    height?: string | number;
    scale?: number;
    dpi?: number;
    sdkUrl?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  const UnicornScene: ComponentType<UnicornSceneProps>;
  export default UnicornScene;
}
