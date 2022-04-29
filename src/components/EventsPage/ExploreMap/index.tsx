import { usePrevious } from '@chakra-ui/react';
import { getCenter } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';
import 'mapbox-gl/dist/mapbox-gl.css';
import NextImage from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGl, { GeolocateControl, MapRef, Marker, Popup } from 'react-map-gl';
import { Event } from '../../../generated/graphql';
import { areEqual } from '../../../lib/utils/areEqual';
import MarkerIcon from '../../Maps/MarkerIcon';
import { EventManyArray } from '../types';
import ExploreCardPopup from './ExploreCardPopup';

type Props = {
  events: EventManyArray;
};

type SelectedEvent = Pick<Event, 'longitude' | 'latitude' | 'id' | 'title'> | null;

export default function ExploreMap({ events }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>(null);
  // transform events to match {longitude: number, latitude: number}[]
  const coordinates: GeolibInputCoordinates[] = events
    ? events.map(({ longitude, latitude }) => ({
        longitude,
        latitude,
      }))
    : [];

  // get center of coordinates
  const center = getCenter(coordinates);
  const prevCenter = usePrevious(center);

  // set map to the current city
  useEffect(() => {
    if (mapRef && typeof center === 'object' && !areEqual(center, prevCenter)) {
      mapRef.current?.flyTo({
        center: [center.longitude, center.latitude],
        zoom: 11,
      });
    }
  }, [center, prevCenter]);

  const viewport = {
    width: '100%',
    height: '100%',
    zoom: 11,
    ...center,
  };

  if (!center) return null;

  const imgHeight = Math.floor(document.documentElement.clientHeight * 0.92);
  const imgWidth = Math.floor(document.documentElement.clientWidth * 0.35);

  return (
    <>
      {!mapLoaded && (
        <NextImage
          src={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USER}/${process.env.MAPBOX_STYLE}/static/${center.longitude},${center.latitude},11,0/${imgWidth}x${imgHeight}?access_token=${process.env.MAPS}`}
          layout={'fill'}
          objectFit={'cover'}
        />
      )}
      <ReactMapGl
        ref={mapRef}
        mapStyle={`mapbox://styles/${process.env.MAPBOX_USER}/${process.env.MAPBOX_STYLE}`}
        mapboxAccessToken={process.env.MAPS}
        initialViewState={viewport}
        doubleClickZoom={false}
        maxZoom={16}
        onLoad={() => setMapLoaded(true)}
        style={{ visibility: mapLoaded ? 'visible' : 'hidden' }}
      >
        <GeolocateControl />
        {events?.map((event, i) => (
          <div key={event.longitude + `${i}`}>
            <Marker key={event.longitude} longitude={event.longitude} latitude={event.latitude} anchor={'top'}>
              <MarkerIcon category={event.category} onClick={() => setSelectedEvent(event)} />
            </Marker>

            {selectedEvent && selectedEvent.id === event.id ? (
              <Popup
                longitude={selectedEvent.longitude}
                latitude={selectedEvent.latitude}
                closeOnClick={false}
                closeOnMove={true}
                onClose={() => setSelectedEvent(null)}
                anchor="bottom"
                closeButton={false}
              >
                <ExploreCardPopup {...selectedEvent} />
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </ReactMapGl>
    </>
  );
}
