const BrandForm = ({ onSave, disabled, brand, onCancel }) => {
  if (!brand) {
    return <div>No brand data found.</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const brand = entries.reduce((accumulator, entry) => {
      const [key, value] = entry;
      accumulator[key] = value;
      return accumulator;
    }, {});

    return onSave(brand);
  };

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      {brand && <input type='hidden' name='_id' defaultValue={brand._id} />}

      <div className='control'>
        <label htmlFor='name'>Name:</label>
        <input defaultValue={brand ? brand.name : null} name='name' id='name' />
      </div>

      <div className='control'>
        <label htmlFor='description'>Description:</label>
        <input
          defaultValue={brand ? brand.description : null}
          name='description'
          id='description'
        />
      </div>

      <div className='control'>
        <label htmlFor='foundedIn'>Founded in:</label>
        <input
          defaultValue={brand ? brand.foundedIn : null}
          name='foundedIn'
          id='foundedIn'
        />
      </div>
      <div className='control'>
        <label htmlFor='logo'>Logo link:</label>
        <input defaultValue={brand ? brand.logo : null} name='logo' id='logo' />
      </div>

      <div className='buttons'>
        <button type='submit' disabled={disabled}>
          {brand ? 'Update Brand' : 'Create Brand'}
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BrandForm;
