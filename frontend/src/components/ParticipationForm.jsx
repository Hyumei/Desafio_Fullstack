import { useState } from 'react';

function ParticipationForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [participation, setParticipation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !participation) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    onSubmit({
      firstName,
      lastName,
      participation: Number(participation)
    });
    
    setFirstName('');
    setLastName('');
    setParticipation('');
  };

  return (
    <form onSubmit={handleSubmit} className="participation-form">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Participation"
        value={participation}
        onChange={(e) => setParticipation(e.target.value)}
        required
      />
      <button type="submit">SEND</button>
    </form>
  );
}

export default ParticipationForm;