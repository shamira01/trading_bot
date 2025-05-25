 # trading_bot/validators.py

def is_valid_symbol(symbol):
    # Placeholder for symbol validation, e.g. check format or list
    return isinstance(symbol, str) and len(symbol) > 0

def is_valid_side(side):
    return side in ['BUY', 'SELL']

def is_valid_order_type(order_type):
    return order_type in ['MARKET', 'LIMIT']

def is_valid_quantity(quantity):
    return isinstance(quantity, (int, float)) and quantity > 0

