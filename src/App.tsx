import { Box, Button } from "@mui/material";
import exampleData from "./example-data.json";
import { TreeNode, deleteNode } from "./lib";
import Table from "./Table";
import { useState } from "react";

function App() {
  const [data, setData] = useState<TreeNode[]>(exampleData);
  const handleClickDelete = (node: TreeNode) => {
    setData(deleteNode(node, data));
  };
  const handleClickReset = () => {
    setData(exampleData);
  };
  return (
    <Box m={4} className="App">
      <Table nodes={data} onClickDelete={handleClickDelete} />
      <Button variant="contained" onClick={handleClickReset}>
        Reset
      </Button>
    </Box>
  );
}

export default App;
