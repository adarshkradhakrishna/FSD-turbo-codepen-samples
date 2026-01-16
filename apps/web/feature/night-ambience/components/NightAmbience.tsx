function NightAmbience({children}: {children?: React.ReactNode}) {
    return <section className="w-screen h-screen bg-nightblue" id="night">
        <div className="w-full h-full relative">
            {children}
        </div>
    </section>
}

export default NightAmbience;