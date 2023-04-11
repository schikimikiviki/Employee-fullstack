import { Outlet } from 'react-router-dom';
import './EquipmentLayout.css';

function EquipmentLayout() {
  return (
    <div className='wholepage'>
      <h1>Equipment Management</h1>
      <Outlet />
    </div>
  );
}

export default EquipmentLayout;
