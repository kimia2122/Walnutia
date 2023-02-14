import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from 'react-otp-input';

import { employerCheckCode, workerCheckCode, clearState, userSelector } from "../../Store/features/User/checkcodeSlice";

//using login-style.scss
import WalnutiaLogo from "../../Assets/svg/BigLogo.svg";
import TextWalnutiaBig from "../../Assets/svg/Walnutia.svg";

const GetCode = () => {
    const [otp, setOtp] = useState( { otp: "" });
    const handleChange = (otp) => setOtp({otp});


    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector(userSelector);
    
    const onSubmit = ({Code}) => {
        if (localStorage.getItem("isWorker") === "true") {
            dispatch(workerCheckCode({ Phone: localStorage.getItem("PhoneNumber" || ""), Code}))
        }
        if (localStorage.getItem("isEmployer") === "true") {
            dispatch(employerCheckCode({Phone: localStorage.getItem("PhoneNumber" || ""), Code}))
        }
    };
 
    useEffect(() => {
        if (isError) {  
          dispatch(clearState());
        }
        if (isSuccess) {
          dispatch(clearState());
        }
      }, [isError, isSuccess]);

    return (
        <div className="loginContainer">
            <img className="big-logo" src={WalnutiaLogo} alt="Big Logo" />
            <img className="big-walnutia" src={TextWalnutiaBig} alt="Text Walnutia" />

                <div className="loginBox">
                    <div className="loginBox__header">در خدمت شما هستیم</div>
                    <div className="loginBox__form">
                        <OtpInput
                        inputStyle={{ 
                            width: "4rem",
                            height: "4rem",
                            margin: "0 1rem",
                            backgroundColor: "#ffffff",
                            color: "$color-base-navy",
                            border: "none",
                            borderRadius: "1.2rem",
                            fontFamily: "$font-regular",
                            fontSize: "$font-size-medium"
                        }}
                        id="codeNumber"
                        name="codeNumber"
                        type="number"
                        autoComplete="number"
                        numInputs={4}
                        separator={<span></span>}
                        value={otp.otp}
                        onChange={handleChange}
                        /> 
                                
                        <button 
                        style={{ marginTop: "3rem" }}
                        className="btn-main" 
                        onClick={() => {onSubmit({Code: otp.otp})}} 
                        >
                            کد رو بزن اوسکل
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default GetCode;
