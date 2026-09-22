// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
import { useEffect, useState } from "react";
import Prayer from "./Component/Prayer";


function App(){

  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState("Cairo")


  const cities = [{name:"القاهره", value:"cairo"},{name:"الاسكندريه", value:"Alexandria"},

                 {name:"الجيزه", value:"Giza"},{name:"المنصوره", value:"Mansoura"},

                 {name:"اسوان", value:"Aswan"},{name:"الاقصر", value:"Luxor"},
  ]

  useEffect(() => {
   const fetchPrayerTimes = async()=> {
    try{
       const response = await fetch (`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`)
       const data_Prayer = await response.json()
       setPrayerTimes(data_Prayer.data.timings);
       setDateTime(data_Prayer.data.date.gregorian.date)

       console.log(data_Prayer)

    }catch(error){
      console.error(error)

    }
   }
   fetchPrayerTimes();
  }
   ,[city])
  
    const formatTimes = (time) => {
      if(!time){
        return "00:00"
      }
      let [hours, minutes] = time.split(":").map(Number)
      const perd = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
    }

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينه</h3>
            <select name="" id="" onChange={(e)=>{
             setCity(e.target.value)
            }}>
              {cities.map((city)=> (
                <option key={city.value} value={city.value}>{city.name}</option>
              ))}
              </select>
          </div>
          <div className="date">
           <h3>التاريخ</h3>
           <h4>{dateTime}</h4>
          </div>

        </div>

        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
        <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/>

      </div>
    </section>
  )
}

export default App;
