import React from 'react';
import Banner from "../composants/Banner";
import "../styles/home.css"
import Suggestions from "../composants/Suggestions";

export default function home() {
    return <div>
        <Banner/>
        <Suggestions/>
    </div>
}