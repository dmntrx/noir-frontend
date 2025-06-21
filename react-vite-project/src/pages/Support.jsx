import { useState } from "react";
import API from '../api';

export default function Support() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/support/', { message });
      setSuccess(true);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>SUPPORT</h1>
      <form onSubmit={handleSubmit}>
        <textarea style={{ width: '40rem', height: '10rem' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Describe your problem or idea"
        />
        <button type="submit" style={{ display: 'block' }}>
          Send
        </button>
      </form>
      {success && <p className="text-green-600 mt-4">Request sent successfully.</p>}
    </div>
  );
}
