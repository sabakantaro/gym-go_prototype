import * as geolib from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Map({ events = [] }) {
  const [selectedLocation, setSelectedLocation] = useState<any>({});
  const coordinates = events?.map((event: any) => ({
    longitude: event?.long,
    latitude: event?.lat,
  }));
  const center: any = geolib.getCenter(coordinates);
  const [viewState, setViewState] = useState({
    longitude: center?.longitude || '',
    latitude: center?.latitude || '',
    zoom: 11,
  });

  return (
    <ReactMapGL
      style={{ width: "100%", height: "100%" }}
      {...viewState}
      mapStyle='mapbox://styles/ryosuke8291/clg8pdois001i01pgqj6xnd0z'
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(e) => setViewState(e.viewState)}
    >
      {events?.map((event: any) => (
        <div key={event?.long}>
          <Marker
            longitude={event?.long}
            latitude={event?.lat}
            offset={[-20, -10]}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(event)}
              style={{ cursor: 'pointer', fontSize: 24}}
              aria-label='push-pin'
            >
              📍
            </p>
          </Marker>
          {selectedLocation.long === event.long ? (
            <Popup
              onClose={() => setSelectedLocation(false)}
              closeButton={true}
              closeOnClick={false}
              latitude={event?.lat}
              longitude={event?.long}
              style={{padding: 24, paddingRight: 64}}
            >
              {event?.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
