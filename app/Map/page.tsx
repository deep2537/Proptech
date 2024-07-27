"use client";
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Page: React.FC = () => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('leaflet').then((L) => {
                if (mapContainerRef.current && !mapRef.current) {
                    const map = L.map(mapContainerRef.current, {
                        center: [19.076, 72.8777],
                        zoom: 15,
                        zoomControl: false,
                        crs: L.CRS.EPSG3857,
                        preferCanvas: false,
                    });

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        detectRetina: false,
                        maxNativeZoom: 19,
                        maxZoom: 19,
                        minZoom: 0,
                        noWrap: false,
                        opacity: 1,
                        tms: false,
                    }).addTo(map);

                    const selectedBounds = JSON.parse(localStorage.getItem('selectedBounds') || 'null');
                    if (selectedBounds) {
                        const bounds = L.latLngBounds(
                            [selectedBounds[0][0], selectedBounds[0][1]],
                            [selectedBounds[1][0], selectedBounds[1][1]]
                        );

                        const rectangle = L.rectangle(bounds, {
                            color: 'blue',
                            weight: 3,
                            fillColor: 'green',
                            fillOpacity: 0.0,
                        }).addTo(map);

                        map.fitBounds(rectangle.getBounds());
                    }

                    mapRef.current = map;
                }
            });
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', marginTop: '40px' }}>
            <div style={{ position: 'absolute', marginLeft: '40px', width: '600px', height: '350px', left: 0, background: '#fff', border: '1px solid #ccc', overflow: 'hidden' }}>
                <div id="map" ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div style={{ position: 'relative', width: '100px', height: '100px', flex: 1 }}></div>
        </div>
    );
};

export default Page;
