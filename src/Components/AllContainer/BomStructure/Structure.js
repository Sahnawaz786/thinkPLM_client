import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styles from '../../../style.module.css';
import PartContainer from '../PartContainer';

const Structure = ({ id }) => {

  const [timer, setTimer] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 1000)
  })

  return (
    timer ? <div className={styles.spinnerContainer}>
      {' '}
      <HashLoader color='#0E6EFD' />{' '}
    </div> :
      <>
        <PartContainer id={id}>

          <div style={{backgroundColor:'whitesmoke'}}>
            <h1>Bom Structure</h1>
          </div>

        </PartContainer>
      </>
  )
}

export default Structure;