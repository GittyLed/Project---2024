import { useState, useEffect } from 'react';
const Fetch = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5217/api/user/1')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);
  return (
    <div>
      {users.firstName + users.email}
    </div>
  );
};
export default Fetch;