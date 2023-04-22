import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNewEmployeeForm from '../../Components/CreateNewEmployeeForm/CreateNewEmployeeForm';

const createEmployee = (employee) => {
  return fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch('/api/brands').then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee).then(() => {
      setLoading(false);
      navigate('/');
    });
  };

  useEffect(() => {
    setLoading(true);

    fetchBrands().then((brands) => {
      setBrands(brands);
      setLoading(false);
    });
  }, []);

  //console.log(brands);

  return (
    <CreateNewEmployeeForm
      onCancel={() => navigate('/')}
      disabled={loading}
      brands={brands}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
