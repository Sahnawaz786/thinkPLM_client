import * as React from 'react';
import TreeViewComponent from './TreeViewComponent';
import { useContext } from 'react';
import { PartsContext } from '../../../store/PartsProvider';
import { v4 as uuidv4 } from 'uuid';

export default function BOM() {
  const { initialBomData } = useContext(PartsContext);
  const [treeStructure, setTreeStructure] = React.useState({});
  let { topLevelParentId, partBomDetailsList } = initialBomData || {};

  const MAX_DEPTH = 100;

  function buildTree(data, parentId, depth = 0) {
    if (depth > MAX_DEPTH) {
      console.error('Maximum recursion depth exceeded');
      return null;
    }

    const parent = data?.find((item) => item.data.id === parentId);
    console.log('Processing parent:', parent);
    if (!parent) {
      console.log('Parent not found for id:', parentId);
      return null; // Return null if parent is not found
    }
    let treeNode = {
      id: parent.data.id,
      uniqueId: parent?.uniqueId || uuidv4(),
      data: parent.data,
      part_number: parent.data.part_number,
      part_name: parent.data.part_name,
      description: parent.data.description,
      cost: parent.data.cost,
      children: [],
    };

    parent.replies.forEach((childIndex) => {
      const childData = data[childIndex];
      if (childData) {
        const childNode = buildTree(data, childData.data.id, depth + 1);
        if (childNode) {
          treeNode.children.push(childNode);
        }
      }
    });

    return treeNode;
  }

  React.useEffect(() => {
    const treeStructure = buildTree(partBomDetailsList, topLevelParentId);
    function changeDuplicateUniqueIds(obj) {
      console.log({ obj });
      const uniqueIds = new Set();
      function traverseAndUpdate(node) {
        if (node.uniqueId) {
          if (uniqueIds.has(node.uniqueId)) {
            let newUniqueId;
            do {
              newUniqueId = generateUniqueId();
            } while (uniqueIds.has(newUniqueId));
            node.uniqueId = newUniqueId;
          }
          uniqueIds.add(node.uniqueId);
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => traverseAndUpdate(child));
        }
      }
      function generateUniqueId() {
        return uuidv4(); // Assuming you have a function to generate UUIDs
      }
      traverseAndUpdate(obj);
    }
    changeDuplicateUniqueIds(treeStructure);
    console.log({ treeStructure });
    setTreeStructure(treeStructure);
    console.log({ treeStructure });
  }, [topLevelParentId]);

  return (
    <TreeViewComponent
      topLevelParentId={topLevelParentId}
      partDetailsList={partBomDetailsList}
      treeStructure={treeStructure}
    />
  );
}
