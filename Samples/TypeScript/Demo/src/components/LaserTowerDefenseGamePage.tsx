import { useBackButton, useInitData } from "@tma.js/sdk-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LaserTowerDefenseGamePageProps {}

const LaserTowerDefenseGamePage: React.FC<
  LaserTowerDefenseGamePageProps
> = () => {
  const [entryTime, setEntryTime] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const initData = useInitData();
  const userId = initData?.user?.id;
  const bb = useBackButton();
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  const handleUnload = () => {
    // Record accumulated time
    if (entryTime) {
      const currentTime = Date.now();
      const sessionTime = currentTime - entryTime;
      const minutesPlayed = sessionTime / 60000;
      const curScore =
        (Math.floor(minutesPlayed * 5) / 5) *
        (2 + Math.floor(minutesPlayed / 5));
      setTotalScore(Math.min(curScore, 50)); // 50 Maximum points for each play
    }

    // Call API to update points
    fetch(`https://tgbot.growing3.ai/api/users/${userId}/point`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "game", point: totalScore }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    bb.show();
    bb.on("click", () =>{
      handleImageClick("/frames");
      handleUnload();
    });
    return () => {
      bb.off("click", () =>{
        handleImageClick("/frames");
        handleUnload();
      });
      bb.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Record Exit time
        if (entryTime) {
          const currentTime = Date.now();
          const sessionTime = currentTime - entryTime;
          const minutesPlayed = sessionTime / 60000;
          const curScore =
            (Math.floor(minutesPlayed * 5) / 5) *
            (2 + Math.floor(minutesPlayed / 5));
          setTotalScore(Math.min(curScore, 50)); // 50 Maximum points for each play
          setEntryTime(null);
        }
      } else {
        // Record Enter time
        setEntryTime(Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [entryTime]);

  useEffect(() => {
    const iframe = document.getElementById("gameIframe") as HTMLIFrameElement;

    const handleLoad = () => {
      setEntryTime(Date.now());
    };

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [entryTime, totalTime, totalScore, userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (entryTime) {
        const currentTime = Date.now();
        const sessionTime = currentTime - entryTime;
        const minutesPlayed = sessionTime / 60000;
        const curScore =
          (Math.floor(minutesPlayed * 5) / 5) *
          (2 + Math.floor(minutesPlayed / 5));
        setTotalScore(Math.min(curScore, 50)); // 50 Maximum points for each play
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [entryTime]);
  return (
    <div>
      <iframe
        id="gameIframe"
        src="/laser/index.html"
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="Laser Tower Defense Game Page"
      />
    </div>
  );
};

export default LaserTowerDefenseGamePage;
