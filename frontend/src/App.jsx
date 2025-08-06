import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import ParticipationForm from './components/ParticipationForm';
import ParticipationTable from './components/ParticipationTable';
import ParticipationChart from './components/ParticipationChart';

const API_URL = 'http://localhost:5000/api/participants';

function App() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setParticipants(response.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError('Could not load participant data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddParticipant = async (participant) => {
    try {
      setError('');
      await axios.post(API_URL, participant);
      fetchData();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <ParticipationForm onSubmit={handleAddParticipant} />
      </header>
      
      <main className="app-main">
        <div className="title-section">
          <h1>DATA</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="data-display-section">
          <ParticipationTable data={participants} />
          <ParticipationChart data={participants} />
        </div>
      </main>
    </div>
  );
}

export default App;
