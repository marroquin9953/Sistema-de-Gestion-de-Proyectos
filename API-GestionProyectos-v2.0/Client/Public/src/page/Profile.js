import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [user, setUser ] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

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
        setError('Error al obtener el perfil. Por favor, intenta de nuevo más tarde.');
        console.error('Error al obtener el perfil', error);
      }
    };
    fetchUser ();
  }, []);

  const handleEditProfile = () => {
    history.push('/edit-profile'); // Redirige a la página de editar perfil
  };

  if (!user) return <p style={styles.loading}>Cargando...</p>;

  return (
    <div style={styles.container}>
      <button onClick={handleEditProfile} style={styles.editButton}>
        Editar Perfil
      </button>
      <h2 style={styles.header}>Perfil del Usuario</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <p><strong>Nombre:</strong> {user.nombres} {user.apellidos}</p>
      <p><strong>Correo:</strong> {user.correo}</p>
      <p><strong>Teléfono:</strong> {user.telefono}</p>
      <p><strong>Rol:</strong> {user.rol_id}</p>
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
  editButton: {
    float: 'right',
    padding: '10px',
    marginBottom: '20px',
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
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    fontStyle: 'italic',
  },
};

export default Profile;