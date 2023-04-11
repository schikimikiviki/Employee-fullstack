import { Outlet } from 'react-router-dom';
import './MissingLayout.css';

function MissingLayout() {
  return (
    <div className='wholepage'>
      <Outlet />
    </div>
  );
}

export default MissingLayout;
