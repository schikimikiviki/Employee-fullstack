import { useState } from 'react';
import equipmentToChooseFrom from './names.json';

const CreateNewEmployeeForm = ({
  onSave,
  disabled,
  employee = {},
  brands,
  onCancel,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    console.log(entries);

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

    // console.log(e.target.value);
    // console.log(typeof e.target.value);
  };

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      <div className='control'>
        <h1>New employee</h1>
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
          Create Employee
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateNewEmployeeForm;
