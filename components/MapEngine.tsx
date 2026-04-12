"use client";
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapEngine({ properties, onViewDetails }: any) {
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const [intel, setIntel] = useState({ lng: 29.0435, lat: 41.0769, zoom: 11.0 });

  useEffect(() => {
    if (map.current) return;
    
    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: {
        version: 8,
        sources: {
          'bright-sat': { 
            type: 'raster', 
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], 
            tileSize: 256 
          }
        },
        layers: [{ id: 'sat-layer', type: 'raster', source: 'bright-sat' }]
      },
      center: [29.0435, 41.0769],
      zoom: 11,
      pitch: 60
    });

    map.current.on('load', () => {
      const geojson = {
        type: 'FeatureCollection',
        features: (properties || []).map((p: any, i: number) => ({
          type: 'Feature',
          properties: { ...p, index: i + 1 },
          geometry: { type: 'Point', coordinates: [29.0435 + (i * 0.01), 41.0769 + (i * 0.01)] }
        }))
      };

      map.current.addSource('props-src', { type: 'geojson', data: geojson });
      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'props-src',
        paint: {
          'circle-color': '#FFF',
          'circle-radius': 18,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#1ABC9C'
        }
      });

      map.current.on('click', 'unclustered-point', (e: any) => {
        const feature = e.features[0].properties;
        onViewDetails(feature);
        map.current.flyTo({ center: e.lngLat, zoom: 18, pitch: 75, speed: 1.2 });
      });
    });

    map.current.on('move', () => {
      const c = map.current.getCenter();
      setIntel({ lng: c.lng.toFixed(4), lat: c.lat.toFixed(4), zoom: map.current.getZoom().toFixed(1) });
    });
  }, [properties, onViewDetails]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", top: "25px", left: "50%", transform: "translateX(-50%)", zIndex: 1000, background: "rgba(255,255,255,0.9)", border: "1px solid #1ABC9C", padding: "10px 40px", display: "flex", gap: "40px", borderRadius: "50px", backdropFilter: "blur(10px)" }}>
         <div style={{ textAlign: "center" }}>
           <div style={{ fontSize: "0.45rem", color: "#1ABC9C", fontWeight: "900", letterSpacing: "2px" }}>LAT : LNG</div>
           <div style={{ fontSize: "0.85rem", color: "#333", fontWeight: "700" }}>{intel.lat} : {intel.lng}</div>
         </div>
         <div style={{ borderRight: "1px solid #EEE" }}></div>
         <div style={{ textAlign: "center" }}>
           <div style={{ fontSize: "0.45rem", color: "#1ABC9C", fontWeight: "900", letterSpacing: "2px" }}>ZOOM</div>
           <div style={{ fontSize: "0.85rem", color: "#333", fontWeight: "700" }}>{intel.zoom}</div>
         </div>
      </div>
    </div>
  );
}
