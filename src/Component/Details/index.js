import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  setIsEdit,
  setSeletedUserId,
} from "../../Redux/formReducer";
const FormDetails = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.form);
  const handleUpdate = (user) => {
    dispatch(setIsEdit(true));
    dispatch(setSeletedUserId(user));
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?.id}>
              <td>{user?.name}</td>
              <td>{user?.age}</td>
              <td>{user?.dob}</td>
              <td>{user?.phone}</td>
              <td>{user.addresses.join(", ")}</td>
              <td>
                <button onClick={() => handleUpdate(user.id)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDetails;
