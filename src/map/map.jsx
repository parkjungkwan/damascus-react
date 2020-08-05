import React,{useState,useCallback,useRef} from "react";
import { GoogleMap,useLoadScript,Marker,InfoWindow,} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode,getLatLng,getZipCode} from "use-places-autocomplete";
import Geocode from 'react-geocode'
import {Combobox,ComboboxInput, ComboboxPopover,ComboboxList, ComboboxOption,} from "@reach/combobox";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import './map.css'
import "@reach/combobox/styles.css";

const MAP_KEY = 'AIzaSyDgxaAVu6wZkfdefa5F1tDC6bVGXvLTqg0'

const libraries = ["places"]
const mapContainerStyle={
    width:"100%",
    height:"980px"
}

const options={
    zoomControl:true
}

const center = {
    lat : 36.620505,
    lng : 128.001429
}

const Map = () => {
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey : MAP_KEY,
        libraries,
        region : 'kr'
    })

    const mapRef = useRef();
    const onMapLoad = useCallback((map)=>{
        mapRef.current = map;
    },[])

    if(loadError) return "Error";
    if(!isLoaded) return "Loading...";

    return (
        <>
            <GoogleMap
                id={"map"}
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >

            </GoogleMap>
        </>
    )
};

export default Map;