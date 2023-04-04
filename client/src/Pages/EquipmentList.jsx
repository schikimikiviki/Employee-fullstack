import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
// import EmployeeTable from '../Components/EmployeeTable';
import EquipmentTable from '../Components/EquipmentTable';

const fetchEquipment = () => {
  return fetch('api/equipment').then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipment().then((equipments) => {
      setLoading(false);
      setEquipments(equipments);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  //   const processedEmployees = equipments.map(({ name, position, level }) => {
  //     const nameParts = name.split(' ');
  //     const firstName = nameParts[0];
  //     const lastName = nameParts[nameParts.length - 1];
  //     const middleName =
  //       nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
  //     return { name, firstName, middleName, lastName, position, level };
  //   });

  return <EquipmentTable equipments={equipments} onDelete={handleDelete} />;
};

export default EquipmentList;
