import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import CreateModal from '../../../UI/CreateModal';
import Modal from '../../../UI/Modal';
import BomServices from '../../../services/bom.services';
import PartServices from '../../../services/parts.services';
import { PartsContext } from '../../../store/PartsProvider';
import { UserContext } from '../../../store/UserProvider';
import styles from '../../../style.module.css';
import DisplayAlert from '../../../utils/DisplayAlert';
import PartContainer from '../PartContainer/PartContainer';
import AddExistingPart from './AddExistingPart';
import BOM from './Bom';
import BomRightBar from './BomRightBar';
import CreateNewPart from './CreateNewPart';
import classes from './Structure.module.css';
import DeleteBomModal from './DeleteBom';
import { URL, openNewWindow } from '../../../utils/helper';
const bomServices = new BomServices();
const Structure = ({ id }) => {
  const [timer, setTimer] = useState(true);
  const [modalShown, modalIsshown] = useState(false);
  const [createModalShown, setCreateModalIsshown] = useState(false);
  const [editModalShown, setEditModalIsshown] = useState(false);
  // const partsProvider = useContext(PartsProvider);

  const { selectedData, setInitialBomData } = useContext(PartsContext);
  const { showAlert, showDeleteBomModal, setShowDeleteBomModal } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log({ selectedData, location });
  const modalAddHandler = (e) => {
    const parentId = location?.pathname?.slice(-1);
    openNewWindow(e, `${URL}/add-existing-bom-part/${parentId}`);
    setTimeout(() => {
      navigate(location?.pathname);
    }, 1000)
  };

  const modalHideHandler = () => {
    modalIsshown(false);
  };

  const createModalAddHandler = (e) => {
    const parentId = location?.pathname?.slice(-1);
    openNewWindow(e, `${URL}/add-new-bom-part/${parentId}`);
    setTimeout(() => {
      navigate(location?.pathname);
    }, 1000)
  };

  const createModalHideHandler = () => {
    setCreateModalIsshown(false);
  };

  const editModalAddHandler = () => {
    setEditModalIsshown(true);
  };

  const editModalHideHandler = () => {
    setEditModalIsshown(false);
  };

  //   const DeleteFun = async(id) => {

  //     if (choice) {
  //       console.log("choice is:",choice)
  //       const supplierInfo = await deleteSupplier(id);
  //       navigate('/part-table')
  //   };
  // }

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000);
  }, []);

  const getBomData = async (bomParentId) => {
    console.log('====================================');
    console.log({ bomParentId });
    console.log('====================================');
    const data = await bomServices.getBomById(bomParentId);
    setInitialBomData(data);
    console.log({ data });
  };
  const { getPartById } = new PartServices();

  const getPartApi = async (id) => {
    const partInfo = await getPartById(id);
    // console.log('part info data', { partInfo });
    const newParts = (partInfo?.data.parts || [])
      .map((elem) => {
        return { ...elem, createdDate: partInfo?.data?.createdDate };
      })
      .sort((a, b) => b.id - a.id)?.[0];
    console.log({ newParts });
    await getBomData(newParts?.id);
    return newParts?.id
    // setPartInformation([newPartsData || {}]);
  };

  const bomParentId = location?.pathname?.split('/')?.splice(-1)?.join();
  useEffect(() => {
    if (bomParentId) {
      getPartApi(bomParentId)
    }
  }, [bomParentId]);

  return timer ? (
    <div className={styles.spinnerContainer}>
      <HashLoader color='#0E6EFD' />{' '}
    </div>
  ) : (
    <>
      <PartContainer id={id}>
        <div className={classes.main_container}>
          <div className={classes.left_division}>
            <div className={classes.left_box}>
              <div className={classes.leftBox_content_top}>
                <p>
                  <img
                    src='/images/parts.png'
                    className={styles.icon_pointer}
                    width={35}
                    height={35}
                    alt='part'
                    onClick={(e) => modalAddHandler(e)}
                  />
                  Insert Existing Part
                </p>

                {modalShown && (
                  <Modal show={modalShown}>
                    <div className={classes.modal_container}>
                      <p>Insert Existing</p>
                      <p>
                        <CloseIcon
                          className={classes.close && styles.icon_pointer}
                          onClick={modalHideHandler}

                        />
                      </p>
                    </div>

                    {/* <AddExistingPart modalHideHandler={modalHideHandler} /> */}
                  </Modal>
                )}

                <p>
                  <img
                    src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
                    width={30}
                    height={30}
                    alt=''
                    className={styles.deleteIcon && styles.icon_pointer}
                    onClick={(e) => setShowDeleteBomModal(true)}

                  />
                  Remove Part
                </p>
              </div>
              <div className={classes.leftBox_content_bottom}>
                <p>
                  <img
                    src='/images/parts.png'
                    width={35}
                    height={35}
                    alt='part'
                    onClick={(e) => createModalAddHandler(e)}
                    className={styles.icon_pointer}

                  />
                  Create New Part
                </p>
                {createModalShown && (
                  <CreateModal show={createModalShown}>
                    <div className={classes.modal_container}>
                      <p>Create Part</p>
                      <p className={styles.icon_pointer}>
                        <CloseIcon
                          className={classes.close}
                          onClick={createModalHideHandler}
                        />

                      </p>
                    </div>

                    <CreateNewPart />
                  </CreateModal>
                )}
{/* 
                <p>
                  <img
                    src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
                    width={30}
                    height={30}
                    alt=''
                    onClick={() => {
                      editModalAddHandler();
                    }}
                    className={styles.icon_pointer}

                  />
                  Edit Part
                </p>
                {editModalShown && (
                  <EditModal show={editModalShown}>
                    <div className={classes.modal_container}>
                      <p>Edit Part</p>
                      <p>
                        <CloseIcon
                          className={classes.close && styles.icon_pointer}
                          onClick={editModalHideHandler}

                        />
                      </p>
                    </div>

                    <EditBomPart />
                  </EditModal>
                )} */}
              </div>
            </div>

            {/* Tree view start from here */}
            <div className={classes.mui_container}>
              <BOM />
            </div>
          </div>

          <div className={classes.right_division}>
            <BomRightBar />
          </div>
        </div>

        {showAlert && <DisplayAlert />}
        {showDeleteBomModal ? <DeleteBomModal/> : null}
      </PartContainer>
    </>
  );
};

export default Structure;
