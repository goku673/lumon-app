'use client';
import Image from "next/image";
import Footer from "../components/footer";
import axios from "axios";
import Button from "@/common/button";
import { useState } from "react";


const Home = () => {
  return (
    <div className="">
      <div className="text-center text-white lg:text-left lg:ml-36 text-xl font-bold">
        COMUNICADOS(S):
      </div>
      <div className="flex flex-col lg:flex-row justify-around lg:justify-center items-center w-full p-4">
        <div className="h-150 w-full lg:w-1/3 m-2 lg:mx-1 relative">
          <Image
            src="/assets/comunicado1.jpg"
            alt="Comunicado"
            fill
            style={{ objectFit: "contain" }}
            className="object-cover"
            priority
          />
        </div>
        <div className="h-150 w-full lg:w-1/2 m-2 lg:mx-1 relative">
          <Image
            src="/assets/portada1.jpg"
            alt="Portada"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
