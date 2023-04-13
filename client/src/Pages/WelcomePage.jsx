import { Link } from 'react-router-dom';
import './WelcomePage.css';

const Welcome = () => {
  return (
    <div className='wholepage'>
      <h1>Welcome to Employee MADNESS</h1>
      <div className='link-container'>
        <div className='single-container'>
          <Link to='/employees'>
            <button>Go to Employees</button>
          </Link>
          <div className='sublinks'>
            <Link to='XXX'>Add new employee</Link>
          </div>
          <div className='sublinks'>
            <Link to='/missing'>Who's skipping work?</Link>
          </div>
          <div className='sublinks'>
            <Link to='XXX'>Superhero employees</Link>
          </div>
          <div className='sublinks'>
            <Link to='XXX'>Search for a employee</Link>
          </div>
        </div>
        <div>
          <Link to='/equipment'>
            <button>Go to equipment</button>
          </Link>
          <div className='sublinks'>
            <Link to='XXX'>Add new equipment</Link>
          </div>
        </div>
        <div>
          <Link to='/brands'>
            <button>Go to brands</button>
          </Link>
          <div className='sublinks'>
            <Link to='XXX'>Add new brand</Link>
          </div>
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
