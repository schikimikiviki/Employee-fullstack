import { Outlet } from 'react-router-dom';
import './BrandLayout.css';

function BrandLayout() {
  return (
    <div className='wholepage'>
      <h1>Brand Management</h1>
      <Outlet />
    </div>
  );
}

export default BrandLayout;
