import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryContext } from '../../../store/CategoryProvider';
import classes from '../Supplier/Form.module.css';
// import {message} from "antd";          


const StandardParts = () => {

  const categoryItemsCtx=useContext(categoryContext);

  const [selected, setSelected]=useState('');

  const [currentDate, setCurrentDate] = useState(new Date().toJSON().slice(0, 10));

  const navigate=useNavigate();
  const [userData,setUserData]=useState({

    part_number: "",
    part_name: "",
    description: "",
    createdDate: currentDate,
    modifiedDate:currentDate,
    parts: [
      {
      supplier_category:"",
      supplier_name: "",
      material: "",
      mpn_number: "",
      weight: "",
      dimension: "",
      cost: "",
      lead_date: "",
      quality_matrices: "",
      compliance_information: "",
      createdDate: currentDate,
      modifiedDate:currentDate,
      iteration_info:1,
      islatest_Iteration:1
    }
  ]

  });

  const handleChange=(e)=>{

    console.log(e.target.value)
    setSelected(e.target.value)

  }
  
    let name,value;

    const postUser=(event)=>{
       
       name=event.target.name;
       value=event.target.value;
       setUserData({...userData,[name]:value});

    }

    const postUserData=(event,index)=>{
    
      const { name, value } = event.target;
      setUserData((prevData) => {
        const updatedParts = [...prevData.parts];
        updatedParts[index] = { ...updatedParts[index], [name]: value };
        return { ...prevData, parts: updatedParts };
      });
          
    }


    const submitHandler = async(event)=>{
      
      event.preventDefault();
      const {
        part_number,
        part_name,
        description,
        createdDate,
        modifiedDate,
        parts: [{ supplier_category, supplier_name, material, mpn_number, weight, dimension, cost, lead_date, quality_matrices, compliance_information,iteration_info,islatest_Iteration}],
      } = userData;
    try{
    
      // `http://localhost:8181/SupplierMasterObject`

     const res= await fetch(`http://localhost:8181/SupplierMasterObject`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
          part_number,
          part_name,
          description,
          createdDate,
          modifiedDate,
          parts: [
            {
              supplier_category,
              supplier_name,
              material,
              mpn_number,
              weight,
              dimension,
              cost,
              lead_date,
              quality_matrices,
              compliance_information,
              createdDate,
              modifiedDate,
              iteration_info,
              islatest_Iteration
            },
          ],
        })
     });
     if(res.ok){
        setUserData({ 
          part_number: "",
          part_name: "",
          description: "",
          createdDate: "",
          modifiedDate: "",
          parts: [{
            supplier_category: "",
            supplier_name: "",
            material: "",
            mpn_number: "",
            weight: "",
            dimension: "",
            cost: "",
            lead_date: "",
            quality_matrices: "",
            compliance_information: "",

          }]
    });
      
     navigate('/part-table');
    }
   
  }
    catch(error){
       console.log(error)
    }
    }
      return (
        <>
       <div className={classes.container_align}>
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
              <h3>Standard Parts</h3>
              <div className={classes.content}>

              <div className={classes.input}>
                <label htmlFor='text'>Part Number*</label>
                <input type='text'  name="part_number"  value={userData.part_number} onChange={postUser} />
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Part Name*</label>
                <input type='text'  name="part_name"  value={userData.part_name} onChange={postUser} />
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Description*</label>
                <input type='text' name="description" value={userData.description} onChange={postUser} />
              </div>

             { userData.parts.map((part,index)=>{
             return(<>
                   <div className={classes.input} >
                    <label>Supplier Category*</label>
                         <select className={classes.input_select}
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
                    <select className={classes.input_select}
                    name="supplier_name" value={part.supplier_name} onChange={(event) => postUserData(event, index)}>

                      <option>Select Supplier Name</option>
                     
                      {selected==="manufacturer" ? categoryItemsCtx.manufactureData.map((item,ind)=>{
                          return (
                          <option key={ind}>{item.name}</option>)
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
                <label htmlFor='text'>Material*</label>
                <input type='text' name="material" value={part.material} onChange={(event) => postUserData(event, index)}/>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>MPN Number*</label>
                <input type='text' name="mpn_number" value={part.mpn_number} onChange={(event) => postUserData(event, index)}/>
              </div>

              <div className={classes.input}>
                <label htmlFor='text'>Weight*</label>
                <input type='text' name="weight" value={part.weight} onChange={(event) => postUserData(event, index)}/>
              </div>

              <div className={classes.input}>
                    <label htmlFor='text'>Dimensions*</label>
                    <input type='text' name="dimension" value={part.dimension} onChange={(event) => postUserData(event, index)}/>
                  </div>

                  <div className={classes.input}>
                    <label htmlFor='text'>Cost*</label>
                    <input type='text' name="cost" value={part.cost} onChange={(event) => postUserData(event, index)}/>
                  </div>

                  <div className={classes.input}>
                    <label htmlFor='text'>Lead date*</label>
                    <input type='date' name="lead_date" value={part.lead_date} onChange={(event) => postUserData(event, index)}/>
                  </div>
                  <div className={classes.input}>
                    <label htmlFor='text'>Quality_matrices*</label>
                    <input type='text' name="quality_matrices" value={part.quality_matrices} onChange={(event) => postUserData(event, index)}/>
                  </div>
                  <div className={classes.input}>
                    <label htmlFor='text'>Compliance Information*</label>
                    <input type='text' name="compliance_information" value={part.compliance_information} onChange={(event) => postUserData(event, index)}/>
                  </div>
           </> ) 
})
        }
              
            </div>
            <div className={classes.button_container}>
            <button >
              Submit the details
            </button>
            </div>
      </form>
      </div>   
    </div>
    </>
    
      )
    }
    
export default StandardParts;