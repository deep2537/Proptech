import requests
import pandas as pd
from geopy.distance import geodesic
import matplotlib.pyplot as plt
from openpyxl import Workbook

# Provided centroids
centroids = [
    (19.085441285714285, 72.824376), 
    (19.037646714285714, 72.88386)
]

# Function to get nearby amenities using the Google Places API
def get_nearby_amenities(lat, lon, amenity_types, api_key, radius):
    amenities = []
    for amenity_type in amenity_types:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius={radius}&type={amenity_type}&key={api_key}"
        response = requests.get(url)
        results = response.json().get('results', [])
        for result in results:
            amenities.append({
                'name': result['name'],
                'location': (result['geometry']['location']['lat'], result['geometry']['location']['lng']),
                'type': amenity_type
            })
    return amenities

# Function to calculate distances to amenities
def calculate_distances(center_location, amenities):
    for amenity in amenities:
        amenity['distance_km'] = geodesic(center_location, amenity['location']).km
    return amenities

# Function to create a DataFrame and plot the data for a specific block
def create_dataframe_and_plot(amenities, block_number):
    df = pd.DataFrame(amenities)
    print(f"\nBlock {block_number} Amenities Data:\n", df[['name', 'type', 'distance_km']])
    
    # Save DataFrame to Excel
    df.to_excel(f'block_{block_number}_amenities.xlsx', index=False)
    
    # Pie Chart
    plt.figure(figsize=(8, 8))
    df['type'].value_counts().plot.pie(autopct='%1.1f%%', startangle=90, colors=plt.cm.Paired.colors)
    plt.title(f'Amenity Type Distribution for Block {block_number}')
    plt.ylabel('')
    plt.savefig(f'block_{block_number}_pie_chart.png')
    plt.close()

# Main function
def main():
    api_key = 'AIzaSyDWPGb_VYQJIskpHBYZz57Gw2RXJFZLgi4'  # Replace with your actual Google Maps API key
    amenity_types = ['school', 'airport', 'subway_station', 'lodging']
    radius = 5000  # Radius in meters (5 km)
    
    all_amenities_data = []
    
    for i, centroid in enumerate(centroids, 1):
        print(f"\nProcessing Block {i} Centroid: ({centroid[0]}, {centroid[1]})")
        amenities = get_nearby_amenities(centroid[0], centroid[1], amenity_types, api_key, radius)
        amenities = calculate_distances(centroid, amenities)
        all_amenities_data.extend(amenities)
        print(f"Radius: {radius/1000} km, Number of Amenities: {len(amenities)}")
        for amenity in amenities:
            print(f"Amenity: {amenity['name']}, Type: {amenity['type']}, Distance: {amenity['distance_km']:.2f} km")

        # Create DataFrame and pie chart for the current block
        create_dataframe_and_plot(amenities, i)

    # Save all amenities data to a single Excel file
    all_amenities_df = pd.DataFrame(all_amenities_data)
    all_amenities_df.to_excel('all_amenities.xlsx', index=False)

if __name__ == '__main__':
    main()
