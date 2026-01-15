import '../style/index.css';
function Scene({children}:any){
    return(
        <div className="scene w-full h-full py-10 flex items-center justify-center ">
           {children}
        </div>
    )
}

export {Scene}