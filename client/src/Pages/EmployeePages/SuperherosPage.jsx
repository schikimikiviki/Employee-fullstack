import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/EmployeeTable';
import Pagination from '../../Components/Pagination/Pagination.jsx';

const fetchEmployees = () => {
  return fetch('/api/other/superheros').then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/other/superheros/${id}`, { method: 'DELETE' }).then(
    (res) => res.json()
  );
};

const fetchBrands = () => {
  return fetch('/api/brands').then((res) => res.json());
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [brands, setBrands] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      //console.log(employees);
      setLoading(false);
      setEmployees(employees);
    });
    fetchBrands().then((brands) => {
      setBrands(brands);
    });
  }, []);

  //console.log(brands);

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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = processedEmployees.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(processedEmployees.length / recordsPerPage);

  // console.log('**********');
  // console.log(processedEmployees);

  return (
    <div>
      {employees && brands && (
        <div>
          <EmployeeTable
            employees={currentRecords}
            brands={brands}
            onDelete={handleDelete}
          />
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
