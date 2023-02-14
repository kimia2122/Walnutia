import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import "./leaflet-style.scss";
import "../../style/components/_input.scss";
import locImg from "./location.svg";
import GPS from "./GPS.svg";


const Map = () => {

    const LocationMarker = () => {
        const [position, setPosition] = useState(null);

        const markerIcon = L.icon({
          iconUrl: locImg,
          iconSize: [90, 50],
          iconAnchor: [45, 41],
        });

        const map = useMapEvents({
            click(e) {
                localStorage.setItem("clickedLatLng", JSON.stringify(e.latlng));
                setPosition(e.latlng);
                console.log(e.latlng);
            },
            locationfound(e) {
                map.flyTo(e.latlng, map.getZoom());
                setPosition(e.latlng);
                localStorage.setItem("clickedLatLng", JSON.stringify(e.latlng));
            }
        })

        return position === null ? null : (
            <Marker position={position} icon={markerIcon}></Marker>
        )
    }

    const LocationButton = (props) => {
        const map = useMap();
        return (
            <div 
            onClick={() => {
                map.locate();
            }}
            >
                {props.children}
            </div>
        )
    }

    return (
        <div>
            <MapContainer 
            className="mapContainer"
            center={
                localStorage.getItem("clickedLatLng")
                ? JSON.parse(localStorage.getItem("clickedLatLng" || "") || "")
                : [35.700055681658064, 51.3779310125392] 
            } 
            zoom={13} 
            minZoom={5}
            scrollWheelZoom={false}
            >
                <input
                className="addressInput input-main"
                placeholder="جستجوی آدرس"
                />
                <LocationMarker />
                <LocationButton>
                    <img className="gps" src={GPS} alt="gps icon" />
                </LocationButton>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
};

export default Map;