import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PartServices from '../services/parts.services';
import { UserContext } from '../store/UserProvider';
import styles from '../style.module.css';
import DisplayAlert from '../utils/DisplayAlert';

const PartTable = () => {
  const { getPart, deletePart } = new PartServices();

  const { choice, showAlert, setShowAlert } = useContext(UserContext);

  const [data, setData] = useState([]);

  const [id, setId] = useState();

  const navigate = useNavigate();

  const handleDeleteBtn = async()=>{
    if (choice) {
      await deletePart(id);
      const newData = await getPart();
      setData(newData.data);
    }
  }

  const handlePartEditBtn = async ()=>{
       navigate(`/edit-part/${id}`)
  }

  useEffect(() => {
   handleDeleteBtn();
  }, [choice]);

  const handleAPI = async () => {
    const response = await getPart();

    const newPartsData = response?.data.map(elem => {
      return { ...elem, parts: [elem?.parts?.sort((a, b) => b.id - a.id)?.[0]] }
    })
    setData(newPartsData);
    console.log('Parts', response.data);
  };


  useEffect(() => {
    handleAPI();
  }, []);

  const handlePartClick = () => {
    navigate('/create-part');
  };

  const handlePartDetails=(id)=>{
    navigate('/part-details/'+id)
  }

  return (
    <div>
      <div className={styles.rightBar}>
        <div className={styles.rightBarLogo}>
          <img
            src='https://cdn-icons-png.freepik.com/512/10703/10703269.png'
            width={30}
            height={30}
            alt='part'
            onClick={() => {
              handlePartClick();
            }}
          />
          <img
            src='https://cdn-icons-png.freepik.com/512/7959/7959420.png'
            width={30}
            height={30}
            alt=''
            onClick={()=>{
              navigate('/supplier-documents')
            }}
          />
          <img
            src='https://cdn-icons-png.freepik.com/512/5994/5994710.png'
            width={30}
            height={30}
            alt=''
          />
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
          <img
            src='https://cdn-icons-png.freepik.com/512/3425/3425921.png'
            width={30}
            height={30}
            alt=''
            onClick={() => {
              handlePartEditBtn();
            }}
          />
        </div>
        <div className={styles.searchSection}>
          <FaSearch />
          <input type='text' name='' width={300} height={300} id='' />
        </div>
      </div>
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
                <input onClick={() => setId(elem.id)} type='checkbox' />
              </td>

              


              <td>{elem?.parts[0]?.supplier_name}</td>


              <td>John</td>

              <td>{elem?.part_name}</td>
              <td>{elem?.part_number}</td>


              <td className={styles.open}>
                Open{' '}
                <img
                  src='https://cdn-icons-png.freepik.com/256/665/665049.png?semt=ais_hybrid'
                  width={20}
                  height={20}
                />
              </td>

              <td>A</td>

              <td>{elem?.parts[0]?.iteration_info}</td>


              <td>{elem?.createdDate}</td>




              <td>{elem?.parts[0]?.modifiedDate}</td>


              
              <td>
                <img
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
      {showAlert && <DisplayAlert />}
    </div>
  );
};

export default PartTable;
