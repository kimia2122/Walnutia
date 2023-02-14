import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';

import { loginEmployer, loginWorker, clearState, userSelector } from "../../Store/features/User/loginSlice";
import "./login-style.scss";
import WalnutiaLogo from "../../Assets/svg/BigLogo.svg";
import TextWalnutiaBig from "../../Assets/svg/Walnutia.svg";

const Login = () => {
 
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();
    const { isSuccess, isError } = useSelector(userSelector);
    
    
    const onSubmitEmployer = (Phone) => {
        dispatch(loginEmployer(Phone));
    };
    const onSubmitWorker = (Phone) => {
        dispatch(loginWorker(Phone));
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
            
            <Fragment>
                <div className="loginBox">
                    <div className="loginBox__header">
                        در خدمت شما هستیم
                    </div>
                    <div className="loginBox__form">
                        <div className="loginBox__form--item">
                            <form
                            onSubmit={handleSubmit(onSubmitEmployer)}
                            method="POST"
                            >
                                <input
                                className="input-main"
                                id="phone"
                                name="phone"
                                type="number"
                                autoComplete="number"
                                placeholder=" +989 - - - "
                                {...register('Phone', { required: true })}
                                />
                                <button className="btn-main" type="submit">ورود و ثبت نام کارفرما</button>
                            </form>
                        </div>
                        <div>
                            <form
                            onSubmit={handleSubmit(onSubmitWorker)}
                            method="POST"
                            >
                                <button className="btn-main" type="submit">ورود و ثبت نام مجری</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
            
        </div>
    )
}
// var persianNumbers = [
//     /۰/g,
//     /۱/g,
//     /۲/g,
//     /۳/g,
//     /۴/g,
//     /۵/g,
//     /۶/g,
//     /۷/g,
//     /۸/g,
//     /۹/g,
//   ],
//   arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
// export const fixNumbers = function (str) {
//   if (typeof str === "string") {
//     for (var i = 0; i < 10; i++) {
//       str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
//     }
//   }
//   return str;
// };


export default Login;


