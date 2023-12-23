import { FaTrashCan } from "react-icons/fa6";

import Button from "./Button";
import { removeUser } from "../store";
import { useThank } from "../hooks/use-thunk";

function UsersListItems({ user }) {
  const [doRemoveUser, isLoading, error] = useThank(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row justify-between">
          <Button
            className="mr-3"
            isLoading={isLoading}
            onClick={handleClick}
            loading={isLoading}
          >
            <FaTrashCan />
          </Button>
          {error && <div>Error deleting user.</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}
export default UsersListItems;
