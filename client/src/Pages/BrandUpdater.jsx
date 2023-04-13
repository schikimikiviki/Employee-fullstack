import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BrandForm from '../Components/BrandForm';
import Loading from '../Components/Loading';

const updateBrand = (brand) => {
  return fetch(`/api/brands/${brand._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(brand),
  }).then((res) => res.json());
};

const fetchBrand = (id) => {
  return fetch(`/api/brands/${id}`).then((res) => res.json());
};

const BrandUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    Promise.all([fetchBrand(id)]).then(([brand]) => {
      setBrand(brand);
      setEmployeeLoading(false);
    });
  }, [id]);

  const handleUpdateBrand = (brand) => {
    setUpdateLoading(true);
    updateBrand(brand).then(() => {
      setUpdateLoading(false);
      navigate('/');
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <BrandForm
      brand={brand}
      onSave={handleUpdateBrand}
      disabled={updateLoading}
      onCancel={() => navigate('/')}
    />
  );
};

export default BrandUpdater;
