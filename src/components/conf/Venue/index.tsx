import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SectionTitle from '../common/SectionTitle';
import Transport from './Transport';
import BusIcon from '../images/bus.svg';
import MetroIcon from '../images/metro.svg';
import CarIcon from '../images/car.svg';
import BikeIcon from '../images/bike.svg';
import Section from '../layout/Section';

const Venue: React.ComponentType = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.GATSBY_MAPBOX_KEY;
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ginifizz/cklgmlhwf758f17nulkah36re',
      center: [3.0179366, 50.6331443],
      zoom: 14,
      maxZoom: 16,
      minZoom: 9,
    });
    new mapboxgl.Marker()
      .setOffset([0, -50 / 2])
      .setLngLat([3.0179366, 50.6331443])
      .addTo(newMap);

    return () => newMap.remove();
  }, [mapContainerRef]);

  return (
    <Section className="conf__venue" section="venue">
      <div className="container">
        <SectionTitle>
          The <strong>venue</strong>
        </SectionTitle>
        <p className="conf__section-subtitle">
          The physical edition will take place in Lille, meeting point of European cities and touristic capital of the
          Flemish region. If you can&apos;t attend the event physically, you can watch it online.
        </p>
        <div className="venue__place">
          <div ref={mapContainerRef} className="venue__map dotted-corner corner-bottom corner-over" />
          <div className="venue__description dotted-corner">
            <h3 className="h4 lined">Euratechnologies</h3>
            <div className="overline venue__location">
              <span>Place de Saintignon</span>
              <span>165 avenue de Bretagne</span>
              <span>59000 Lille</span>
            </div>
            <p>
              Conferences will be held in EuraTechnologies, the 1st incubator & startups accelerator in France. Be part
              of this exceptional edition located at less than 1 hour from Paris and Brussels, 1h30 from London.
            </p>
          </div>
        </div>
        <div className="venue__transportation">
          <Transport title="By car" icon={CarIcon}>
            <p className="body2">
              <strong>A1 Lille-Paris</strong>
              <br />
              <span>Exit 2 then voie 2A to Lille</span>
            </p>
            <p className="body2">
              <strong>A25 Lille-Dunkerque</strong>
              <br />
              <span>Exit 1 &quot;Lille&quot; then voie 2A</span>
            </p>
          </Transport>
          <Transport title="By metro" icon={MetroIcon}>
            <p className="body2">
              <strong>Line 2 dir St Philibert</strong>
              <br />
              <span>From TGV station to Canteleu stop</span>
            </p>
          </Transport>
          <Transport title="By bus" icon={BusIcon}>
            <p className="body2">
              <strong>Bus 14</strong>
              <br />
              <span>From Lille Flandres Station to Republique stop</span>
            </p>
            <p className="body2">
              <strong>Bus 18</strong>
              <br />
              <span>From Republique to Euratechnologies stop</span>
            </p>
          </Transport>
          <Transport title="By bike" icon={BikeIcon}>
            <p className="body2">
              <strong>V’Lille Bike Station</strong>
              <br />
              <span>From TGV station to Euratechnologies station.</span>
            </p>
          </Transport>
        </div>
      </div>
    </Section>
  );
};

export default Venue;
