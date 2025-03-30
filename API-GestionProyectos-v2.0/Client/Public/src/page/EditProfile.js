import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser ] = useState({
    telefono: '',
    carrera_profesional: '',
    pais: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser  = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser (response.data);
      } catch (error) {
        console.error('Error al obtener el perfil', error);
      }
    };
    fetchUser ();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser ((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Editar Perfil</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={user.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            style={styles.input}
          />
        </label>
        <label>
          Carrera Profesional:
          <input
            type="text"
            name="carrera_profesional"
            value={user.carrera_profesional}
            onChange={handleChange}
            placeholder="Carrera Profesional"
            style={styles.input}
          />
        </label>
        <label>
          País:
          <input
            type="text"
            name="pais"
            value={user.pais}
            onChange={handleChange}
            placeholder="País"
            style={styles.input}
          />
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
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
};

export default EditProfile;