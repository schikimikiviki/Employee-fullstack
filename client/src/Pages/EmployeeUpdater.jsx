import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../Components/EmployeeForm';
import Loading from '../Components/Loading';

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch(`/api/brands`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [brands, setBrands] = useState(null);

  // useEffect(() => {
  //   setEmployeeLoading(true);
  //   fetchEmployee(id).then((employee) => {
  //     setEmployee(employee);
  //     setEmployeeLoading(false);
  //   });
  //   fetchBrands().then((brand) => setBrands(brand));
  // }, [id]);

  useEffect(() => {
    setEmployeeLoading(true);
    Promise.all([fetchEmployee(id), fetchBrands()]).then(
      ([employee, brands]) => {
        setEmployee(employee);
        setBrands(brands);
        setEmployeeLoading(false);
      }
    );
  }, [id]);

  console.log('----------------');
  console.log(employee);
  console.log('----------------');

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee).then(() => {
      setUpdateLoading(false);
      navigate('/');
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      brands={brands}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate('/')}
    />
  );
};

export default EmployeeUpdater;
