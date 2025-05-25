# Trading Bot

A simple cryptocurrency trading bot project with a React frontend and Flask backend that interacts with the Binance testnet API to place orders.

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
