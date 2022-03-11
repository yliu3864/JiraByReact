import React from "react";

export default function SearchPanel() {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("").then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
        <select
          value={param.personId}
          onChange={evt =>
            setParam({
              ...param,
              personId: evt.target.value
            })
          }
        >
          <option value="">Owner</option>
          {users.map(user => (
            <option value={user.id}>{users.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
}
