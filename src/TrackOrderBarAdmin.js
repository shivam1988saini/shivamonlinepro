import React, { useState } from 'react';
import TrackOrderBar from './TrackOrderBar';

const App = () => {
  const [orderStatus, setOrderStatus] = useState('Order Placed');

  return (
    <div style={{ padding: '20px' }}>
      <TrackOrderBar orderStatus={orderStatus} />

      {/* For testing, you can add buttons to change the order status */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setOrderStatus('Order Placed')}>Order Placed</button>
        <button onClick={() => setOrderStatus('Shipped')}>Shipped</button>
        <button onClick={() => setOrderStatus('Out for Delivery')}>Out for Delivery</button>
        <button onClick={() => setOrderStatus('Delivered')}>Delivered</button>
      </div>
    </div>
  );
};

export default App;
