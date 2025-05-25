# Trading Bot

This cryptocurrency trading bot features a React frontend and Flask backend that interact with the Binance testnet API to place buy and sell orders. Users can execute trades through an intuitive interface while the backend securely manages order processing and communication with Binance. This project enables testing of automated trading strategies in a risk-free environment.



---

## Features

- Place BUY/SELL orders on Binance testnet
- Supports MARKET and LIMIT order types
- Simple, clean React UI for order placement
- Flask REST API backend handling order logic
- Environment variable management for API keys
- Detailed order response display

---

## Architecture Overview

This Trading Bot project is designed with a **frontend-backend** architecture:

### 1. Frontend (React)
- **Purpose:** Provides a user interface for placing trading orders.
- **Technology:** React.js with functional components and hooks.
- **Functionality:**
  - User inputs order parameters like symbol, side (buy/sell), order type (market/limit), quantity, and price.
  - Sends order requests to backend API.
  - Displays order response or error messages.
- **Port:** Runs on `http://localhost:3000`.

### 2. Backend (Flask API)
- **Purpose:** Handles order requests and communicates with Binance API.
- **Technology:** Python Flask framework.
- **Functionality:**
  - Exposes REST API endpoints (e.g., `/order`).
  - Validates input data.
  - Uses the `BasicBot` class to place orders on Binance testnet.
  - Returns order status and details in JSON.
- **Port:** Runs on `http://127.0.0.1:5000`.

### 3. Binance Testnet API
- **Purpose:** Simulated Binance environment for safe testing without risking real funds.
- **Role:** Backend connects to Binance testnet endpoints to execute orders.

### Data Flow
1. User fills order form on frontend.
2. Frontend sends HTTP POST request to backend `/order`.
3. Backend processes the request, calls Binance testnet API.
4. Backend returns order confirmation or error.
5. Frontend displays result to user.

---

### Output Screenshots
![image](https://github.com/user-attachments/assets/35a653e5-b01e-430d-b5e2-fd309d997e9a)
![image](https://github.com/user-attachments/assets/75bfc69a-c1dd-42d2-8d66-055becac5f84)
![image](https://github.com/user-attachments/assets/7eba8c32-a4fb-46ae-b716-e3fe853b650c)



## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js and npm
- Binance API keys (testnet keys)

### Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/shamira01/trading_bot.git
   cd trading_bot
