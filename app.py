from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

CHAT_FILE = 'chat.json'

# Load messages from file
def load_messages():
    try:
        with open(CHAT_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

# Save message to file
def save_message(message):
    messages = load_messages()
    messages.append(message)
    with open(CHAT_FILE, 'w') as f:
        json.dump(messages, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    username = data.get('username', 'Anonymous')
    message = data.get('message', '')
    if message:
        msg = {
            'username': username,
            'message': message,
            'time': datetime.now().strftime('%H:%M:%S')
        }
        save_message(msg)
    return jsonify({'status': 'ok'})

@app.route('/messages')
def messages():
    return jsonify(load_messages())

if __name__ == '__main__':
    app.run(debug=True)
