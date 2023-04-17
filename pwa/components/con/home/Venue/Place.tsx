"use client";
import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SectionsContext } from "components/con/home/Section";
import Overline from "components/con/common/typography/Overline";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function Place() {
  const { Translate } = useContext(LanguageContext);
  const mapContainerRef = useRef(null);
  const { isVisible } = useContext(SectionsContext);
  const [initialized, setInitialized] = useState<boolean>(false);

  const createMap = useCallback(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current || "",
      style: "mapbox://styles/ginifizz/cklgmlhwf758f17nulkah36re",
      center: [3.0179366, 50.6331443],
      zoom: 5,
      maxZoom: 16,
      minZoom: 1,
    });
    new mapboxgl.Marker()
      .setLngLat([3.020125223382465, 50.63318866197429])
      .addTo(newMap);

    if ("ontouchstart" in document.documentElement) {
      newMap.dragPan.disable();
      newMap.scrollZoom.disable();
      newMap.touchPitch.disable();
      newMap.on("touchstart", function (e) {
        const oe = e.originalEvent;
        if (oe && "touches" in oe) {
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
    if (isVisible("venue") && !initialized) {
      createMap();
    }
  }, [createMap, isVisible, initialized]);

  const onMapClick = useCallback(() => {
    if (!initialized) {
      createMap();
    }
  }, [initialized, createMap]);

  return (
    <div className="p-0 max-w-lg relative w-full mx-auto flex flex-col | md:max-w-5xl md:mb-24 md:before:w-1/2 md:before:bg-blue md:before:h-[350px] md:before:absolute md:before:-translate-y-3 md:before:left-0 md:before:top-0">
      <div className="text-white inline-block w-full h-[350px] bg-[#2e2e2e] shadow-md | md:w-1/2 md:absolute md:z-10 md:translate-x-3">
        <div
          ref={mapContainerRef}
          className="h-full w-full"
          onClick={onMapClick}
        />
      </div>
      <div className="w-full dotted-corner py-12 px-4 bg-white text-center shadow-md | md:w-[calc(50%+120px)] md:pr-8 md:pl-[calc(120px+2rem)] md:ml-auto md:translate-y-10">
        <h3 className="h4 lined-center uppercase font-bold text-title text-2xl">
          Euratechnologies
        </h3>
        <Overline className="text-base text-text-secondary mb-8">
          <span className="block">165 avenue de Bretagne</span>
          <span className="block">59000 Lille</span>
          <span className="block">FRANCE</span>
        </Overline>
        <div className="font-normal">
          <Translate translationKey="venue.place" />
        </div>
      </div>
    </div>
  );
}
