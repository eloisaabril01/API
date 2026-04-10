from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/input', methods=['GET'])
def get_response():
    # Extracting the "chat" parameter from the URL
    user_query = request.args.get('chat', '')
    
    # Defining the fixed output structure
    response_data = {
        "answer": "Narendra Modi is the current Prime Minister of India, serving since 2014. He previously served as the Chief Minister of Gujarat.",
        "model": "DeepSeek-V3-0324",
        "question": user_query
    }
    
    return jsonify(response_data)

# Required for Vercel
def handler(event, context):
    return app(event, context)
