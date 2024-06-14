// Live2DPage.tsx
import React, { useEffect } from "react";
import { LAppDelegate } from "../lappdelegate";
import * as LAppDefine from "../lappdefine";
import { LAppGlManager } from "../lappglmanager";

const Model: React.FC = () => {
  useEffect(() => {
    // Initialize WebGL and create the application instance
    if (
      !LAppGlManager.getInstance() ||
      !LAppDelegate.getInstance().initialize()
    ) {
      return;
    }

    LAppDelegate.getInstance().run();

    // Cleanup function to release the instance and remove event listeners
    return () => {
      LAppDelegate.releaseInstance();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (LAppDefine.CanvasSize === "auto") {
      LAppDelegate.getInstance().onResize();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div id="live2d-container" className="z-20" />;
};

export default Model;
