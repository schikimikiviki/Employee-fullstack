import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import EmployeeTable from '../Components/EmployeeTable';

const fetchEmployees = () => {
  return fetch('/api/employees').then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      console.log(employees);
      setLoading(false);
      setEmployees(employees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const processedEmployees = employees.map(({ name, position, level, _id }) => {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const middleName =
      nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
    return { name, firstName, middleName, lastName, position, level, _id };
  });

  return (
    <EmployeeTable employees={processedEmployees} onDelete={handleDelete} />
  );
};

export default EmployeeList;
