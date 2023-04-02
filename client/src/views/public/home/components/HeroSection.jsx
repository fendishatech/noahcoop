import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen bg-white py-28">
      <div className="container mx-auto">
        <div className="sm:w-1/2 w-full h-screen flex flex-col justify-center items-start">
          {/* type writing section */}
          <h1 className="text-7xl font-bold bg-gradient-to-b from-green-500 to-yellow-500 bg-clip-text text-transparent">
            አሁኑኑ
            <Typewriter
              options={{
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter

                  .typeString(" የአክሲዮን ባለቤት ይሁኑ ።")

                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("ይቆጥቡ ።")
                  .start()

                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("የቤት ቁሳቁስ ያሟሉ ።")
                  .start();
              }}
            />
          </h1>
          <p className="text-2xl mb-8 mt-6">
            ሎረም እፍረት ዶሉር ስት አመት። ሰይፉ አይተው በምስጢር የሚያስፈልጋቸውን የሚያስተማሩ በሽታዎች ያሉትን
            የሚያስተምሩ የሚገኙ ሰዎች አሉ። ከተማ የሚያስፈልጋቸው ሰዎች በተለይ የሚያስተማሩ በሽታዎች የሚያስተምሩ
            ናቸው። ኮንሰክቱር አዲስፊክስን ኢሊት።
          </p>
          <button className="bg-gradient-to-b from-green-400 via-green-500 to-yellow-500 text-white py-4 px-20 text-3xl">
            ይመዝገቡ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from "react";

const GradientText = () => {
  return (
    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
      Hello, world!
    </h1>
  );
};
