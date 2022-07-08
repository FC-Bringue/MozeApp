import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Arrow from "../../../../../img/icons/Arrow_right.png";
import { animate, motion } from "framer-motion"
import { useAnimation } from 'framer-motion';
import Footer  from '../footer/footer';
import MozeLogo from "../../../../../img/logos/MOZE.png";


const Starting: React.FC<{}> = () => {
    return(
        <>

<div className='MusicPlayer'>
    <div className='MusicPlayerImageTitle'>
        <img src={MozeLogo} title="MozeLogo" className='w-100'/>
        <div className='MusicPlayerInfo'>
            <span className='MusicPlayerTitle'>Beat It</span>
            <span className='MusicPlayerArtist'>Michael Jackson</span>
        </div>
    </div>
    <div className='MusicPlayerBar'>
        <div className='MusicPlayerBarFill'>
            <div className='MusicPlayerBarFillRect'></div>
        </div>
    </div>
</div>

</>
);
}

export default Starting;