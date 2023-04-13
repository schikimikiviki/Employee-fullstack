import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import BrandTable from '../Components/BrandsTable/BrandTable';

const fetchBrands = () => {
  return fetch('/api/brands').then((res) => res.json());
};

const deleteBrand = (id) => {
  return fetch(`/api/brands/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const BrandList = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState(null);

  const handleDelete = (id) => {
    deleteBrand(id);

    setBrands((brands) => {
      return brands.filter((brand) => brand._id !== id);
    });
  };

  useEffect(() => {
    fetchBrands().then((brands) => {
      setLoading(false);
      setBrands(brands);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <BrandTable brands={brands} onDelete={handleDelete} />
    </div>
  );
};

export default BrandList;
