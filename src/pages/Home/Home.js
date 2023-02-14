import React from "react";

import history from "../../History/history";
import Header from "../../components/Header/header";
import FAB from "../../components/BTN/FAB-addwork";
import Footer from "../../components/Footer/footer";
import HeroImage from "../../Assets/svg/HeroImage.svg";
import "./home-style.scss";

const Home = () => {

    const btnClicked = (e) => {
        e.preventDefault();
        if(localStorage.getItem("isEmployer") === "true") {
            history.push("/Order");
        } if (localStorage.getItem("isEmployer") === "false") {
            history.push("/Login");
        }
        console.log("btn is working");
    }
    return (
        <div className="homeContainer">
            <div className="homeheader"><Header /></div>
            <div className="homehero">
                <img src={HeroImage} alt="hero image" />
                    <div>
                    به صورت اینترنتی در کمترین زمان نیرو بگیر <br/>و پیشرفت کار رو پیگیری کن  
                    </div>
                    <button onClick={btnClicked}>همین الان نیرو بگیر</button>
                
            </div>
            <div className="homeoptions">
                <div style={{display: "flex"}}>
                    <div>تعهد</div>
                    <div>گاراتنی</div>
                    <div>راحتی</div>
                </div>
                <div>
                    <div>
                        1 . ثبت نام کن و آدرس هاتو ثبت کن
                    </div>
                    <div>
                    2 . کار مورد نظرتو ثبت کن 
                    </div>
                    <div>
                        3 . همکاری ما آغاز شد
                    </div>
                    <div>
                        4 . روند کار رو بررسی کن و حساب کتاباتو بکن
                    </div>
                </div>
            </div>
            <div className="homesignin">
                    <div>کارجویان عزیز برای همکاری کافیه ثبت نام کنید</div>
                    <button onClick={() => history.push("/Login")}>ثبت نام</button>
            </div>
            <div className="homefab" onClick={btnClicked}><FAB /></div>
            <div className="homefooter"><Footer /></div>
        </div>
    );
};

export default Home;

