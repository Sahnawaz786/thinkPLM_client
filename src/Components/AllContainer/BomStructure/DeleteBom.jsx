import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../../store/UserProvider';
import { PartsContext } from '../../../store/PartsProvider';
import message from '../../../utils/message';
import BomServices from '../../../services/bom.services';
const { deleteBomPart } = new BomServices();
function DeleteBomModal() {
  const { bomIds } = useContext(PartsContext);

  const { handleCloseDeleteBomModal: handleClose, showDeleteBomModal: show } =
    useContext(UserContext);

  const handleDelete = async () => {
    try {
      const { childId, parentId } = bomIds || {};
      console.log({childId, parentId})
      if (!(childId && parentId)) {
        if(!childId || !parentId){
            message('error', 'Deletion of the parent item is not allowed');
            handleClose();
            return;
        }
        message('error', 'Please Select the BOM to delete');
        handleClose();
        return;
      }

      const payload = {
        ida3a5: parentId, // ====> partsId   (parent)   302
        ida3b5: childId, //  ====> partsMasterId (child)  152
      };
      await deleteBomPart(payload);
      message('success', 'BOM deleted');
      window.location.reload();
    } catch (error) {
        message('error', 'Failed To Delete');
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Delete Selected Bom</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wanted to delete the selected BOM ?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBomModal;
