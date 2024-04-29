import * as React from "react";
import TreeViewComponent from "./TreeViewComponent";

const obj = {
  topLevelParentId: 552,
  partBomDetailsList: [
    {
      data: {
        id: 552,
        parentId: 0,
        childId: [],
        part_number: "Prathmesh NEW",
        part_name: "PartName_DEMO",
        description: "description",
        createdDate: null,
        supplier_category: null,
        supplier_name: null,
        material: null,
        mpn_number: null,
        weight: null,
        dimension: null,
        cost: "cost",
        lead_date: null,
        quality_matrices: null,
        compliance_information: null,
        modifiedDate: null,
        iteration_info: 1,
      },
      replies: [1, 2],
    },
    {
      data: {
        id: 602,
        parentId: 552,
        childId: [],
        part_number: "Prathmesh NEW Child",
        part_name: "PartName_DEMO Child",
        description: "description",
        createdDate: null,
        supplier_category: null,
        supplier_name: null,
        material: null,
        mpn_number: null,
        weight: null,
        dimension: null,
        cost: "cost",
        lead_date: null,
        quality_matrices: null,
        compliance_information: null,
        modifiedDate: null,
        iteration_info: 1,
      },
      replies: [3],
    },
    {
      data: {
        id: 603,
        parentId: 552,
        childId: [],
        part_number: "Prathmesh NEW 2",
        part_name: "PartName_DEMO 2",
        description: "description",
        createdDate: null,
        supplier_category: null,
        supplier_name: null,
        material: null,
        mpn_number: null,
        weight: null,
        dimension: null,
        cost: "cost",
        lead_date: null,
        quality_matrices: null,
        compliance_information: null,
        modifiedDate: null,
        iteration_info: 1,
      },
      replies: [],
    },
    {
      data: {
        id: 603,
        parentId: 602,
        childId: [],
        part_number: "Prathmesh NEW 2",
        part_name: "PartName_DEMO 2",
        description: "description",
        createdDate: null,
        supplier_category: null,
        supplier_name: null,
        material: null,
        mpn_number: null,
        weight: null,
        dimension: null,
        cost: "cost",
        lead_date: null,
        quality_matrices: null,
        compliance_information: null,
        modifiedDate: null,
        iteration_info: 1,
      },
      replies: [],
    },
  ],
};
export default function BOM() {
  const topLevelParentId = 552;
  const partDetailsList = obj.partBomDetailsList;
  return (
    <TreeViewComponent
      topLevelParentId={topLevelParentId}
      partDetailsList={partDetailsList}
    />
  );
}