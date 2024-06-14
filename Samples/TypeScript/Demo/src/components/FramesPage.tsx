import { useBackButton, useInitData } from "@tma.js/sdk-react";
import { beginCell } from "@ton/core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FramePages.css";
import { Network, Tonfura } from "tonfura-sdk";
import axios from "axios";

const FramesPage: React.FC = () => {
  const wallet = useTonWallet();
  const initData = useInitData();
  const userId = initData?.user?.id;

  const [tonConnectUI, setOptions] = useTonConnectUI();

  const navigate = useNavigate();
  const bb = useBackButton();
  const sendTon = async () => {
    const settings = {
      apiKey: "723b4deb-6ec9-438f-a8d7-4b063b2d0f29", // Replace with your Tonfura API key.
      network: Network.Mainnet, // Replace with your network.
    };

    const tonfura = new Tonfura(settings);
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address:
            // "0:9794c9ee4c86a644aed2bfb98059b167bc95fb0cac26a4f6b633fc37406581ad", // destination address
            // "0:f267dbaa5e53cd3c75ac47839ea0f20f44206ead9412410a14d0feee6889780e",
            "UQDbbiiaZmmIQa2FLRlQvLDbzRqWVJK6EIbXsV2WLYS2QI8b", // TonKeeper "Test" address on mainnet
          amount: "10000000", // 0.01 Ton
          // payload: "VGhhbmtzIHRvIGJ1eSB0b2tlbg==" //Thank to buy token
        },
      ],
    };
    try {
      console.log("send");
      const result = await tonConnectUI.sendTransaction(transaction as any);
      // const someTxData = await tonfura.core.getTransactions(result.boc as any);
      console.log("result", result.boc);
      // console.log("someTxData", someTxData);
      if (result.boc) {
        await axios.patch(
          `https://tgbot.growing3.ai/api/users/${userId}/point`,
          {
            type: "ton",
            point: 50,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageClick = (path: string) => {
    navigate(path);
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("eruda").then((module) => {
  //       module.default.init();
  //     });
  //   }
  // }, []);
  useEffect(() => {
    bb.show();
    bb.on("click", () => handleImageClick("/"));
    return () => {
      bb.off("click", () => handleImageClick("/"));
      bb.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-[100vh] h-full bg-white flex flex-col gap-6 items-center justify-center py-6">
      <button
        onClick={() => sendTon()}
        // onClick={() => console.log("wallet", wallet?.account.address)}
        className="bg-[#ffb62e] h-24 w-[80%] border-black border-2 ring-2 ring-[#ffb62e] text-black rounded-md px-3 text-base font-semibold"
      >
        Buy by Ton
      </button>
      <div className="grid grid-cols-2 gap-4 px-6">
        <img
          src="/Resources/minigame_icon_image_2048.png"
          alt="2048"
          className="frame-image"
          onClick={() => handleImageClick("/2048")}
        />
        <img
          src="/Resources/minigame_icon_image_color.png"
          alt="Colors"
          className="frame-image"
          onClick={() => handleImageClick("/colors")}
        />
        <img
          src="/Resources/minigame_icon_image_spaceship.png"
          alt="Spaceship"
          className="frame-image"
          onClick={() => handleImageClick("/spaceship")}
        />
        <img
          src="/Resources/minigame_icon_image_laser.png"
          alt="Laser"
          className="frame-image"
          onClick={() => handleImageClick("/laser")}
        />
      </div>
    </div>
  );
};

export default FramesPage;
