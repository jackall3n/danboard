import React from "react";
import Head from "next/head";

import { createPlayer } from "utils/createPlayer";

import girl1 from "../public/images/pubg-girl.png";
import girl2 from "../public/images/img_1.png";
import guy from "../public/images/pubg-guy.png";

import Leaderboard from "components/Leaderboard/Leaderboard";

const PLAYERS = [
  createPlayer(
    "burst_nasty",
    "account.88441b131e314c5a9f10dbc1fc29680b",
    guy,
    "bg-red-800"
  ),
  createPlayer(
    "nasty_burst",
    "account.f69761c35877454a8d8ac1a7afe8f29f",
    girl1,
    "bg-green-800"
  ),
  createPlayer(
    "gooseberryfool",
    "account.52cf5261b0c14e05a065507edeb61ebc",
    girl2,
    "bg-yellow-800",
    "goose_berry_fool"
  ),
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Danboard 🔫</title>
      </Head>
      <Leaderboard players={PLAYERS} />
    </>
  );
}
