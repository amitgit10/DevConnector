import React from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../slices/profileSlice";
const DeleteAccount = () => {
  const dispatch = useDispatch();
  return (
    <div className="my-2">
      <button
        onClick={() => dispatch(deleteAccount())}
        className="btn btn-danger">
        <i className="fas fa-user-minus"></i> Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
