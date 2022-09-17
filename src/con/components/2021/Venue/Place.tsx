/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useContext, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SectionContext } from '@con/components/common/Section';

function Place(): React.ComponentType {
  const mapContainerRef = useRef(null);
  const isVisible = useContext(SectionContext);
  const [initialized, setInitialized] = useState<boolean>(false);

  const createMap = useCallback(() => {
    mapboxgl.accessToken = process.env.GATSBY_MAPBOX_KEY;
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ginifizz/cklgmlhwf758f17nulkah36re',
      center: [3.0179366, 50.6331443],
      zoom: 5,
      maxZoom: 16,
      minZoom: 1,
    });
    new mapboxgl.Marker().setLngLat([3.020125223382465, 50.63318866197429]).addTo(newMap);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      newMap.dragPan.disable();
      newMap.scrollZoom.disable();
      newMap.touchPitch.disable();
      newMap.on('touchstart', function (e) {
        const oe = e.originalEvent;
        if (oe && 'touches' in oe) {
          if (1 < oe.touches.length) {
            oe.stopImmediatePropagation();
            newMap.dragPan.enable();
          } else {
            newMap.dragPan.disable();
          }
        }
      });
    }

    setInitialized(true);
    return newMap;
  }, [setInitialized, mapContainerRef]);

  useEffect(() => {
    // build map when section is visible
    if (isVisible && !initialized) {
      createMap();
    }
  }, [createMap, isVisible, initialized]);

  const onMapClick = useCallback(() => {
    if (!initialized) {
      createMap();
    }
  }, [initialized, createMap]);

  return (
    <div className="venue__place">
      <div ref={mapContainerRef} className="venue__map dotted-corner corner-bottom corner-over" onClick={onMapClick} />
      <div className="venue__description dotted-corner">
        <h3 className="h4 lined">Euratechnologies</h3>
        <div className="overline venue__location">
          <span>165 avenue de Bretagne</span>
          <span>59000 Lille</span>
          <span>FRANCE</span>
        </div>
        <p>
          Be part of this exceptional edition located at less than 1 hour from Paris and Brussels, 1h30 from London.
        </p>
        <p>Conferences will be held in EuraTechnologies, the 1st incubator & startups accelerator in France.</p>
      </div>
    </div>
  );
}

export default Place;
