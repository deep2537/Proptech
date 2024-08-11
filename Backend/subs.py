import matplotlib.pyplot as plt
import numpy as np

# Data
localities = ["JanKalyan Nagar", "Somwari Bazar", "Malvani", "Sunder Nagar", "SV Road", "Mindspace", "Evershine Nagar", "Kachpada", "Chincholi Bander", "Liberty Garden", "Mamledar Wadi"]
prices = [23250, 25250, 18000, 27500, 28000, 30000, 25500, 26000, 26500, 27500, 23500]

# Plotting the bar graph
plt.figure(figsize=(12, 6))
plt.bar(localities, prices, color='blue', alpha=0.7)

# Adding labels and title
plt.xlabel('Localities')
plt.ylabel('Prices')
plt.title('Prices by Locality')
plt.xticks(rotation=45, ha='right')

# Calculate and plot the trend line
z = np.polyfit(range(len(localities)), prices, 1)
p = np.poly1d(z)
plt.plot(localities, p(range(len(localities))), "r--")

# Display the graph
plt.tight_layout()
plt.show()
