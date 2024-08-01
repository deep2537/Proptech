"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/data`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data from the backend');
      });
  }, [apiUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
