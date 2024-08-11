import folium

# Define the coordinates
top_left = (19.085441285714285, 72.824376)
top_right = (19.085441285714285, 72.88386)
bottom_left = (19.037646714285714, 72.824376)
bottom_right = (19.037646714285714, 72.88386)

# Create a map centered around the midpoint of the rectangle
map_center = [(top_left[0] + bottom_right[0]) / 2, (top_left[1] + bottom_right[1]) / 2]
print(map_center)
m = folium.Map(location=map_center, zoom_start=14)

# Add the rectangle
folium.Rectangle(
    bounds=[top_left, bottom_right],
    color='green',
    fill=True,
    fill_opacity=0.2
).add_to(m)

# Save the map to an HTML file
m.save('rectangle_map.html')
