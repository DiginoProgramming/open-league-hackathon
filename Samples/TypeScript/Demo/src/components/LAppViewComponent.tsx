import React, { useEffect, useRef } from 'react';
import { LAppDelegate } from '../lappdelegate';
import { LAppView } from '../lappview';

const LAppViewComponent: React.FC = () => {
  const viewRef = useRef<LAppView | null>(null);

  useEffect(() => {
    // Init LAppDelegate and LAppView
    const appDelegate = LAppDelegate.getInstance();
    appDelegate.initialize();

    // Set viewRef as LAppView Instance
    viewRef.current = appDelegate.getView();

    // release resource
    return () => {
      LAppDelegate.releaseInstance();
    };
  }, []);

  return <canvas id="lapp-canvas" />;
};

export default LAppViewComponent;
