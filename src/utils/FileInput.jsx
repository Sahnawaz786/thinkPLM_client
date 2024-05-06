import React, { useEffect, useState } from 'react';
import styles from '../style.module.css'

const FileInput = ({fileName,setFileName}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("FILE",{file})
    setSelectedFile(file?.name);
    setFileName(event,fileName);
  };

  useEffect(()=>{
    setSelectedFile(fileName?.fileName || null) 
  },[fileName?.fileName])

console.log('FILENAME',fileName?.fileName);

  return (
    <div>
      {/* Hidden file input */}
      <label
        htmlFor={fileName?.fileName}
        className="custom-file-label"
      >
      <input
        type="file"
        id={fileName?.fileName}
        style={{display:'none'}}
        onChange={handleFileChange}
      />
      {/* Custom label for file input */}
      
        
      <span className={styles.FileInput} > choose file </span>   {selectedFile ? selectedFile : 'Choose a file'}
      </label>
    </div>
  );
};

export default FileInput;