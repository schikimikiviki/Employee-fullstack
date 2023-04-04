import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import EmployeeTable from '../Components/EmployeeTable';

const fetchEmployees = (search) => {
  return fetch(`/employees/${search}`, { method: 'GET' }).then((res) =>
    res.json()
  );
};

const deleteEmployee = (id) => {
  return fetch(`api/employees/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const { search } = useParams();

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(search).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  const processedEmployees = employees.map(({ name, position, level }) => {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const middleName =
      nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
    return { name, firstName, middleName, lastName, position, level };
  });

  return (
    <EmployeeTable employees={processedEmployees} onDelete={handleDelete} />
  );
};

export default EmployeeList;
