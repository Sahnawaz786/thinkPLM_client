import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import DocumentServices from '../services/document.services';
import PartServices from '../services/parts.services';
import { UserContext } from '../store/UserProvider';
import styles from '../style.module.css';
import DisplayAlert from '../utils/DisplayAlert';
import message from '../utils/message';
// import 'bootstrap/dist/css/bootstrap.min.css';

const PartTable = () => {
  const { getPart, deletePart } = new PartServices();
  const { getAllDocuments, deleteDocument } = new DocumentServices();

  const { choice, showAlert, setShowAlert } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState();
  const [deleteid, setDeleteId] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedId(id);
  };

  const navigate = useNavigate();

  const { pathname } = useLocation();

  console.log('PATHNAME', pathname);

  const handleDeleteBtn = async () => {
    try {
      if (choice && pathname === '/') {
        await deletePart(id);
        const newData = await getPart();
        console.log("datas checking.........",{newData})
        setData(newData.data);
      }
      if (choice && pathname === '/document-table') {
        await deleteDocument(deleteid);
        const newData = await getAllDocuments();
        setData2(newData.data);
      }
    } catch (error) {
      console.log({error})
      message('error', error?.response?.data);
    }
  };

  const handlePartEditBtn = async () => {
    if (pathname === '/') navigate(`/edit-part/${id}`);
    else navigate(`/supplier-document-edit/${id}`);
  };

  useEffect(() => {
    handleDeleteBtn();
  }, [choice]);

  const handleAPI = async () => {
    const response = await getPart();
    const response2 = await getAllDocuments();

    const newPartsData = response?.data.map((elem) => {
      return {
        ...elem,
        parts: [elem?.parts?.sort((a, b) => b.id - a.id)?.[0]],
      };
    });

    const newPartsData2 = response2?.data.map((elem) => {
      return {
        ...elem,
        supplier_contract: [
          elem?.supplier_contract?.sort((a, b) => b.id - a.id)?.[0],
        ],
      };
    });

    setData(newPartsData.reverse());
    setData2(newPartsData2.reverse());
    console.log('Parts', response.data);
    console.log('DATAIS', data2);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  const handlePartClick = () => {
    navigate('/');
  };

  const handlePartDetails = (id) => {
    navigate('/part-details/' + id);
  };

  console.log('DATA2', data2);

  return (
    <div>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <div title='Parts'>
            <Dropdown
              style={{
                padding: '0px',
                margin: '0px',
                cursor: 'pointer',
              }}
            >
              <Dropdown.Toggle
                style={{
                  backgroundColor: 'transparent',
                  padding: '0px',
                  margin: '0px',
                  border: 'none',
                }}
              >
                <img
                  src='/images/parts.png'
                  width={35}
                  height={35}
                  alt='part'
                  id={styles.hoverButton}
                  className={
                    styles.deleteIcon && pathname === '/'
                      ? styles.activeBtn
                      : ''
                  }
                  onClick={() => {
                    handlePartClick();
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ backgroundColor: 'white' }}>
                <Dropdown.Item
                  className={styles.hoverText}
                  onClick={() => navigate('/create-part')}
                >
                  Create Parts
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div title='Document'>
            <Dropdown
              style={{
                padding: '0px',
                margin: '0px',
                cursor: 'pointer',
              }}
            >
              <Dropdown.Toggle
                style={{
                  backgroundColor: 'transparent',
                  padding: '0px',
                  margin: '0px',
                  border: 'none',
                }}
              >
                <img
                  src='/images/document.png'
                  width={35}
                  height={35}
                  alt=''
                  className={
                    styles.deleteIcon && pathname != '/' ? styles.activeBtn : ''
                  }
                  onClick={() => {
                    navigate('/document-table');
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ backgroundColor: 'white' }}>
                <Dropdown.Item
                  className={styles.hoverText}
                  onClick={() => navigate('/supplier-documents')}
                >
                  Create Document
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div title='Folder'>
            <img
              src='https://cdn-icons-png.freepik.com/512/5994/5994710.png'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
            />
          </div>
          <div title='Delete'>
            <img
              src='https://cdn-icons-png.freepik.com/512/9740/9740598.png'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
              onClick={() => {
                setShowAlert(true);
              }}
            />
          </div>

          <div title='Edit'>
            <img
              src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
              width={30}
              height={30}
              alt=''
              className={styles.deleteIcon}
              onClick={() => {
                handlePartEditBtn();
              }}
            />
          </div>
        </div>

        <div className={styles.searchSection}>
          <FaSearch />
          <input type='text' name='' width={300} height={300} id='' />
        </div>
      </div>
      {pathname === '/' ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Supplier Name</th>
              <th>Created By</th>
              <th>Part Name</th>
              <th>Part Number</th>
              <th>state</th>
              <th>Version</th>
              <th>Iteration</th>
              <th>Created Date</th>
              <th>Modified Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((elem, index) => (
              <tr key={elem.id}>
                <td>
                  <input
                    className={styles.icon_pointer}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    onClick={() => setId(elem.id)}
                    type='checkbox'
                  />
                </td>

                <td>
                  <img
                    src='/images/supplier.png'
                    alt='part'
                    className={styles.display_supplier_icon}
                  />
                  {elem?.parts[0]?.supplier_name}
                </td>

                <td>John</td>

                <td>
                  <img
                    src='/images/parts.png'
                    alt='part'
                    className={styles.display_icon}
                  />
                  {elem?.part_name}
                </td>
                <td>{elem?.part_number}</td>

                <td className={styles.open}>
                  Open{' '}
                  
                </td>

                <td>A</td>

                <td>{elem?.parts[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.parts[0]?.modifiedDate}</td>

                <td>
                  <img
                    className={styles.icon_pointer}

                    src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                    width={20}
                    height={20}
                    onClick={() => {
                      handlePartDetails(elem.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Supplier Name</th>
              <th>Created By</th>
              <th> Name</th>
              <th> Number</th>
              <th>state</th>
              <th>Version</th>
              <th>Iteration</th>
              <th>Created Date</th>
              <th>Modified Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data2?.map((elem, index) => (
              <tr key={elem.id}>
                <td>
                  <input
                    onClick={() => {
                      setId(elem.id);
                      setDeleteId(elem.id);
                    }}
                    checked={elem.id === selectedId}
                    onChange={() => handleCheckboxChange(elem.id)}
                    type='checkbox'
                  />
                </td>

                <td>
                  <img
                    src='/images/supplier.png'
                    alt='part'
                    className={styles.display_supplier_icon}
                  />
                  {elem?.supplier_contract[0]?.supplier_name}
                </td>

                <td>John</td>

                <td>
                  <img
                    src='/images/document.png'
                    alt='part'
                    className={styles.display_icon}
                  />
                  {elem?.document_name}
                </td>
                <td>{elem?.document_number}</td>

                <td className={styles.open}>
                  Open{' '}
                 
                </td>

                <td>A</td>

                <td>{elem?.supplier_contract[0]?.iteration_info}</td>

                <td>{elem?.createdDate}</td>

                <td>{elem?.modifiedDate}</td>

                <td>
                  <img
                    src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                    width={20}
                    height={20}
                    onClick={() => {
                      navigate(
                        `/supplier-document-details/${elem.id}`
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAlert && <DisplayAlert />}
    </div>
  );
};

export default PartTable;
