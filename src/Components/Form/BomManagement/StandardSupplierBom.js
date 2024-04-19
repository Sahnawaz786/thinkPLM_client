import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryContext } from '../../store/CategoryProvider';
import classes from '../Form.module.css';

// import {message} from "antd";          


const StandardSupplierBom = () => {

  const categoryItemsCtx=useContext(categoryContext);

  const navigate=useNavigate();

  const [selected, setSelected]=useState('');

  const [userData,setUserData]=useState([{
    
    part_number:"",
    part_name:"",
    description:"",
    supplier_category:"",
    supplier_name:"",
    quantity:"",
    unit_of_measure:"",
    reference_designator:"",
    mpn_number:"",
    material:"",
    cost:"",
    lead_date:"",
   
  }]);

  const handleChange=(e)=>{

    console.log(e.target.value)
    setSelected(e.target.value)

  }
  
    let name,value;

    const postUserData=(event)=>{
      
       name=event.target.name;
       value=event.target.value;
       setUserData({...userData,[name]:value});
          
    }

    const submitHandler = async(event)=>{
      
      let supplier;
      event.preventDefault();
      const {part_number,part_name,description,supplier_category,supplier_name,quantity,
      unit_of_measure,reference_designator,mpn_number,material,cost,lead_date,}=userData;
      
    try{
     // `http://localhost:8181/addSupplier_BOM`
     const res= await fetch(`http://localhost:8181/addSupplier_BOM`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({

            part_number,part_name,description,supplier_category,supplier_name,quantity,
      unit_of_measure,reference_designator,mpn_number,material,cost,lead_date,
        
        })
     });
     if(res.ok){
        setUserData({ 
            part_number:"",
            part_name:"",
            description:"",
            supplier_category:"",
            supplier_name:"",
            quantity:"",
            unit_of_measure:"",
            reference_designator:"",
            mpn_number:"",
            material:"",
            cost:"",
            lead_date:"",
    });
      
     navigate('/submitted');
    }
    
  }
    catch(error){
       console.log(error)
    }
    }


      return (
        <>
       
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
              <h3>Standard Supplier Bom</h3>
              <div className={classes.content}>

              <div className={classes.input}>
                <label htmlFor='text'>Part Number*</label>
                <input type='number'  name="part_number"  value={userData.part_number} onChange={postUserData} />
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Part Name*</label>
                <input type='text'  name="part_name"  value={userData.part_name} onChange={postUserData} />
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Description*</label>
                <input type='text' name="description" value={userData.description} onChange={postUserData} />
              </div>
              <div className={classes.input}>
              <label>Supplier Category*</label>
                    <select style={{margin:"5px", height:"30px", width:"17.8rem",borderRadius:"5px",borderStyle:"none",fontSize:"11px"}}
                    name="supplier_category" value={selected} onChange={(e)=>handleChange(e)}>
                      <option>Select Supplier Category</option>
                      {categoryItemsCtx.category.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.value}</option>)
                      })}
                        
                    </select>
              </div>
        
              <div className={classes.input}>
              <label>Supplier Name*</label>
                    <select style={{margin:"5px", height:"30px", width:"17.8rem",borderRadius:"5px",borderStyle:"none",fontSize:"11px"}}
                    name="supplier_name" value={userData.supplier_name} onChange={postUserData}>
                      <option>Select Supplier Name</option>
                     
                      {selected==="manufacturer" ? categoryItemsCtx.manufactureData.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.name}({item.category})</option>)
                      }):""}

                      {selected==="vendor" ? categoryItemsCtx.vendorData.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.name}</option>)
                      }):""}
                      {selected==="tier1" ? categoryItemsCtx.tier1Data.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.name}</option>)
                      }):""}
                      {selected==="tier2" ? categoryItemsCtx.tier2Data.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.name}</option>)
                      }):""}
                        
                    </select>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Quantity*</label>
                <input type='text' name="quantity" value={userData.quantity} onChange={postUserData}/>
              </div>

              <div className={classes.input}>
              <label>Unit of Measure*</label>
                    <select style={{margin:"5px", height:"30px", width:"17.8rem",borderRadius:"5px",borderStyle:"none",fontSize:"11px"}}
                    name="unit_of_measure" value={userData.unit_of_measure} onChange={postUserData}>
                      <option>select here*</option>
                      <option >gram</option>
                      <option >kg</option>
                    </select>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Reference Designator*</label>
                <input type='text' name="reference_designator" value={userData.reference_designator} onChange={postUserData}/>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>MPN Number*</label>
                <input type='number' name="mpn_number" value={userData.mpn_number} onChange={postUserData}/>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Material*</label>
                <input type='text' name="material" value={userData.material} onChange={postUserData}/>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Cost*</label>
                <input type='text' name="cost" value={userData.cost} onChange={postUserData}/>
              </div>
 
              <div className={classes.input}>
                <label htmlFor='text'>Lead Date*</label>
                <input type='date' name="lead_date" value={userData.lead_date} onChange={postUserData}/>
              </div>
                    
            </div>
            <div className={classes.button_container}>
            <button >
              Submit the details
            </button>
            </div>
      </form>
      </div>
           
    </>
      )
    }
    
export default StandardSupplierBom;