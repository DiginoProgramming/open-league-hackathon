import React from "react";
import { useEffect, useState } from "react";
import { useInitData } from "@tma.js/sdk-react";
import bg from "../assets/bg.png";
import redeem from "../assets/Redeem.png";
import earn from "../assets/Earn.png";
import token from "../assets/token.png";
import light from "../assets/light.png";
import { postEvent } from "@tma.js/sdk";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import Model from "./model.tsx";
import axios from "axios";
import { toNano } from "@ton/core";

export default function HomePage() {
  const navigate = useNavigate();
  const handleImageClick = (path: string) => {
    navigate(path);
  };
  const initData = useInitData();
  const user_id = initData?.user?.id;
  const [userPoints, setUserPoints] = useState(0);
  const [userEnergy, setUserEnergy] = useState(0);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();

  const getEnergy = async () => {
    try {
      const res = await axios.get(
        `https://tgbot.growing3.ai/api/users/${user_id}/profile`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      const data = await res.data;
      setUserEnergy(data.data.energy);
    } catch (e) {
      console.log(e.message);
    }
  };
  const getPoint = async () => {
    try {
      const res = await axios.get(
        `https://tgbot.growing3.ai/api/users/${user_id}/point`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      const data = await res.data;
      setUserPoints(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEnergy();
    getPoint();
  }, [user_id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("eruda").then((module) => {
        module.default.init();
      });
    }
    postEvent("web_app_expand");
  }, []);

  return (
    <div className="relative">
      <Model />

      <div className="flex w-full px-2 flex-col pt-2 pb-3 h-[100dvh] bg-transparent justify-between absolute">
        <img
          src={bg}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full -z-20"
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col pt-2">
            <div className="w-full relative">
              <img
                src={token}
                alt="bg"
                className="z-10 w-[150px] h-full relative"
              />
              <a className="absolute top-1/2 -translate-y-1/2 text-black right-4 z-20 font-semibold">
                {userPoints}
              </a>
            </div>
            <div className="w-full relative">
              <img
                src={light}
                alt="bg"
                className="z-10 w-[150px] h-full relative"
              />
              <a className="absolute top-1/2 -translate-y-1/2 text-black right-4 z-20 font-semibold">
                {userEnergy}
              </a>
            </div>
          </div>
            <TonConnectButton className="w-full pt-4" />
        </div>
        <div className="flex w-full z-20">
          <img
            src={redeem}
            alt="bg"
            className="w-3/5 h-[70px] z-20 cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => handleImageClick("/redeem")}
          />
          <img
            src={earn}
            alt="bg"
            onClick={() => handleImageClick("/frames")}
            className="w-2/5 h-[70px] cursor-pointer hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
