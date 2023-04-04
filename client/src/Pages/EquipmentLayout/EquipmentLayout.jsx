import { Outlet } from 'react-router-dom';

function EquipmentLayout() {
  return (
    <div>
      <h1>Equipment Management</h1>
      <Outlet />
    </div>
  );
}

export default EquipmentLayout;
