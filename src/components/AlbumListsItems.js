import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { FaTrashCan } from "react-icons/fa6";
import { useRomeveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumsListsItem({ album }) {
  const [removeAlbum, results] = useRomeveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveAlbum}
      >
        <FaTrashCan />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandablePanel key={album.div} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListsItem;
