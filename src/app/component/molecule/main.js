// import React from "react";
// import Herosection from "./herosection";
// import Banner from "./banner";
// import Feature from "./feature";
// import Trailer from "./trailer";



// const Main = () => {
//   return (
//  <div className="overflow-x-hidden">
//  <Herosection/>
//  <Banner/>
//  <Feature/>
//  <Trailer/>
 
//  </div>
//   )
// }

// export default Main


import GeminiSuggest from "./geminiSuggest";
import Herosection from "./herosection";
import Banner from "./banner";
import Feature from "./feature";
import Trailer from "./trailer";
export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/getshows`);
  const data = await res.json();

  return (
     <div className="overflow-x-hidden">
       <Herosection/>
   <Banner/>
 <Feature/>
  <Trailer/>
      <GeminiSuggest allMovies={data.shows} />
    </div>
  );
}