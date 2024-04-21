import React,{useState,useEffect} from 'react';
import SyncLoader from 'react-spinners/ClipLoader';

const SpinnerLoading = () => {

   useEffect(() => {
    const timeout = setTimeout(() => {
    }, 500)
    return (() => clearTimeout(timeout));

  }, [])

  return (
    <SyncLoader color="#000" />
  )
}

export default SpinnerLoading