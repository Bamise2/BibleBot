

from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv  # Load environment variables


load_dotenv()

# Set up API key and model

API_KEY = os.getenv("API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash-002')

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Define the API endpoint for generating chatbot responses
@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.json.get("question")

    # Generate the response using the model
    prompt = f"""You are a Christian spiritual assistant. 
    Your response should be Christocentric, provide Bible verses, spiritual guidance, and encouragement. 
    If the user is in need of comfort, provide them with Bible verses that help them focus on the finished work of Christ on the cross.
    User Input: {user_input}
    """

    response = model.generate_content(prompt)
    response_text = response.text

    return jsonify({"answer": response_text})

if __name__ == "__main__":
    app.run(debug=True)




