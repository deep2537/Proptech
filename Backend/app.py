from flask import Flask, jsonify, send_file, send_from_directory
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import io
import pandas as pd
import json
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
        plt.figure(figsize=(10, 6))
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

@app.route('/api/graph', methods=['GET'])
def serve_image():
    # Serve the image from the 'static' directory
    try:
        return send_from_directory('static', 'block_1_pie_chart.png', mimetype='image/png')
    except Exception as e:
        return jsonify({'message': str(e)}), 404

@app.route('/api/graph2', methods=['GET'])
def serve_data():
    try:
        df = pd.read_excel("all_ammenities.xlsx")
        df = df.drop("location", axis=1)
        data_json = df.to_json(orient='records')
        data_dict = json.loads(data_json)  # Convert JSON string to a Python dictionary
        return jsonify(data_dict)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
