import React from "react";
import { sCount } from "./homeStore";

export default function Home() {
  const count = sCount.use();

  const handleClick = () => {
    sCount.set((n) => (n.value += 1));
  };

  return (
    <div>
      <h1>Welcome to SE Jobs</h1>
      {/* <button onClick={handleClick}>Up</button> */}
    </div>
  );
}
