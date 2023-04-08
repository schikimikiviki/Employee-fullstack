import { useState } from 'react';
import equipmentToChooseFrom from './names.json';

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  if (!employee) {
    return <div>No employee data found.</div>;
  }

  console.log('OOOOOOOOOOOOOOOOOO');
  console.log(employee);

  const onSubmit = (e) => {
    e.preventDefault();
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
