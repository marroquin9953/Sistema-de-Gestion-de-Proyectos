import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/forgot-password', { correo });
      setMessage('Te hemos enviado un código de verificación a tu correo.');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al recuperar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Recuperar Contraseña</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {message && <p style={styles.successMessage}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            required
            style={styles.input}
          />
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Enviando...' : 'Recuperar'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
  },
};

export default ForgotPassword;