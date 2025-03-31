import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [projectos, setProject ] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProject  = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/proyectos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject (response.data);
      } catch (error) {
        console.error('Error al obtener el listado', error);
      }
    };
    fetchProject ();
  }, []);

  if (!projectos) return <p style={styles.loading}>Cargando...</p>;

  return (
    <div style={styles.container}>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de finalizacion</th>
                    <th>Gerente</th>
                </tr>
            </thead>
            <tbody>
                {projectos.map(projecto =>(
                    <tr key={projecto.id}>
                        <th>{projecto.id}</th>
                        <th>{projecto.Nombre}</th>
                        <th>{projecto.descripcion}</th>
                        <th>{projecto.fecha_inicio}</th>
                        <th>{projecto.fecha_fin}</th>
                        <th>{projecto.gerente_id}</th>
                    </tr>
                ))}
            </tbody>
        </table>
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