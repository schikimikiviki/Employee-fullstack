const CreateNewBrandForm = ({ onSave, disabled, onCancel }) => {
  const onSubmit = (e) => {
    console.log('XXX');
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    console.log(entries);

    const brand = entries.reduce((accumulator, entry) => {
      const [key, value] = entry;
      accumulator[key] = value;
      return accumulator;
    }, {});

    return onSave(brand);
  };

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      <div className='control'>
        <h1>New brand</h1>
        <label htmlFor='name'>Name:</label>
        <input name='name' id='name' />
      </div>

      <div className='control'>
        <label htmlFor='description'>Description:</label>
        <input name='description' id='description' />
      </div>

      <div className='control'>
        <label htmlFor='foundedIn'>Founded In:</label>
        <input name='foundedIn' id='foundedIn' />
      </div>
      <div className='control'>
        <label htmlFor='logo'>Logo link:</label>
        <input name='logo' id='logo' />
      </div>

      <div className='buttons'>
        <button type='submit'>Create brand</button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateNewBrandForm;
