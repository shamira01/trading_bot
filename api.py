from flask import Flask, request, jsonify
from trading_bot.bot import BasicBot
import os
from dotenv import load_dotenv
from flask_cors import CORS  # <-- import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # <-- enable CORS for all routes

# Read API keys from environment variables
api_key = os.getenv('BINANCE_API_KEY')
api_secret = os.getenv('BINANCE_API_SECRET')

if not api_key or not api_secret:
    raise Exception("Please set BINANCE_API_KEY and BINANCE_API_SECRET in your .env file")

# Initialize the trading bot (using Binance Testnet)
bot = BasicBot(api_key, api_secret, testnet=True)

@app.route('/')
def home():
    return "Trading Bot API is running!"

@app.route('/order', methods=['POST'])
def place_order():
    data = request.json

    symbol = data.get('symbol')
    side = data.get('side')
    order_type = data.get('type')
    quantity = data.get('quantity')
    price = data.get('price', None)  # price is optional (for MARKET orders)

    # Validate required parameters
    if not all([symbol, side, order_type, quantity]):
        return jsonify({"error": "Missing required parameters: symbol, side, type, quantity"}), 400

    try:
        order = bot.place_order(
            symbol=symbol,
            side=side,
            order_type=order_type,
            quantity=quantity,
            price=price
        )
    except Exception as e:
        # Return error info on failure
        return jsonify({"error": str(e)}), 500

    return jsonify(order)

if __name__ == '__main__':
    # Run Flask app on port 5000 with debug enabled
    app.run(port=5000, debug=True)
