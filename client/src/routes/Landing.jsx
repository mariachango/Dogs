import React from "react";
import Footer from "../components/Footer.jsx";
import style from '../styles/Landing.css';

export default function Landing() {
    return (
        <div id="landing" style={style}>
            <div id='blue' />

            <div id='main'>

                <img id="puppydp" referrerPolicy="no-referrer" src="https://play-lh.googleusercontent.com/PtA3zl3BnaONpKTGkXggmsnVQecMd8vAv-qZC3-BA8m5hUZJPs26mV-oO7xrDFAuReQ" alt="Henry Dogs" />

                <div id='side'>
                    <div id="welcome">Welcome!</div>

                    <p id="intro">This is a personal individual proyect for the bootcamp <a className="intro-a" href="https://www.soyhenry.com/">
                        SoyHenry</a> using the <a className="intro-a" href='https://www.thedogapi.com/'>The Dog Api</a>.</p>

                    <div id="enterCoontainer" >
                        <a id="enter" href="/dogs">ENTER</a>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}
