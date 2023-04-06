import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './EquipmentTable.css';

const EquipmentTable = ({ equipments, onDelete }) => {
  //console.log(equipments);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [equipmentData, setEquipmentData] = useState(equipments);
  const [searchedType, setSearchedType] = useState('');
  const [searchedPlace, setSearchedPlace] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortingDirection, setSortingDirection] = useState('');

  let places = [...new Set(equipmentData.map((equipment) => equipment.place))];

  let types = [...new Set(equipmentData.map((equipment) => equipment.type))];

  const handleTypeChange = (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);
  };

  const handlePlaceChange = (e) => {
    e.preventDefault();
    setSelectedPlace(e.target.value);
  };

  useEffect(() => {
    setEquipmentData(
      equipments.filter(
        (equipment) =>
          (selectedType === '' || equipment.type === selectedType) &&
          (selectedPlace === '' || equipment.place === selectedPlace) &&
          equipment.type.toLowerCase().includes(searchedType.toLowerCase()) &&
          equipment.place.toLowerCase().includes(searchedPlace.toLowerCase())
      )
    );
  }, [selectedType, selectedPlace, equipments, searchedType, searchedPlace]);

  const resetFilters = () => {
    setSelectedType('');
    setSelectedPlace('');
  };

  const handleTypeSearch = (e) => {
    let inputValue = e.target.value;
    setSearchedType(inputValue);
    console.log(inputValue);
  };

  const handlePlaceSearch = (e) => {
    let inputValue = e.target.value;
    setSearchedPlace(inputValue);
    console.log(inputValue);
  };

  const handleSort = (field) => {
    if (sortingDirection.length === 0 || sortingDirection === 'DESC') {
      //console.log('Sorting in ascending order');
      let sortedData = equipmentData.sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
      setEquipmentData(sortedData);
      setSortingDirection('ASC');
    } else {
      //console.log('Sorting in descending order');
      let sortedData = equipmentData.sort((a, b) => {
        return b[field].localeCompare(a[field]);
      });
      setEquipmentData(sortedData);
      setSortingDirection('DESC');
    }

    setSortedField(field);
  };

  useEffect(() => {
    if (sortedField) {
      let sortedData = equipmentData.sort();
      setEquipmentData(sortedData);
    }
  }, [sortedField, equipmentData]);

  const handleSortReset = () => {
    setEquipmentData(equipments);
  };

  return (
    <div className='EquipmentTable'>
      <select value={selectedPlace} onChange={handlePlaceChange}>
        <option key='none' value='' disabled>
          Filter by place
        </option>
        {places.map((place) => (
          <option key={place} value={place}>
            {place}
          </option>
        ))}
      </select>
      <select value={selectedType} onChange={handleTypeChange}>
        <option key='none' value='' disabled>
          Filter by type
        </option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        value={searchedType}
        type='text'
        onChange={handleTypeSearch}
        placeholder='Search for types'
      ></input>
      <input
        type='text'
        value={searchedPlace}
        onChange={handlePlaceSearch}
        placeholder='Search for places'
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
              <button type='button' onClick={() => handleSort('name')}>
                Name
              </button>
            </th>

            <th>
              <button type='button' onClick={() => handleSort('type')}>
                Type
              </button>
            </th>
            <th>
              <button type='button' onClick={() => handleSort('place')}>
                Place
              </button>
            </th>
            <th>
              <button onClick={handleSortReset}>Reset sorting</button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody key='body'>
          {equipmentData.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.place}</td>
              <td>
                <Link to={`update/${equipment._id}`}>
                  <button type='button'>Update</button>
                </Link>
                <button type='button' onClick={() => onDelete(equipment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
