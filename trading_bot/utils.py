# trading_bot/utils.py

def format_order_output(order_response):
    if not order_response:
        return "No response from order placement."

    output = [
        f"Symbol: {order_response.get('symbol')}",
        f"Order ID: {order_response.get('orderId')}",
        f"Status: {order_response.get('status')}",
        f"Side: {order_response.get('side')}",
        f"Type: {order_response.get('type')}",
        f"Price: {order_response.get('price')}",
        f"Executed Quantity: {order_response.get('executedQty')}",
        f"Client Order ID: {order_response.get('clientOrderId')}"
    ]
    return "\n".join(output)
