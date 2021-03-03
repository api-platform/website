import React, { useLayoutEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SectionTitle from '../common/SectionTitle';
import Transport from './Transport';
import BusIcon from '../images/bus.svg';
import MetroIcon from '../images/metro.svg';
import CarIcon from '../images/car.svg';
import BikeIcon from '../images/bike.svg';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luaWZpenoiLCJhIjoiY2tsZ2c3d3Z1MWs1MDJvbWpvdjM2MGg4ZSJ9.5jBAlLJbO-gf2_BQGzfZ0Q';

const Venue: React.ComponentType = () => {
  useLayoutEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ginifizz/cklgmlhwf758f17nulkah36re',
      center: [3.0179366, 50.6331443],
      zoom: 14,
      maxZoom: 16,
      minZoom: 9,
    });
    new mapboxgl.Marker()
      .setOffset([0, -50 / 2])
      .setLngLat([3.0179366, 50.6331443])
      .addTo(map);
  }, []);
  return (
    <section className="conf__venue">
      <div className="container">
        <SectionTitle>
          The <strong>venue</strong>
        </SectionTitle>
        <div className="venue__place">
          <div id="map" className="venue__map dotted-corner corner-bottom corner-over" />
          <div className="venue__description dotted-corner">
            <h3 className="h4 lined">Euratechnologies</h3>
            <div className="overline venue__location">
              <span>Place de Saintignon</span>
              <span>165 avenue de Bretagne</span>
              <span>59000 Lille</span>
            </div>
            <p>
              EuraTechnologies, the 1st incubator & accelerator in France, is a center of excellence and innovation
              located in Lille over 80,000 m² and on 3 other sectoral campuses in Roubaix, Willems and Saint-Quentin.
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
    </section>
  );
};

export default Venue;
