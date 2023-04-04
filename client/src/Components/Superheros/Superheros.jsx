const Superheros = ({ employees }) => {
  return (
    <div>
      <h1>Superhero Employees</h1>
      <ul>
        {employees.map((person) => {
          return <li>person</li>;
        })}
      </ul>
    </div>
  );
};

export default Superheros;
