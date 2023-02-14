import React from "react";
import history from "../../History/history";

import Map from "../../components/Map/leaflet"


const MapSignup = () => {

    return (
        <div>
            <Map />
            <div>
                <button className="btn-main-dark" onClick={() => { history.push ("/Signup-employer")}}>ثبت</button>
            </div>
        </div>
    )
};

export default MapSignup;