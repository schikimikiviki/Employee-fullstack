import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onDelete }) => {
  //console.log(employees);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [employeeData, setEmployeeData] = useState(employees);
  const [searchedLevel, setSearchedLevel] = useState('');
  const [searchedPosition, setSearchedPosition] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortingDirection, setSortingDirection] = useState('');
  // const [checked, setChecked] = useState(
  //   new Array(employeeData.length).fill(false)
  // );

  let positions = [
    ...new Set(employeeData.map((employee) => employee.position)),
  ];

  let levels = [...new Set(employeeData.map((employee) => employee.level))];

  const handleLevelChange = (e) => {
    e.preventDefault();
    setSelectedLevel(e.target.value);
  };

  const handlePositionChange = (e) => {
    e.preventDefault();
    setSelectedPosition(e.target.value);
  };

  useEffect(() => {
    setEmployeeData(
      employees.filter(
        (employee) =>
          (selectedLevel === '' || employee.level === selectedLevel) &&
          (selectedPosition === '' || employee.position === selectedPosition) &&
          employee.level.toLowerCase().includes(searchedLevel.toLowerCase()) &&
          employee.position
            .toLowerCase()
            .includes(searchedPosition.toLowerCase())
      )
    );
  }, [
    selectedLevel,
    selectedPosition,
    employees,
    searchedLevel,
    searchedPosition,
  ]);

  const resetFilters = () => {
    setSelectedLevel('');
    setSelectedPosition('');
  };

  const handleLevelSearch = (e) => {
    let inputValue = e.target.value;
    setSearchedLevel(inputValue);
    console.log(inputValue);
  };

  const handlePositionSearch = (e) => {
    let inputValue = e.target.value;
    setSearchedPosition(inputValue);
    console.log(inputValue);
  };

  const handleSort = (field) => {
    if (sortingDirection.length === 0 || sortingDirection === 'DESC') {
      //console.log('Sorting in ascending order');
      let sortedData = employeeData.sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
      setEmployeeData(sortedData);
      setSortingDirection('ASC');
    } else {
      //console.log('Sorting in descending order');
      let sortedData = employeeData.sort((a, b) => {
        return b[field].localeCompare(a[field]);
      });
      setEmployeeData(sortedData);
      setSortingDirection('DESC');
    }

    setSortedField(field);
  };

  useEffect(() => {
    if (sortedField) {
      let sortedData = employeeData.sort();
      setEmployeeData(sortedData);
    }
  }, [sortedField, employeeData]);

  const handleSortReset = () => {
    setEmployeeData(employees);
  };

  console.log(employeeData);

  const handleCheckChange = (id) => {
    const index = employeeData.findIndex((employee) => employee._id === id);
    const newEmployeeData = [...employeeData];
    newEmployeeData[index].checked = !newEmployeeData[index].checked;
    setEmployeeData(newEmployeeData);
    console.log(employeeData);

    fetch(`/api/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checked: employeeData[index].checked,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update employee data');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='EmployeeTable'>
      <select value={selectedPosition} onChange={handlePositionChange}>
        <option key='none' value='' disabled>
          Filter by position
        </option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
      <select value={selectedLevel} onChange={handleLevelChange}>
        <option key='none' value='' disabled>
          Filter by level
        </option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <input
        value={searchedLevel}
        type='text'
        onChange={handleLevelSearch}
        placeholder='Search for levels'
      ></input>
      <input
        type='text'
        value={searchedPosition}
        onChange={handlePositionSearch}
        placeholder='Search for positions'
      ></input>
      <button className='reset-button' onClick={resetFilters}>
        Reset filters
      </button>

      <br />
      <br />
      <table>
        <thead key='header'>
          <tr key='head'>
            <th>
              <button type='button' onClick={() => handleSort('firstName')}>
                First Name
              </button>
            </th>
            <th>
              <button type='button' onClick={() => handleSort('middleName')}>
                Middle Name
              </button>
            </th>
            <th>
              <button type='button' onClick={() => handleSort('lastName')}>
                Last Name
              </button>
            </th>
            <th>
              <button type='button' onClick={() => handleSort('level')}>
                Level
              </button>
            </th>
            <th>
              <button type='button' onClick={() => handleSort('position')}>
                Position
              </button>
            </th>
            <th>
              <button onClick={handleSortReset}>Reset sorting</button>
            </th>
            <th>
              <button>Equipment</button>
            </th>
            <th className='missing-button'>
              <button>Present</button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody key='body'>
          {employeeData.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`update/${employee._id}`}>
                  <button type='button'>Update</button>
                </Link>
                <button type='button' onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
              <td>{employee.equipment}</td>
              <td className='checkbox'>
                <input
                  type='checkbox'
                  key={employee._id}
                  checked={employee.checked}
                  onChange={() => handleCheckChange(employee._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
