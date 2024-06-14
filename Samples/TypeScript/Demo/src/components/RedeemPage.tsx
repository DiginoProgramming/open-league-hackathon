import React, { useEffect } from "react";
import bg from "../assets/bg.png";
import coin from "../assets/coin.png";
import board from "../assets/board.png";
import bag from "../assets/Bag.png";
import cake from "../assets/Cake.png";
import card from "../assets/Card.png";
import chips from "../assets/Chips.png";
import cup from "../assets/Cup.png";
import meat from "../assets/Meat.png";
import rice from "../assets/Rice.png";
import sushi from "../assets/Sushi.png";
import tea from "../assets/Tea.png";
import redeemText from "../assets/RedeemText.png";
import bread from "../assets/bread.png";
import { useBackButton, useInitData } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mnemonicToPrivateKey } from "ton-crypto";
import {
  Address,
  beginCell,
  contractAddress,
  toNano,
  TonClient4,
  internal,
  fromNano,
  WalletContractV4,
} from "ton";
import {
  SampleJetton,
  storeTokenTransfer,
} from "../sources/SampleJetton_SampleJetton";

export default function RedeemPage() {
  const navigate = useNavigate();
  const bb = useBackButton();
  const initData = useInitData();
  const user_id = initData?.user?.id;
  const mintJetton = async () => {
    const client4 = new TonClient4({
      //create client for testnet sandboxv4 API - alternative endpoint
      endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.REACT_APP_MNEMONICS || "").toString(); // 🔴 Change to your own, by creating .env file!
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const secretKey = keyPair.secretKey;
    const workchain = 0;
    const wallet = WalletContractV4.create({
      workchain,
      publicKey: keyPair.publicKey,
    });
    let wallet_contract = client4.open(wallet);
    let jetton_wallet = "";
    const jettonParams = {
      name: "Test Token Name",
      description: "This is description of Test Jetton Token in Tact-lang",
      symbol: "TTN",
      image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
    };
    const NewOwner_Address = Address.parse(""); // 🔴 Owner should usually be the deploying wallet's address.

    // Create content Cell
    // let content = buildOnchainMetadata(jettonParams);
    let max_supply = toNano("666.123456789"); // 🔴 Set the specific total supply in nano

    let init = await SampleJetton.init(
      wallet_contract.address,
      content,
      max_supply,
    );

    // ========================================
    let forward_string_test = beginCell()
      .storeBit(1)
      .storeUint(0, 32)
      .storeStringTail("EEEEEE")
      .endCell();

    let packed = beginCell()
      .store(
        storeTokenTransfer({
          $$type: "TokenTransfer",
          query_id: 0n,
          amount: toNano(20000),
          destination: NewOwner_Address,
          response_destination: wallet_contract.address, // Original Owner, aka. First Minter's Jetton Wallet
          custom_payload: forward_string_test,
          forward_ton_amount: toNano("0.000000001"),
          forward_payload: test_message_left,
        }),
      )
      .endCell();

    let deployAmount = toNano("0.3");
    let seqno: number = await wallet_contract.getSeqno();
    let balance: bigint = await wallet_contract.getBalance();
    console.log(
      "========================================================================================",
    );
    console.log(
      "Current deployment wallet balance: ",
      fromNano(balance).toString(),
      "💎TON",
    );
    console.log("\n🛠️ Calling To JettonWallet:\n" + jetton_wallet + "\n");
    await wallet_contract.sendTransfer({
      seqno,
      secretKey,
      messages: [
        internal({
          to: jetton_wallet,
          value: deployAmount,
          init: {
            code: init.code,
            data: init.data,
          },
          bounce: true,
          body: packed,
        }),
      ],
    });
  };
  const onBackButtonClick = () => {
    navigate("/");
  };
  const payForPoint = async (type: string, price: number) => {
    try {
      let res = await axios.get(
        `https://tgbot.growing3.ai/api/users/${user_id}/redeem`,
        {
          params: {
            user_id: user_id,
            point: price,
          },
        },
      );
      let data = await res.data;
      console.log("add point:", data);

      // res = await axios.post(
      //     'https://ai-gf.tinalee.bot/add_energy',  // Replace with your actual server URL
      //     {
      //         user_id: user_id,
      //         energy: price/30
      //     },
      //     {
      //         headers: {
      //             'Accept': 'application/json',
      //             'Content-Type': 'application/json'
      //         }
      //     }
      // );
      // data = await res.data;
      // console.log('add energy:', data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    bb.show();
    bb.on("click", onBackButtonClick);
    return () => {
      bb.off("click", onBackButtonClick);
      bb.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const foodArr = [
    { name: "cup", img: cup, price: 300, w: "w-[60%]", type: "food" },
    { name: "tea", img: tea, price: 500, w: "w-[45%]", type: "food" },
    { name: "bread", img: bread, price: 1000, w: "w-[60%]", type: "food" },
    { name: "chips", img: chips, price: 1700, w: "w-[60%]", type: "food" },
    { name: "rice", img: rice, price: 2300, w: "w-[60%]", type: "food" },
    { name: "sushi", img: sushi, price: 6000, w: "w-[60%]", type: "food" },
    { name: "cake", img: cake, price: 3200, w: "w-[60%]", type: "food" },
    { name: "meat", img: meat, price: 10000, w: "w-[60%]", type: "food" },
    { name: "card", img: card, price: undefined, w: "w-[65%]", type: "" },
  ];
  return (
    <div className="relative text-white bg-white flex h-[100vh] w-full flex-col justify-between items-center gap-1 min-h-[100dvh]">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 w-full h-full grayscale"
      />
      <div className="w-2/3 z-30 pt-4">
        <img src={redeemText} alt="redeemText" className="w-full" />
      </div>
      <div className="w-[85%] h-full z-30 py-4 relative">
        <img src={board} alt="board" className="absolute top-0 left-0" />
        <div className="grid grid-cols-3 gap-1 justify-items-center w-full px-4">
          {foodArr.map((food) => (
            <div
              className="z-30 flex justify-end flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={
                food.price ? () => payForPoint(food.type, food.price) : () => {}
              }
            >
              <div
                className={`flex h-full flex-col items-center justify-end z-30 ${food.w}`}
              >
                <img
                  src={food.img}
                  alt="cup"
                  className="object-contain z-30 aspect-1/2"
                />
              </div>
              {food.price ? (
                <div className="flex gap-1 items-center pt-2">
                  <img src={coin} alt="coin" className="size-[20px] z-30" />
                  <a className="text-white text-sm z-30 font-semibold">
                    {food.price}
                  </a>
                </div>
              ) : (
                <div className="flex items-center pt-2">
                  <button className="italic bg-[#ffb62e] border-black border-2 ring-2 ring-[#ffb62e] text-black rounded-md w-full px-3 text-xs font-semibold">
                    browse
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="w-full flex items-center text-white px-6 pt-2"
          onClick={() => payForPoint("trip", 25000)}
        >
          <img src={bag} alt="bag" className="w-[85px] z-30" />
          <a className="z-30 font-semibold text-xs flex-1 text-center">
            Go on a Trip
          </a>
          <div className="flex gap-1 items-center">
            <img src={coin} alt="coin" className="size-[20px] z-30" />
            <a className="text-white text-sm z-30 font-semibold">25000</a>
          </div>
        </div>
      </div>
    </div>
  );
}
