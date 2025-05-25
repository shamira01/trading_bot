import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'MARKET',
    quantity: '',
    price: '',
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear previous messages when user edits form
    setResponse(null);
    setError(null);
  };

  // Validate inputs before submitting
  const validateInputs = () => {
    if (!formData.symbol.trim()) {
      setError('Symbol is required.');
      return false;
    }
    if (Number(formData.quantity) <= 0 || isNaN(Number(formData.quantity))) {
      setError('Quantity must be a positive number.');
      return false;
    }
    if (formData.type === 'LIMIT') {
      if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
        setError('Price must be a positive number for LIMIT orders.');
        return false;
      }
    }
    return true;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    // Prepare payload
    const payload = {
      symbol: formData.symbol.trim().toUpperCase(),
      side: formData.side,
      type: formData.type,
      quantity: parseFloat(formData.quantity),
    };
    if (formData.type === 'LIMIT') {
      payload.price = parseFloat(formData.price);
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to place order');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f7fa;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          color: #333;
        }
        .container {
          background: white;
          max-width: 420px;
          margin: 40px 20px;
          padding: 30px 25px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #0077ff;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          color: #555;
        }
        input, select {
          margin-top: 5px;
          padding: 10px 12px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1.8px solid #ccc;
          transition: border-color 0.3s ease;
        }
        input:focus, select:focus {
          border-color: #0077ff;
          outline: none;
        }
        button {
          margin-top: 15px;
          background-color: #0077ff;
          color: white;
          padding: 12px 0;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:disabled {
          background-color: #a0c4ff;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #005fcc;
        }
        .error {
          margin-top: 15px;
          color: #ff4d4f;
          font-weight: 600;
          text-align: center;
        }
        .response {
          margin-top: 20px;
          background-color: #e6f0ff;
          padding: 15px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.9rem;
          white-space: pre-wrap;
          color: #004080;
        }
        .success-message {
          margin-top: 15px;
          padding: 12px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 6px;
          font-weight: 600;
          text-align: center;
        }
      `}</style>

      <div className="container">
        <h1>Trading Bot Order Placement</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Symbol:
            <input
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              required
              placeholder="e.g. BTCUSDT"
            />
          </label>

          <label>
            Side:
            <select name="side" value={formData.side} onChange={handleChange} required>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </label>

          <label>
            Order Type:
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="MARKET">MARKET</option>
              <option value="LIMIT">LIMIT</option>
            </select>
          </label>

          <label>
            Quantity:
            <input
              name="quantity"
              type="number"
              step="any"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
            />
          </label>

          {formData.type === 'LIMIT' && (
            <label>
              Price:
              <input
                name="price"
                type="number"
                step="any"
                value={formData.price}
                onChange={handleChange}
                required={formData.type === 'LIMIT'}
                placeholder="Enter limit price"
              />
            </label>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        {error && <p className="error">Error: {error}</p>}

        {response && (
          <div className="success-message">
            Order placed successfully!<br />
            <strong>Order ID:</strong> {response.orderId}<br />
            <strong>Status:</strong> {response.status}<br />
            <strong>Symbol:</strong> {response.symbol}<br />
            <strong>Side:</strong> {response.side}<br />
            <strong>Type:</strong> {response.type}<br />
            <strong>Quantity:</strong> {response.quantity}<br />
            {response.price && <><strong>Price:</strong> {response.price}<br /></>}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
