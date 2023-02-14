import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignupEmployer, clearState, userSelector } from '../../Store/features/User/signupEmployerSlice';
import history from '../../History/history';

//using signupW-style.scss
import "./signupE-style.scss"
import backIcon from "../../Assets/svg/backIcon.svg";
import signupbg from "../../Assets/svg/signupbg.svg";
import userProfile from "../../Assets/svg/userProfile.svg";
import mapicon from "../../Assets/svg/map-marker-navy.svg"


const  Signupemployer = () => {

    const [ formData, setFormData ] = useState(
        {
            fullName: "",
            address: "",
            image: "",
          }
    );
    const [image, setImage] = useState([]);
    const [profilePreview, setProfilePreview] = useState("");

    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError } = useSelector(userSelector);

    const onSubmit = ({FullName, Address, Image}) => {
        console.log(JSON.parse(localStorage.getItem(("clickedLatLng"))).lat?.toString());
        console.log(Image);
        dispatch(SignupEmployer({
            Phone: localStorage.getItem("PhoneNumber" || ""),
            Lat: JSON.parse(localStorage.getItem(("clickedLatLng"))).lat?.toString(),
            Long: JSON.parse(localStorage.getItem(("clickedLatLng"))).lng?.toString(),
            FullName, Address, Image
        }));
        
    };
    useEffect(() => {
       setFormData({ ...formData, image: image[0] });
      }, [image]);
    

    useEffect(() => {
        setFormData({
          ...formData,
          address: sessionStorage.getItem("address") || "",
          fullName: sessionStorage.getItem("fullName") || "",
        });
      }, []);

    useEffect(() => {
        if (isError) {  
          dispatch(clearState());
        }
        if (isSuccess) {
          dispatch(clearState());
        }
        if (isFetching) {
            dispatch(clearState());
          }
    }, [isFetching, isError, isSuccess]);

    return (
        <div className="signupContainer">
                <img className='backIcon' src={backIcon} alt="back icon" />
                <div className='signupBox'>
                    <img className='signupBox--bg' src={signupbg} alt="back ground" />
                    <div className='signupBox--text'>
                        <div className='signupBox--text__red'>هر روز سرکار باش</div>
                        <div className='signupBox--text__header'>برای همکاری ثبت نام کنید</div>
                    </div>
                    <div className='signupBox--content formContainer'>
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
                                onChange={(e) => {
                                    if (image.length > 0) {
                                    image.pop();
                                    }
                                    setImage([...image, e.target.files[0]]);
                                    localStorage.setItem("Image", Image);
                                    if (e.target.files) {
                                    setProfilePreview(URL.createObjectURL(e.target.files[0]));
                                    } else return "";
                                }}
                                />
                        </label>
                    <div className='formContainer--inputs'>
                        <input
                            className='input-main formContainer--inputs__input'
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder='نام و نام خانوادگی'
                            value= {formData.fullName}
                            onChange={ (e) => {
                                sessionStorage.setItem("fullName", e.target.value);
                                setFormData(() => ({
                                    ...formData,
                                    fullName: e.target.value,
                                }));
                            }}
                            />
                        <input 
                            className='input-main formContainer--inputs__input'
                            id="Address"
                            name="Address"
                            type="text"
                            placeholder='آدرس'
                            value={formData.address}
                            onChange={(e) => {
                                sessionStorage.setItem("address", e.target.value);
                                setFormData(() => ({
                                    ...formData,
                                    address: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div className='mapbtn-content'>
                        <div className='mapbtn-content--text'>انتخاب از روی نقشه</div>
                        <button className='mapbtn-content--btn' onClick={() =>{history.push("/MapSignup")}}>
                            <img src={mapicon} alt="map icon"/>
                        </button>
                    </div>
                    <div className='formContainer--btn'>
                        <button 
                        className='btn-main'
                        onClick={() => {
                            onSubmit({
                                Address: formData.address,
                                FullName: formData.fullName,
                                Image: image[0]
                            }) 
                        }}
                        >
                         ثبت
                        </button> 
                    </div>
                    </div>
                </div>
        </div>
    );
};

export default  Signupemployer;