import React, { useEffect } from "react";
import history from "../../History/history";
import { useSelector, useDispatch } from "react-redux";

import Map from "../../components/Map/leaflet";
import { clearReducer, userSelector, AddAddressEmployer } from "../../Store/features/User/Employer/addAddressSlice";

const AddAddress = () => {
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError } = useSelector(userSelector);

    const onSubmit = ({ Address }) => {
        dispatch(AddAddressEmployer({ 
            Address,
            Lat: JSON.parse(localStorage.getItem(("clickedLatLng"))).lat?.toString(),
            Lng: JSON.parse(localStorage.getItem(("clickedLatLng"))).lng?.toString(), 
        }));
        console.log({Address});
        history.push ("/Profile-Employer");
    }

    useEffect(() => {
        if (isError) {  
          dispatch(clearReducer());
        }
        if (isSuccess) {
          dispatch(clearReducer());
        }
        if (isFetching) {
            dispatch(clearReducer());
          }
    }, [isFetching, isError, isSuccess]);


    return (
        <div>
            <Map />
            <div>
                <button className="btn-main-dark" onClick={onSubmit}>ثبت</button>
            </div>
        </div>
    )
};

export default AddAddress;