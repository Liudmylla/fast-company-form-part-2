import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/pages/user-list-page";
import UserPage from "../components/pages/user-page";
import EditUserPage from "../components/pages/user-edit-page/edit-user-page";
import UsersProvider from "../hooks/use-users";

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersProvider>
    </>
  );
};

export default Users;
