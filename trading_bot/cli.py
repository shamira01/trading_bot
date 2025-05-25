import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Trading Bot CLI")
    parser.add_argument('--symbol', required=True, help='Trading symbol, e.g. BTCUSDT')
    parser.add_argument('--side', required=True, choices=['BUY', 'SELL'], help='Order side')
    parser.add_argument('--type', required=True, choices=['MARKET', 'LIMIT'], help='Order type')
    parser.add_argument('--quantity', type=float, required=True, help='Order quantity')
    parser.add_argument('--price', type=float, default=None, help='Order price (required for LIMIT orders)')
    
    args = parser.parse_args()

    # For LIMIT orders, price is mandatory
    if args.type == 'LIMIT' and args.price is None:
        parser.error("--price is required when --type is LIMIT")

    return args
