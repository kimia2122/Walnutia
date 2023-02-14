import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { SignupWorker, clearState, userSelector } from '../../Store/features/User/signupWorkerSlice';

import "./signupW-style.scss";
import backIcon from "../../Assets/svg/backIcon.svg";
import userProfile from "../../Assets/svg/userProfile.svg";
import signupbg from "../../Assets/svg/signupbg.svg";

const Signupworker = () => {
    const [image, setImage] = useState([]);
    const [profilePreview, setProfilePreview] = useState("");
    const [list, setList] = useState([]);

    const API_URL = "http://api.walnutia.ir/Worker/GetCareers";
    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector(userSelector);

    const onSubmit = ({FullName, NationalId, WorkerCareerIds, Image}) => {
        dispatch(SignupWorker({
            Phone: localStorage.getItem("PhoneNumber" || ""),
            FullName,
            NationalId,
            WorkerCareerIds,
            Image
        }));
    };
    
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setList(response.data);
            console.log(response.data)
          });
          ////request twice :(
    }, [])

    useEffect(() => {
        if (isError) {  
          dispatch(clearState());
        }
        if (isSuccess) {
          dispatch(clearState());
        }
        console.log("kolan component 2bar rerender mishe? bale, bkhatere request getcareer!");
    }, [isError, isSuccess]);

    return (
        <div className="signupContainer">
            <img className='backIcon' src={backIcon} alt="back icon" />
            
            <Fragment>
            <div className='signupBox'>
                <img className='signupBox--bg' src={signupbg} alt="back ground" />
                <div className='signupBox--text'>
                    <div className='signupBox--text__red'>هر روز سرکار باش</div>
                    <div className='signupBox--text__header'>برای همکاری ثبت نام کنید</div>
                </div>
                <div className='signupBox--content'>
                    <form
                    onSubmit={handleSubmit(onSubmit)}
                    method="POST"
                    >
                    <div className='formContainer'>    
                        <label className='formContainer--profilePhoto'>
                                <div style={{marginRight: "1rem"}}>آپلود عکس پروفایل</div>
                                <div>
                                    {!image.length ? 
                                        <div className='formContainer--profilePhoto__icon'>
                                            <img src={userProfile} alt="user profile icon" />  
                                        </div>
                                    :   <div style={{ backgroundImage: `url(${profilePreview}`}} className='formContainer--profilePhoto__pre'></div>
                                    }
                                </div>
                                
                                <input
                                style={{ display: "none"}} 
                                id="image"
                                name="image"
                                type="file"  
                                {...register('Image', {
                                    onChange: (e) => {
                                        if (image.length > 0) {
                                        image.pop();
                                        }
                                        setImage([...image, e.target.files[0]]);
                                        if (e.target.files) {
                                        setProfilePreview(URL.createObjectURL(e.target.files[0]));
                                        } else return "";
                                    }
                                })}
                                />
                        </label>
                        <div className='formContainer--inputs'>
                            <input 
                            className='input-main formContainer--inputs__input'
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder='نام و نام خانوادگی'
                            {...register('FullName', { required: true })}
                            />
                            <input 
                            className='input-main formContainer--inputs__input'
                            id="nationalId"
                            name="nationalId"
                            type="number"
                            placeholder='کد ملی'
                            {...register('NationalId', { required: true })}
                            />
                        </div>
                        <div className='formContainer--abilities'>
                            <div className='formContainer--abilityText'>توانایی</div>
                            <div>
                            {list.map((item) => (
                                <label key={item.id} className='formContainer--abilities__item'>
                                    <h5>{item.name}</h5>
                                    <img src={item.image} alt="ability icon"/>
                                    <input 
                                    style={{display: "none"}}
                                    type="checkbox"
                                    value= {item.id}
                                    {...register('WorkerCareerIds')}
                                    />
                                </label>
                            ))}
                            </div>
                            
                        </div>
                        <div className='formContainer--btn'>
                            <button className='btn-main' type="submit">ثبت</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </Fragment>
            
        </div>
    );
};

export default Signupworker;

