import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './BrandTable.css';

const BrandTable = ({ brands, onDelete }) => {
  const [brandData, setBrandData] = useState(brands);
  const [sortedField, setSortedField] = useState(null);
  const [sortingDirection, setSortingDirection] = useState('');

  const handleSort = (field) => {
    if (sortingDirection.length === 0 || sortingDirection === 'DESC') {
      //console.log('Sorting in ascending order');
      let sortedData = brandData.sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
      setBrandData(sortedData);
      setSortingDirection('ASC');
    } else {
      //console.log('Sorting in descending order');
      let sortedData = brandData.sort((a, b) => {
        return b[field].localeCompare(a[field]);
      });
      setBrandData(sortedData);
      setSortingDirection('DESC');
    }

    setSortedField(field);
  };

  useEffect(() => {
    if (sortedField) {
      let sortedData = brandData.sort();
      setBrandData(sortedData);
    }
  }, [sortedField, brandData]);

  return (
    <div className='EmployeeTable'>
      <br />
      <br />
      <table>
        <thead key='header'>
          <tr key='head'>
            <th style={{ width: '150px' }}>
              <button type='button' onClick={() => handleSort('name')}>
                Brand name
              </button>
            </th>
            <th style={{ width: '750px' }}>
              <button type='button' onClick={() => handleSort('description')}>
                Description
              </button>
            </th>
            <th style={{ width: '150px' }}>
              <button type='button' onClick={() => handleSort('foundedIn')}>
                Founded in
              </button>
            </th>
            <th style={{ width: '50px' }}>
              <button type='button'>Logo</button>
            </th>
          </tr>
        </thead>
        <tbody key='body'>
          {brandData.map((brand) => {
            return (
              <tr key={brand._id}>
                <td>{brand.name}</td>
                <td>{brand.description}</td>
                <td>{brand.foundedIn}</td>
                <td>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    width='100px'
                    height='50px'
                  />
                </td>

                <td>
                  <Link to={`update/${brand._id}`}>
                    <button type='button'>Update</button>
                  </Link>
                  <button type='button' onClick={() => onDelete(brand._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BrandTable;
