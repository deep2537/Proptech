import pickle
# Load the trained model from the pickle file
with open('model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Load the vectorizer from the pickle file
with open('vectorizer.pkl', 'rb') as vectorizer_file:
    loaded_vectorizer = pickle.load(vectorizer_file)

input_text = "The slow but steady death of Nariman Point"

# Transform the input text
X_input = loaded_vectorizer.transform([input_text])

# Make a prediction
prediction = loaded_model.predict(X_input)

print(prediction)
