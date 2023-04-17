import { Link } from 'react-router-dom';
import './WelcomePage.css';
import { useState } from 'react';

const Welcome = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/search?query=${query}`;
  };

  return (
    <div className='wholepage'>
      <h1>Welcome to Employee MADNESS</h1>
      <div className='link-container'>
        <div className='single-container'>
          <Link to='/employees'>
            <button>Go to Employees</button>
          </Link>

          <div className='sublinks'>
            <Link to='/missing'>Who's skipping work?</Link>
          </div>
          <div className='sublinks'>
            <Link to='/superheros'>Superhero employees</Link>
          </div>
          <div className='sublinks'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                id='search'
                value={query}
                onChange={handleInputChange}
              />
              <br />
              <Link to={`/search/${query}`}>
                <button type='submit'>Search</button>
              </Link>
            </form>
          </div>
        </div>
        <div>
          <Link to='/equipment'>
            <button>Go to equipment</button>
          </Link>
        </div>
        <div>
          <Link to='/brands'>
            <button>Go to brands</button>
          </Link>
        </div>
        <div>
          <Link to='/statistics'>
            <button>Check out statistics</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
