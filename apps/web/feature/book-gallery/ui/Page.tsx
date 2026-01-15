import Image from "next/image";
import { useState } from "react";

function BookPage({page,index}:any){
    const [isopen ,setIsopen]=useState(false)
    return <div style={{ "--i": index } as React.CSSProperties}
 onClick={()=>{
        setIsopen(!isopen)
    }} className={`page flex items-center justify-center ${isopen? 'page-open' : ''}`}>
        <Image src={page.front} width={250} height={350} alt="Book Front" className="absolute w-full h-full top-0 left-0" />
    </div>
}

export default BookPage;