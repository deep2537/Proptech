import React from 'react';
import { useState } from 'react';

const Predict = () => {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log("Prediction:", data.prediction);
            if (data.error) {
                setError(data.error);
            } else {
                setPrediction(data.prediction);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Text Prediction</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={4}
                    cols={50}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                    }}
                    placeholder="Enter your text here"
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    Predict
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            {prediction && (
                <p style={{ marginTop: '20px', fontSize: '18px' }}>
                    <strong>Prediction:</strong> {prediction}
                </p>
            )}
        </div>
    );
};

export default Predict;

