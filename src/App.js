// App.js

import React, { useState } from 'react';
import Popup from './Popup';
import './App.css'; // Assuming you have a CSS file for styling

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <h1>Save Segment</h1>
      <button className="saveButton" onClick={togglePopup}>Save Segment</button>
      {showPopup && <Popup />}
    </div>
  );
}

export default App;
