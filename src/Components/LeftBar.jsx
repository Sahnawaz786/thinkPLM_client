import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style.module.css';
import SupplierServices from '../services/supplier.services';

const LeftBar = () => {
  const navigate = useNavigate();

  const {getSupplier} = new SupplierServices();

  const [data, setData] = useState([]);

  const [display, setDisplay] = useState(true);

  const handlToggle = (control) => {
    setDisplay(control);
  };

  const handleNavToggle = (elem) => {
    setData((data) =>
      data.map((item) =>
        item === elem ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleAPI = async () => {
    const data = await getSupplier();
    const newData = data.data.map((elem) => ({ ...elem, isVisible: false }));
    setData(newData);
    console.log('suppliers', data);
};

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div className={styles.leftbar}>
      {display ? (
        <>
          <div
            className={styles.mainLeftbarContainer}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className={styles.logoText}>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYXelNvTYzqH7ndMP0MZlMWQPiQJRhPFft33kyoiCGg&s'
                alt='logo'
                className={styles.imageIcon}
              />
              <span>SUPPLIER</span>
            </div>

            <span onClick={() => handlToggle(false)}>
              <ImCross />
            </span>
          </div>

          <div className={styles.leftbarParent}>
            <div className={styles.logoText} style={{ marginBottom: '10px' }}>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYXelNvTYzqH7ndMP0MZlMWQPiQJRhPFft33kyoiCGg&s'
                alt='logo'
                className={styles.imageIcon}
              />
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={'/create-supplier'}
              >
                Create Supplier ➕
              </Link>
            </div>

            {data.map((elem, index) => {
              return (
                <div  key={index}>
                  <div className={styles.leftbarChild}>
                    <div className={styles.logoText}>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYXelNvTYzqH7ndMP0MZlMWQPiQJRhPFft33kyoiCGg&s'
                        alt='logo'
                        className={styles.imageIcon}
                      />

                      <span onClick={() => handleNavToggle(elem)}>
                        {elem.name}
                      </span>
                    </div>
                    {elem.isVisible ? (
                      <div className={styles.leftbarOptions}>
                        <Link to={`/part-details/${elem.id}`}>Details</Link>
                        <Link to={'/onboard-status'}>Onboarding status</Link>
                        <Link to='/contract-details'>View Contract details</Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <span onClick={() => handlToggle(true)}>
          <FaArrowRight />
        </span>
      )}
    </div>
  );
};

export default LeftBar;
