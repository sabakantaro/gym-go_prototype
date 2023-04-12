import React from "react";
import Top from "../components/Home";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { keyword, meetingDatetime } = router.query;

  return (
    <Top />
  );
};

export default Home;
