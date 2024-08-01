# app.py

from flask import Flask, jsonify, send_file
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import io

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    url = 'https://housing.com/price-trends/property-rates-for-buy-in-malad_west_mumbai-P1fpe7ny75kk46ut4'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract property rates
        property_rates = []
        rate_elements = soup.find_all('span', class_='css-5sq9yq')
        for rate_element in rate_elements:
            rate = rate_element.get_text(strip=True)
            rate_clean = rate.split('-')[-1].replace('₹', '').replace(',', '')
            try:
                property_rates.append(int(rate_clean))
            except ValueError:
                continue

        # Extract locality names
        locality_names = []
        locality_elements = soup.find_all('a', class_='css-673lf3')
        for locality_element in locality_elements:
            locality = locality_element.get_text(strip=True)
            locality_names.append(locality)
        
        # Ensure the lengths match to avoid any mismatches
        min_length = min(len(property_rates), len(locality_names))
        property_rates = property_rates[:min_length]
        locality_names = locality_names[:min_length]
        
        # Generate the plot
        plt.figure(figsize=(12, 6))
        plt.bar(locality_names[:19], property_rates[:19], color='skyblue')
        plt.plot(locality_names[:19], property_rates[:19], color='green', marker='o')
        plt.ylabel('Property Rates (in ₹)')
        plt.xlabel('Locality Names')
        plt.title('Property Rates in Different Localities')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()

        # Save the plot to a bytes buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plt.close()
        
        return send_file(buf, mimetype='image/png')
    else:
        return jsonify({'message': f"Failed to retrieve the webpage. Status code: {response.status_code}"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
