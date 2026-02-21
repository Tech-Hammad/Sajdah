import React from 'react'
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loading.json";


const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Lottie
                animationData={loaderAnimation}
                loop={true}
                style={{ width: 200, height: 200 }}
            />
        </div>
    )
}

export default Loader