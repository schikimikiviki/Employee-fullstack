import { Outlet } from 'react-router-dom';
import './EmployeeLayout.css';

function EmployeeLayout() {
  return (
    <div className='wholepage'>
      <h1>Employee Management</h1>
      <Outlet />
    </div>
  );
}

export default EmployeeLayout;
