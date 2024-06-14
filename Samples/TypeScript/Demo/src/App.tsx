import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import FramesPage from "./components/FramesPage.tsx";
import SlidingTilePuzzleGamePage from "./components/SlidingTilePuzzleGamePage.tsx";
import ColorIdentifyGamePage from "./components/ColorIdentifyGamePage.tsx";
import SpaceshipShootingGamePage from "./components/SpaceshipShootingGamePage.tsx";
import LaserTowerDefenseGamePage from "./components/LaserTowerDefenseGamePage.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SDKProvider, useInitData } from "@tma.js/sdk-react";
import RedeemPage from "./components/RedeemPage.tsx";
import Model from "./components/model.tsx";

const App = () => {
  return (
    <TonConnectUIProvider
      // manifestUrl="https://avatar.tinalee.bot/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/tinaaaaalee_gf_bot/app",
      }}
      // "url": "https://avatar.tinalee.bot/",
      manifestUrl="https://syntax-tma.vercel.app/tonconnectManifest.json"
      // actionsConfiguration={{
      //   twaReturnUrl: "https://t.me/testPython2321_bot/testing",
      // }}
    >
      <SDKProvider acceptCustomStyles debug>
        <Router>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Character Model</Link>
              </li>
              <li>
                <Link to="/frames">Frames</Link>
              </li>
            </ul>
          </nav> */}
          <Routes>
            {/* <Route path="/" element={<Model />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/redeem" element={<RedeemPage />} />
            {/* <Route path="/frames" element={<FramesPage />} />
            <Route path="/2048" element={<SlidingTilePuzzleGamePage />} />
            <Route path="/colors" element={<ColorIdentifyGamePage />} />
            <Route path="/laser" element={<LaserTowerDefenseGamePage />} />
            <Route path="/spaceship" element={<SpaceshipShootingGamePage />} /> */}
          </Routes>
        </Router>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export default App;
