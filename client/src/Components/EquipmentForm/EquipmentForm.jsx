const EquipmentForm = ({ onSave, disabled, equipment, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const equipment = entries.reduce((acc, entry) => {
      //accumulator
      const [k, v] = entry; //Key, value
      acc[k] = v;
      return acc;
    }, {});

    return onSave(equipment);
  };

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      {equipment && (
        <input type='hidden' name='_id' defaultValue={equipment._id} />
      )}

      <div className='control'>
        <label htmlFor='name'>Name:</label>
        <input
          defaultValue={equipment ? equipment.name : null}
          name='name'
          id='name'
        />
      </div>

      <div className='control'>
        <label htmlFor='type'>Type:</label>
        <input
          defaultValue={equipment ? equipment.type : null}
          name='type'
          id='type'
        />
      </div>

      <div className='control'>
        <label htmlFor='place'>Place:</label>
        <input
          defaultValue={equipment ? equipment.place : null}
          name='place'
          id='place'
        />
      </div>

      <div className='buttons'>
        <button type='submit' disabled={disabled}>
          {equipment ? 'Update Equipment' : 'Create Equipment'}
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
