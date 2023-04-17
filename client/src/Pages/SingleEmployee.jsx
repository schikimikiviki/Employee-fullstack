import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import EmployeeTable from '../Components/EmployeeTable';
import { useParams } from 'react-router-dom';
import './SingleEmployee.css';

const fetchEmployees = (userInput) => {
  return fetch(`/api/other/search/${userInput}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const fetchBrands = async () => {
  return await fetch('/api/brands').then((res) => res.json());
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);

  const { query } = useParams();
  //console.log(query);

  const [employees, setEmployees] = useState(null);
  const [brands, setBrands] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(query).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
    fetchBrands().then((brands) => {
      setBrands(brands);
    });
  }, [query]);

  if (loading) {
    return <Loading />;
  }

  const processedEmployees = employees.map(
    ({ name, position, level, _id, checked, equipment, brand }) => {
      const nameParts = name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      const middleName =
        nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';

      return {
        name,
        firstName,
        middleName,
        lastName,
        position,
        level,
        _id,
        checked,
        brand,
        equipment: [equipment],
      };
    }
  );

  processedEmployees.forEach((employee) => {
    if (employee.checked === undefined) {
      employee.checked = false;
    }
  });

  //console.log(brands);
  //console.log(employees);

  return (
    <div>
      {employees.length < 1 ? (
        <div className='no-result'>
          <h1>Sorry, no employee found! :c</h1>
        </div>
      ) : (
        employees &&
        brands && (
          <div>
            <EmployeeTable
              employees={processedEmployees}
              brands={brands}
              onDelete={handleDelete}
            />
          </div>
        )
      )}
      {/* conditional rendering to make it appear only when both are fetched */}
    </div>
  );
};

export default EmployeeList;
