import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ButtonGroup({ onEdit, onDelete }) {
  return (
    <>
      <div class="inline-flex gap-5 rounded-md shadow-xs">
        <button type="button" onClick={onEdit}>
          <FaRegEdit
            size={24}
            className="cursor-pointer text-sky-500 active:scale-85"
          />
        </button>
        <button type="button" onClick={onDelete}>
          <MdDelete
            size={24}
            className="cursor-pointer text-rose-500 active:scale-85"
          />
        </button>
      </div>
    </>
  );
}
