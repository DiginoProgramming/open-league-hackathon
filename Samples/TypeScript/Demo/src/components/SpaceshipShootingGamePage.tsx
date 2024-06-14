import { useBackButton, useInitData } from "@tma.js/sdk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SpaceshipShootingGamePageProps {}

const SpaceshipShootingGamePage: React.FC<
SpaceshipShootingGamePageProps
> = () => {
  const [entryTime, setEntryTime] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const initData = useInitData();
  const userId = initData?.user?.id;
  const bb = useBackButton();
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  const handleUnload = () => {
    if (!entryTime) return;
    const currentTime = Date.now();
    const sessionTime = currentTime - entryTime;
    const minutesPlayed = sessionTime / 60000;
    const curScore =
      (Math.floor(minutesPlayed * 5) / 5) * (2 + Math.floor(minutesPlayed / 5));
    setTotalScore(Math.min(curScore, 50)); // 50 Maximum points for each play
  };
  const updatePoint = async ({ score, userId }: any) => {
    try {
      console.log("user", score)
      const data = await axios.patch(
        `https://tgbot.growing3.ai/api/users/${userId}/point`,
        {
          type: "game",
          point: score,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Success Update", data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(()=>{
      console.log("useEffect",totalScore)
    },[totalScore])
  useEffect(() => {
    bb.show();
    bb.on("click", () => {
      console.log("button",totalScore)
      updatePoint({ score: totalScore, userId });
      // handleImageClick("/frames");
    });
    return () => {
      bb.off("click", () => {
        updatePoint({ score: totalScore, userId });
        // handleImageClick("/frames");
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
  }, [entryTime, totalScore, userId]);

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
      src="/spaceship/index.html"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Spaceship Shooting Game Page"
    />
  </div>
  );
};
export default SpaceshipShootingGamePage;
