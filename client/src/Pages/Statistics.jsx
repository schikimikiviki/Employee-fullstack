import { useEffect, useState } from 'react';

const fetchStats = () => {
  return fetch('/api/other/statistics').then((res) => res.json());
};

const StatisticsList = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then((stats) => {
      setStats(stats);
      console.log(stats);
    });
  }, []);

  return (
    <div>
      <h2>Total number of employees: {stats && stats.total}</h2>
      <h2>Total number of Junior employees: {stats && stats.byLevel.Junior}</h2>
      <h2>Total number of Medior employees: {stats && stats.byLevel.Medior}</h2>
      <h2>Total number of Senior employees: {stats && stats.byLevel.Senior}</h2>
      <h2>Total number of Expert employees: {stats && stats.byLevel.Expert}</h2>
      <h2>
        Total number of Godlike employees: {stats && stats.byLevel.Godlike}
      </h2>
    </div>
  );
};

export default StatisticsList;
