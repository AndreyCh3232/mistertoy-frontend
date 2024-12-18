import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '50px' }}>{text}</div>

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function onMapClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    return (
        <div style={{ margin: '50px', height: '80vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDV9fjU-Mk0sA3qkQ9z_9o9k2tKoVj6WE4" }}
                center={coordinates}
                defaultZoom={zoom}
                onClick={onMapClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🙂"
                />
            </GoogleMapReact>
        </div>
    )
}