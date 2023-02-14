import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const CareerId = () => {
    const [list, setList] = useState([]);
    

    const API_URL = "http://api.walnutia.ir/Worker/GetCareers";

    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setList(response.data);
            console.log(response.data)
          });
          ////request twice :(
    }, [])

    return (
        <div>
            {list.map((item) => (
                <label key={item.id} className='formContainer--abilities__item'>
                    <h5>{item.name}</h5>
                    <img src={item.image} alt="ability icon"/>
                    <input 
                        style={{display: "none"}}
                        type="checkbox"
                        value= {item.id}
                        // {...register('WorkerCareerIds')}
                    />
                </label>
            ))}
        </div>
    )
}

export default CareerId;