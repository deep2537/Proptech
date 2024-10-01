// components/FindSubstations.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';

const FindSubstations: React.FC = () => {
    const [substations, setSubstations] = useState<any[]>([]);

    useEffect(() => {
        const fetchSubstations = async () => {
            const selectedBounds = JSON.parse(localStorage.getItem('selectedBounds') || 'null');
            if (selectedBounds) {
                const northEast = selectedBounds[0];
                const southWest = selectedBounds[1];
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/find_substations', {
                        params: {
                            neLat: northEast[0],
                            neLng: northEast[1],
                            swLat: southWest[0],
                            swLng: southWest[1]
                        }
                    });
                    console.log(response);
                    setSubstations(response.data);
                } catch (error) {
                    console.error('Error fetching nearby substations:', error);
                    setSubstations([]);
                }
            }
        };
        fetchSubstations();
    }, []);

    return (
        <div>
            <h3>Nearby Substations</h3>
            <ul>
                {substations.map((substation, index) => (
                    <li key={index}>{substation.name} - {substation.address}</li>
                ))}
            </ul>
        </div>
    );
};

export default FindSubstations;
