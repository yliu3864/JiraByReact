import React from "react";

export default function List({ list, users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        {list.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name ||
                "Unknown"}
            </td>
            {/* <td>{users.name}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
