import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryContext } from "../../store/CategoryProvider";
import CustomParts from "../Form/Parts/CustomParts";
import StandardParts from "../Form/Parts/StandardParts";
import classes from "./SupplierPage.module.css";

const PartManagementPage = () => {
  const navigate = useNavigate();
  const categoryItemsCtx = useContext(categoryContext);
  console.log(categoryItemsCtx);

  useEffect(() => {
    const updateUser = () => {
      categoryItemsCtx.getSupplierManufacturerFunc();
      categoryItemsCtx.getSupplierVendorFunc();
      categoryItemsCtx.getSupplierTier1Func();
      categoryItemsCtx.getSupplierTier2Func();
    };

    updateUser();
  }, []);

  const [selected, setSelected] = useState("standard parts");
  const handleChange = (e) => {
    if (e.detail === 0) {
      setSelected(e.target.value);
      // const name = e.target.value;
      // console.log({name})
      // switch (name) {
      //   case 'standard parts':
      //     openNewWindow(e, `${URL}/standard-parts`);
      //     setTimeout(() => {
      //       navigate('/');
      //     }, 1000)
      //     break;

      //   case 'custom parts':
      //     openNewWindow(e, `${URL}/custom-parts`);
      //     setTimeout(() => {
      //       navigate('/');
      //     }, 1000)
      //     break;
      //   default:
      //     break;
      // }
    }
  };
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    setTimer(true);
    const timeout = setTimeout(() => {
      setTimer(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [selected]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <div>
            <h3 className={classes.supplierHeading}>Create Part</h3>
          </div>

          <div className={classes.labelContainer}>
          <span className={classes.supplier_label  && classes.type }>TYPE : </span>
            <div className={classes.supplier_label}>
              <select
                style={{
                  width: "12rem",
                  borderRadius: "3px",
                  borderStyle: "none",
                  background: "rgba(183, 184, 192, 0.955)",
                  outline: "none",
                  padding: "3px 4px 4px 3px",
                  fontSize: '9px',
                  cursor: "pointer",
                }}
                onClick={(e) => handleChange(e)}
              >
                {/* <option>Create part</option> */}
                {categoryItemsCtx.partCategories.map((item, ind) => {
                  return <option key={ind}>{item.value}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className={classes.supplierContainer}>
          <div className={classes.components}>
            <>
              {selected === "standard parts" ? <StandardParts /> : ""}
              {selected === "custom parts" ? <CustomParts /> : ""}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartManagementPage;
