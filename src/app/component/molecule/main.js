import React from "react";
import Herosection from "./herosection";
import Banner from "./banner";
import Feature from "./feature";
import Trailer from "./trailer";



const Main = () => {
  return (
 <div className="overflow-x-hidden">
 <Herosection/>
 <Banner/>
 <Feature/>
 <Trailer/>
 </div>
  )
}

export default Main