import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';

import './Services.css'

const Services = () => {

    const [services, setServices] = useState([]);
    useEffect( () => {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data));
    }, [])
   
    return (
        <div id='services' className='container'>
            <div className="row">
            <h2 className='services-title text-primary m-5' > Our Services </h2>
           <div className='services-container'>
           {
                services.map(service => <Service 
                    service = {service}
                    key = {service.id}
                ></Service>)
            }
           </div>
            </div>
        </div>
    );
};

export default Services;