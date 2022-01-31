import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../mapStyles.json";

function Map({searchResult, selectedProperty, setSelectedProperty, setTweetsResult}) {

  const WrappedMap = withScriptjs(
    withGoogleMap(() =>
      <GoogleMap
        defaultZoom={5.5}
        defaultCenter={{ lat: 47.3170042, lng: 3.6048264 }}
        options={{ styles: mapStyles }}
      >
        {searchResult && searchResult.map(property =>
          <Marker
            key={property.id}
            position={{
              lat: property.lat,
              lng: property.lng
            }}
            icon={{
              url: "https://twimap.com/logo.png",
              scaledSize: new window.google.maps.Size(28, 28)
            }}
            onClick={() => {
              setSelectedProperty(property);
              setTweetsResult(null);
            }}
          />
        )}

        {selectedProperty &&
          <InfoWindow
            position={{
              lat: selectedProperty.lat,
              lng: selectedProperty.lng
            }}
            onCloseClick={() => {
              setSelectedProperty(null);
              setTweetsResult(null);
            }}
          >
            <div>
              <h5>
                {selectedProperty.name} : {selectedProperty.count}
              </h5>
            </div>
          </InfoWindow>}
      </GoogleMap>
    )
  );

  return (
    <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCVc5BV5f51pj4r0K3RhGy4EDVGFKyGfqo`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
      
  );
}

export default Map;
