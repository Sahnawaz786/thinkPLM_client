import { v4 as uuidv4 } from "uuid";

const uniqueIds = [
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049540",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049541",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049542",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049543",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049544",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049545",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049546",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049547",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049548",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049549",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs38403240940950495410",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs38403240940950495411",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs38403240940950495412",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs38403240940950495413",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs38403240940950495414",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs384032409409504954015",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs384032409409504954016",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs384032409409504954172",
   "hfbshbfkhsbkfjsknksjnsjnfljsnfljs3840324094095049540173",
]

function buildTree(data, parentId) {
  
    // Find the parent object in the data array
    const parent = data?.find((item) => item.data.id === parentId);
  
    if (!parent) {
      return null; // Return null if parent is not found
    }
    let treeNode = {
      id: parent.data.id,
      uniqueId: uuidv4(),
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
        const childNode = buildTree(data, childData.data.id);
        if (childNode) {
          treeNode.children.push(childNode);
        }
      }
    });
  
    return treeNode;
  }
  const isAuthenticated = () => {
    if (localStorage.getItem('token')) {
        console.log({gazal: localStorage.getItem('token')})
        return localStorage.getItem('token')
    }
    return false
}
export {
  buildTree,
  isAuthenticated,
  uniqueIds
};

// export default uniqueIds;