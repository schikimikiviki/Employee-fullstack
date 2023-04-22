import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNewBrandForm from '../../Components/CreateNewBrandForm/CreateNewBrandForm';

const createBrand = (brand) => {
  return fetch('/api/brands', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(brand),
  }).then((res) => res.json());
};

const BrandCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateBrand = (brand) => {
    setLoading(true);

    createBrand(brand).then(() => {
      setLoading(false);
      navigate('/');
    });
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <CreateNewBrandForm
      onCancel={() => navigate('/')}
      disabled={loading}
      onSave={handleCreateBrand}
    />
  );
};

export default BrandCreator;
