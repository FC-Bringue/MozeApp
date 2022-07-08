import React, {useState, useEffect} from 'react';
import Loader  from './Apppart/Starting/starting';
import SessionName  from './Apppart/sessionName/sessionName';
import SelectEvent  from './Apppart/selectEvent/selectEvent';
import Footer  from './Apppart/footer/footer';






function Landing(){
    const [loader, setLoader]=useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false);
        }, 2000)
    }, [])

    return (
        <section className='w-100 AppUser'>
         {loader ? <Loader/>:<Footer/>}  
        </section>
    ) ;

}

export default Landing;