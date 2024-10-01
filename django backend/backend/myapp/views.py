# myapp/views.py
from django.shortcuts import HttpResponse
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import io
import pandas as pd
import json
import os
from django.conf import settings
plt.switch_backend('Agg')
def get_data(request):
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

        return HttpResponse(buf, content_type='image/png')
    else:
        return json({'message': f"Failed to retrieve the webpage. Status code: {response.status_code}"}, status=response.status_code)
def serve_data(request):
        # file_path = os.path.join(settings.BASE_DIR, 'myapp', 'all_ammenities.xlsx')
        df = pd.read_excel('all_amenities.xlsx')
        df = df.drop("location", axis=1)
        data_json = df.to_json(orient='records')
        data_dict = json.loads(data_json)  # Convert JSON string to a Python dictionary
        return JsonResponse(data_dict,safe=False)
import os
import pickle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

MODEL_PATH = 'ML_models/model.pkl'
VECTORIZER_PATH = 'ML_models/vectorizer.pkl'

try:
    with open(MODEL_PATH, 'rb') as model_file:
        loaded_model = pickle.load(model_file)

    with open(VECTORIZER_PATH, 'rb') as vectorizer_file:
        loaded_vectorizer = pickle.load(vectorizer_file)
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def predict_text(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            input_text = data.get('text')

            if input_text:
                X_input = loaded_vectorizer.transform([input_text])
                prediction = loaded_model.predict(X_input)
                
                # Convert numpy.int64 to Python int and map the result
                prediction_result = int(prediction[0])
                result_text = "Positive" if prediction_result == 1 else "Negative"

                return JsonResponse({'prediction': result_text})
            else:
                return JsonResponse({'error': 'No input text provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
# views.py
from django.http import JsonResponse
import googlemaps

# Initialize the Google Maps client with your API key
API_KEY = 'AIzaSyDWPGb_VYQJIskpHBYZz57Gw2RXJFZLgi4'
gmaps = googlemaps.Client(key=API_KEY)

def find_substations(request):
    ne_lat = float(request.GET.get('neLat'))
    ne_lng = float(request.GET.get('neLng'))
    sw_lat = float(request.GET.get('swLat'))
    sw_lng = float(request.GET.get('swLng'))

    # Example search query for substations
    places_result = gmaps.places_nearby(
        location=(ne_lat, ne_lng),
        radius=10000,  # Adjust radius as needed
        keyword='substation'
    )
    
    substations = []
    for place in places_result.get('results', []):
        if sw_lat <= place['geometry']['location']['lat'] <= ne_lat and sw_lng <= place['geometry']['location']['lng'] <= ne_lng:
            substations.append({
                'name': place.get('name'),
                'address': place.get('vicinity'),
                'lat': place['geometry']['location']['lat'],
                'lng': place['geometry']['location']['lng']
            })

    return JsonResponse(substations, safe=False)


