import { useEffect, useState } from "react";
import Cryptolist from "./Cryptolist";
import Pagination from "./pagination";


function App(){
  const [coinsData,setCoinsData]=useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(10);
  useEffect(()=>{
    async function Fetchdata(){
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await res.json();
    //console.log(data)
    setCoinsData(data);
    }
    Fetchdata().catch((err)=>console.log(err))
  },[])

  const lastPostIndex = currentPage * postsPerPage;// can get last number of page
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coinsData.slice(firstPostIndex,lastPostIndex)

  return(
    <>
      <h1>Crypto Gallery</h1>
      <Cryptolist coinsData={currentPosts}/>
      <Pagination totalPosts ={coinsData.length}
      postsPerPage = {postsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage = {currentPage}
      />
    </>
  )
}

export default App;