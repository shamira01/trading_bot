# trading_bot/bot.py

import hmac
import hashlib
import time
import requests
from urllib.parse import urlencode

class BasicBot:
    def __init__(self, api_key, api_secret, testnet=True):
        self.api_key = api_key
        self.api_secret = api_secret.encode()
        self.base_url = 'https://testnet.binancefuture.com' if testnet else 'https://fapi.binance.com'
        self.session = requests.Session()
        self.session.headers.update({'X-MBX-APIKEY': self.api_key})

    def _sign(self, params):
        query_string = urlencode(params)
        signature = hmac.new(self.api_secret, query_string.encode(), hashlib.sha256).hexdigest()
        return signature

    def place_order(self, symbol, side, order_type, quantity, price=None):
        path = '/fapi/v1/order'
        url = self.base_url + path

        timestamp = int(time.time() * 1000)

        params = {
            'symbol': symbol,
            'side': side,
            'type': order_type,
            'quantity': quantity,
            'timestamp': timestamp,
            'recvWindow': 5000
        }

        if order_type == 'LIMIT':
            if price is None:
                raise ValueError("Price must be specified for LIMIT orders")
            params['price'] = price
            params['timeInForce'] = 'GTC'  # Good-Til-Canceled

        # Add signature
        params['signature'] = self._sign(params)

        try:
            response = self.session.post(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {'code': -1, 'msg': str(e)}
