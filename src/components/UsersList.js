import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThank } from "../hooks/use-thunk";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThank(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThank(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) {
    return (
      <div>
        <Skeleton times={10} className="h-10 w-full" />
      </div>
    );
  }
  if (loadingUsersError) {
    return <div>Error fectching data...</div>;
  }

  const renderdUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating User..."
        ) : (
          <Button onClick={handleUserAdd} primary>
            + Add User
          </Button>
        )}
        {creatingUserError && "Error creating user...."}
      </div>
      {renderdUsers}
    </div>
  );
}
export default UsersList;
