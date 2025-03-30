import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/login', formData);
      localStorage.setItem('token', response.data.token);
      history.push('/profile'); // Redirige a la página de perfil
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    history.push('/register'); // Redirige a la página de registro
  };

  const handleForgotPasswordRedirect = () => {
    history.push('/forgot-password'); // Redirige a la página de recuperar contraseña
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Iniciar sesión</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
      <div style={styles.footer}>
        <button onClick={handleRegisterRedirect} style={styles.linkButton}>
          ¿No tienes una cuenta? Regístrate aquí
        </button>
        <button onClick={handleForgotPasswordRedirect} style={styles.linkButton}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
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
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '15px',
  },
};

export default Login;