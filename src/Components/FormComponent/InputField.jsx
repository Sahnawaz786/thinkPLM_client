import React, { useState } from 'react';
import styles from '../Form/Parts/PartAttribut.module.css';

const InputField = ({ formFields, onFormChange }) => {
  const [formData, setFormData] = useState({
    part_number: '',
    part_name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form >
      {formFields.map((field, index) => (
        <div key={index} className={styles.formInput}>
          <strong htmlFor={field.name}>{field.label}</strong>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData.part_name || ''}
            onChange={(e)=>handleChange(e)}
            className={styles.partName}
          />
        </div>
      ))}
    </form>
  );
};

export default InputField;
