import { Outlet, Link } from 'react-router-dom';

import './Layout.css';

const Layout = () => (
  <div className='Layout'>
    <nav>
      <ul>
        <li className='grow'>
          <Link to='/'>
            <img
              alt='Logo'
              width='100px'
              height='100px'
              src='https://cdn-icons-png.flaticon.com/512/3090/3090108.png'
            />
          </Link>
        </li>
        <li>
          <Link to='/create'>
            <button type='button'>Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to='/create-equipment'>
            <button type='button'>Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
