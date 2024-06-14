// src/main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * Processing after the browser loads
 */
window.addEventListener(
  'load',
  (): void => {
    // Ensure there is an HTML container with id 'root'
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(<App />);
    }
  },
  { passive: true }
);

/**
 * Processing when the application exits
 */
window.addEventListener(
  'beforeunload',
  (): void => LAppDelegate.releaseInstance(),
  { passive: true }
);

/**
 * Process when changing screen size.
 */
window.addEventListener(
  'resize',
  () => {
    if (LAppDefine.CanvasSize === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  },
  { passive: true }
);
