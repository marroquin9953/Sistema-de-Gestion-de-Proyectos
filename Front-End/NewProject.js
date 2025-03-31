import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    gerente_id: '',
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
      await axios.post('/api/proyectos', formData);
      history.push('/listProject');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al Crear un proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Proyecto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripcion:
          <input
            type="text"
            name="descripcion"
            placeholder="Descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="fecha_inicio"
            placeholder="Fecha de Inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha de Finalizacion:
          <input
            type="date"
            name="fecha_fin"
            placeholder="Fecha de Finalizacion"
            value={formData.fecha_fin}
            onChange={handleChange}
          />
        </label>
        <label>
          Gerente:
          <input
            type="text"
            name="gerente_id"
            placeholder="ID del gerente"
            value={formData.gerente_id}
            onChange={handleChange}
          />
        </label>


          <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );


};

export default Register;