import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const categoryContext = createContext({
  category: [],
  supplierDocument: [],
  getApi: [],
  manufactureData: [],
  vendorData: [],
  tier1Data: [],
  tier2Data: [],
  partCategories: [],
  bomCategories: [],
  purchaseCategories: [],
  inventoryCategories: [],
  partDatas: [],
  id: [],
  getPartFunc: () => {},
  getSupplierFunc: () => {},
  getSupplierManufacturerFunc: () => {},
  getSupplierVendorFunc: () => {},
  getSupplierTier1Func: () => {},
  getSupplierTier2Func: () => {},
});
export const categories = [
  {
    value: "manufacturer",
  },
  {
    value: "vendor",
  },
  {
    value: "tier1",
  },
  {
    value: "tier2",
  },
];

export const documents = [
  {
    value: "supplier contract",
  },
  {
    value: "invoice",
  },
  {
    value: "certificate of insurance",
  },
  {
    value: "compliance certificate",
  },
];

export const partCategories = [
  {
    value: "standard parts",
  },
  {
    value: "custom parts",
  },
];

export const bomCategories = [
  {
    value: "standard supplier bom",
  },
  {
    value: "custom supplier bom",
  },
];

export const purchaseCategories = [
  {
    value: "standard purchase order",
  },
  {
    value: "blanket purchase order",
  },
  {
    value: "contract purchase order",
  },
  {
    value: "scheduled purchase order",
  },
];

export const inventoryCategories = [
  {
    value: "raw material inventory",
  },
  {
    value: "work in progress inventory",
  },
  {
    value: "finished goods inventory",
  },
  {
    value: "safety stock inventory",
  },
  {
    value: "cycle count inventory",
  },
  {
    value: "consignment inventory",
  },
  {
    value: "obsolete inventory",
  },
];

const CategoryProvider = (props) => {
  const [category, setCategory] = useState(categories);
  const [document, setDocument] = useState(documents);
  const [data, setData] = useState([]);
  const [manufacture, setManufacture] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [tier1, setTier1] = useState([]);
  const [tier2, setTier2] = useState([]);
  const [partCategory, setPartCategory] = useState(partCategories);
  const [bomCategory, setBomCategory] = useState(bomCategories);
  const [purchaseCategory, setPurchaseCategory] = useState(purchaseCategories);
  const [inventoryCategory, setInventoryCategory] =
    useState(inventoryCategories);
  const [partData, setPartData] = useState([]);
  const [headersId, setHeadersId] = useState([]);
  const { id } = useParams();

  // "http://localhost:8181/getsuppliers"
  //https://kkh-mech-default-rtdb.firebaseio.com/manufacturer.json
//   const Api = `http://localhost:8181/getsuppliers`;

  // All data
  const getResult = async () => {
    try {
      const res = await fetch('http://localhost:8181/getsuppliers');
      const mydata = await res.json();
      setData(mydata);
      console.log({mydata});

      //  first solution

    //   const abc = Object.values(mydata);
    //   console.log(abc);

      // let arr=[];
      // for (const category in mydata) {
      //     console.log(`Category: ${category}`);
      //     for (const itemId in mydata[category]) {
      //         const item = mydata[category][itemId];
      //         console.log(item)
      //         arr.push(item);
      //     }
      //     console.log(arr)
      // }
      // setData(arr);

      // second solution
      //   let arr=[];
      //   for(let elem in mydata){
      //    arr.push(mydata[elem])
      //    console.log(mydata[elem])
      //   }
      //  setData(arr)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResult();
  }, []);

  console.log(data);

  // Manufacturer data

  const getResultManufacturer = async () => {
    // `http://localhost:8181/suppliers1/${"manufacturer"}`
    //https://kkh-mech-default-rtdb.firebaseio.com/manufacturer.json
    try {
      const res = await fetch(
        `http://localhost:8181/suppliers1/${"manufacturer"}`
      );
      const mydata = await res.json();
      console.log(mydata);

      // first solution

      const abc = Object.values(mydata);
      setManufacture(abc);
      console.log(abc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResultManufacturer();
  }, []);

  //Vendor Data

  const getResultVendor = async () => {
    // `http://localhost:8181/suppliers1/${"vendor"}`
    try {
      const res = await fetch(`http://localhost:8181/suppliers1/${"vendor"}`);
      const mydata = await res.json();
      console.log(mydata);

      // first solution

      const abc = Object.values(mydata);
      setVendor(abc);
      console.log(abc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResultVendor();
  }, []);

  //Tier1 data

  const getResultTier1 = async () => {
    // `http://localhost:8181/suppliers1/${"tier1"}`
    try {
      const res = await fetch(`http://localhost:8181/suppliers1/${"tier1"}`);
      const mydata = await res.json();
      console.log(mydata);

      // first solution

      const abc = Object.values(mydata);
      setTier1(abc);
      console.log(abc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResultTier1();
  }, []);

  //Tier2 data

  const getResultTier2 = async () => {
    // `http://localhost:8181/suppliers1/${"tier2"}`
    try {
      const res = await fetch(`http://localhost:8181/suppliers1/${"tier2"}`);
      const mydata = await res.json();
      console.log(mydata);

      // first solution

      const abc = Object.values(mydata);
      setTier2(abc);
      console.log(abc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getResultTier2();
  }, []);

  // part data

  const getPartApi = async () => {
    //http://localhost:8181/SupplierMasterObject
    try {
      const res = await fetch(`http://localhost:8181/SupplierMasterObject`);
      const mypartData = await res.json();
      console.log({ mypartData });

      // Get the ID from the headers
      // const headers = res.headers;
      // console.log(headers)
      // const id = headers.get("Location");
      // console.log(id)

    //   const abc = Object.values(mypartData);
      setPartData(mypartData);

    //   id !== null ? setHeadersId(id) : setHeadersId([]);

      // setHeadersId(id)
      // console.log(abc)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPartApi();
  }, []);

  const categoryItems = {
    category: category,
    supplierDocument: document,
    getApi: data,
    partCategories: partCategory,
    bomCategories: bomCategory,
    manufactureData: manufacture,
    vendorData: vendor,
    tier1Data: tier1,
    tier2Data: tier2,
    purchaseCategories: purchaseCategory,
    inventoryCategories: inventoryCategory,
    partDatas: partData,
    id: headersId,
    getPartFunc: getPartApi,
    getSupplierFunc: getResult,
    getSupplierManufacturerFunc: getResultManufacturer,
    getSupplierVendorFunc: getResultVendor,
    getSupplierTier1Func: getResultTier1,
    getSupplierTier2Func: getResultTier2,
  };

  return (
    <>
      <categoryContext.Provider value={categoryItems}>
        {props.children}
      </categoryContext.Provider>
    </>
  );
};

export default CategoryProvider;
