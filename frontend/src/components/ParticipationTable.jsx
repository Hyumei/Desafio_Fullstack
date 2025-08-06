function ParticipationTable({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>First name</th>
            <th>Last name</th>
            <th>Participation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.participation}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipationTable;