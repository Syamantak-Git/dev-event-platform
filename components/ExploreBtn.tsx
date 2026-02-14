"use client";
import Image from "next/image";
import React from "react";

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto">
      <a href="#events">Explore Events</a>
      <Image src="/icons/arrow-down.svg" width={24} height={24} alt="down arrow"/>
    </button>
  );
};

export default ExploreBtn;
