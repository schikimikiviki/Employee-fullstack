import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Employee MADNESS</h1>

      <Link to='/employees'>
        <button>Go to Employees</button>
      </Link>
      <Link to='/statistics'>
        <button>Check out statistics</button>
      </Link>
      <Link to='/equipment'>
        <button>Go to equipment</button>
      </Link>
    </div>
  );
};

export default Welcome;
