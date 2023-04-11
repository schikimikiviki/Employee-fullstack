import { useState } from 'react';
import equipmentToChooseFrom from './names.json';

const EmployeeForm = ({ onSave, disabled, employee, brands, onCancel }) => {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  console.log(brands);

  if (!employee) {
    return <div>No employee data found.</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((accumulator, entry) => {
      const [key, value] = entry;
      accumulator[key] = value;
      return accumulator;
    }, {});

    return onSave(employee);
  };

  const handleEquipmentChange = (e) => {
    setSelectedEquipment(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);

    console.log(e.target.value);
    console.log(typeof e.target.value);
  };

  const favoriteBrand = brands.find((brand) => brand._id === employee.brand);

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      {employee && (
        <input type='hidden' name='_id' defaultValue={employee._id} />
      )}

      <div className='control'>
        <label htmlFor='name'>Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name='name'
          id='name'
        />
      </div>

      <div className='control'>
        <label htmlFor='level'>Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name='level'
          id='level'
        />
      </div>

      <div className='control'>
        <label htmlFor='position'>Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name='position'
          id='position'
        />
      </div>
      <div className='control'>
        <h2>Equipment: </h2>
        {employee.equipment.length > 0 ? (
          <div>{employee.equipment}</div>
        ) : (
          <div>Currently, this employee has no equipment!</div>
        )}

        <h3>Add new equipment</h3>

        <select
          value={selectedEquipment}
          onChange={handleEquipmentChange}
          name='equipment'
          id='equipment'
        >
          <option key='none' value='' disabled>
            Choose a new equipment
          </option>
          {equipmentToChooseFrom.map((equip) => (
            <option key={equip} value={equip}>
              {equip}
            </option>
          ))}
        </select>
      </div>
      <div className='control'>
        <h2>Favorite Brand: </h2>
        <div>{favoriteBrand ? favoriteBrand.name : ''}</div>

        <h3>Choose new brand</h3>

        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          name='brand'
          id='brand'
        >
          <option key='none' value='' disabled>
            Choose a new brand
          </option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className='buttons'>
        <button type='submit' disabled={disabled}>
          {employee ? 'Update Employee' : 'Create Employee'}
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
