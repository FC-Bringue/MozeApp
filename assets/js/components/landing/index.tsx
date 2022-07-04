import React from 'react';
import Header  from './landingpart/landing-header/landing-header';
import Content  from './landingpart/landing-content/landing-content';
import Footer  from './landingpart/landing-footer/landing-footer';

function Landing(){
    return (

        <section className='w-100'>
            <Header />
            <Content />
            <Footer />
           
        </section>
    );

}

export default Landing;