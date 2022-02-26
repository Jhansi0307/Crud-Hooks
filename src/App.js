import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "Jan", username: "Jan@123" },
    { id: 2, name: "San", username: "San@0307" },
    { id: 3, name: "Ram", username: "Ram@00703" }
  ];

  // users
  const [users, setUsers] = useState(usersData);


  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialFormState);


  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };


  const updateUser = (id, updateUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD Operations</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-small">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};

export default App;
