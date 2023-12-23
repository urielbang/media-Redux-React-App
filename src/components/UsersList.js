import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThank } from "../hooks/use-thunk";
import UsersListItems from "./UsersListItems";

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

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={10} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fectching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItems user={user} key={user.id} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd} primary>
          + Add User
        </Button>

        {creatingUserError && "Error creating user...."}
      </div>
      {content}
    </div>
  );
}
export default UsersList;
