const EquipmentForm = ({ onSave, disabled, initialequipment, onCancel }) => {
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
      {initialequipment && (
        <input type='hidden' name='_id' defaultValue={initialequipment._id} />
      )}

      <div className='control'>
        <h1>New equipment</h1>
        <label htmlFor='name'>Name:</label>
        <input
          defaultValue={initialequipment ? initialequipment.name : null}
          name='name'
          id='name'
        />
      </div>

      <div className='control'>
        <label htmlFor='type'>Type:</label>
        <input
          defaultValue={initialequipment ? initialequipment.type : null}
          name='type'
          id='type'
        />
      </div>

      <div className='control'>
        <label htmlFor='place'>Place:</label>
        <input
          defaultValue={initialequipment ? initialequipment.place : null}
          name='place'
          id='place'
        />
      </div>

      <div className='buttons'>
        <button type='submit' disabled={disabled}>
          {initialequipment ? 'Update Equipment' : 'Create Equipment'}
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
