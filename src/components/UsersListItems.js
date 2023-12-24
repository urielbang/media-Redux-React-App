import { FaTrashCan } from "react-icons/fa6";
import AlbumsList from "./AlbumsList";
import Button from "./Button";
import { removeUser } from "../store";
import { useThank } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";

function UsersListItems({ user }) {
  const [doRemoveUser, isLoading, error] = useThank(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      {" "}
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <FaTrashCan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}
export default UsersListItems;
