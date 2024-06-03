import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PartsContext } from '../../../store/PartsProvider';
// Recursive component to render tree nodes
const renderTreeNodes = ({ nodes, parentId, handleClick }) => {
  return nodes.map((node) => {
    console.log({ node });

    return (
      <TreeItem
        key={node?.parent?.id}
        nodeId={node?.parent?.id}
        label={node?.part_name}
        onClick={() => handleClick({ id: node.id, data: node.data, parentId })}
        itemId={node?.uniqueId}
      >
        {node?.children?.length > 0 &&
          renderTreeNodes({
            nodes: node?.children,
            parentId: node.id,
            handleClick,
          })}
      </TreeItem>
    );
  });
};

// Function to build tree structure

// Define the component
export default function TreeViewComponent({
  topLevelParentId,
  partDetailsList,
  treeStructure,
}) {
  const [expandedItems, setExpandedItems] = React.useState([]);
  const { setSelectedData, setBomIds } = React.useContext(PartsContext);
  console.log('TreeViewComponent', treeStructure);

  console.log({ treeStructure });
  const handleClick = ({ id, data, parentId }) => {
    console.log('====================================');
    console.log({ id, data, parentId });
    console.log('====================================');
    setSelectedData(data);

    localStorage.setItem(
      'bomIds',
      JSON.stringify({
        parentId: parentId,
        childId: id,
        masterId: data?.masterId,
      })
    );
    setBomIds({
      parentId: parentId,
      childId: id,
      masterId: data?.masterId,
    });
  };

  const handleExpandedItemsChange = (event, itemIds) => {
    console.log({ itemIds });
    setExpandedItems(itemIds);
  };

  return (
    <SimpleTreeView
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
      aria-label='file system navigator'
      sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {/* Render tree nodes recursively */}
      {treeStructure &&
        renderTreeNodes({
          nodes: [treeStructure],
          setSelectedData,
          handleClick,
        })}
    </SimpleTreeView>
  );
}
