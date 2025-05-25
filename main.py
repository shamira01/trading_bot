# main.py

import os
from dotenv import load_dotenv
from trading_bot.bot import BasicBot
from trading_bot.cli import parse_args
from trading_bot.logger import setup_logger
from trading_bot.utils import format_order_output

def main():
    # Load environment variables from .env file
    load_dotenv()

    # Setup logging
    setup_logger()

    # Get API credentials from environment
    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_API_SECRET')

    # Ensure keys are available
    if not api_key or not api_secret:
        print("❌ Missing API key or secret in .env file.")
        return

    # Choose whether to use testnet or live trading
    USE_TESTNET = False  # ✅ Set to True for testing safely

    # Initialize bot
    bot = BasicBot(api_key, api_secret, testnet=USE_TESTNET)

    # Parse command line arguments
    args = parse_args()

    print("🚀 Starting the trading bot...")
    print(f"🔍 Parsed arguments: {args}")

    try:
        # Place the order
        order = bot.place_order(
            symbol=args.symbol,
            side=args.side,
            order_type=args.type,
            quantity=args.quantity,
            price=args.price
        )

        # Output the result in clean format
        print(format_order_output(order))

    except Exception as e:
        print(f"❌ Error while placing order: {e}")


if __name__ == "__main__":
    main()
