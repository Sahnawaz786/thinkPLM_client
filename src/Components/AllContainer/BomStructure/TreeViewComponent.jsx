import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
// Recursive component to render tree nodes
const renderTreeNodes = (nodes) => {
  return nodes.map((node) => {
    console.log({ node });
    return (
      <TreeItem
        key={node?.uniqueId + uuidv4()}
        nodeId={node?.uniqueId + uuidv4()}
        label={node?.part_name}
        onClick={() => console.log({ id: node.id })}
        itemId={node?.uniqueId + uuidv4()}
      >
        {node?.children?.length > 0 && renderTreeNodes(node?.children)}
      </TreeItem>
    );
  });
};

// Function to build tree structure
function buildTree(data, parentId) {
  // Find the parent object in the data array
  const parent = data.find((item) => item.data.id === parentId);

  if (!parent) {
    return null; // Return null if parent is not found
  }
  let treeNode = {
    id: parent.data.id,
    uniqueId: uuidv4(),
    part_number: parent.data.part_number,
    part_name: parent.data.part_name,
    description: parent.data.description,
    cost: parent.data.cost,
    children: [],
  };

  parent.replies.forEach((childIndex) => {
    const childData = data[childIndex];
    if (childData) {
      const childNode = buildTree(data, childData.data.id);
      if (childNode) {
        treeNode.children.push(childNode);
      }
    }
  });

  return treeNode;
}

// Define the component
export default function TreeViewComponent({
  topLevelParentId,
  partDetailsList,
}) {
  // Build the tree structure
  const treeStructure = buildTree(partDetailsList, topLevelParentId);
  console.log({ treeStructure });
  // Render the component

  return (
    <SimpleTreeView
      aria-label="file system navigator"
      sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {/* Render tree nodes recursively */}
      {treeStructure && renderTreeNodes([treeStructure])}
    </SimpleTreeView>
  );
}