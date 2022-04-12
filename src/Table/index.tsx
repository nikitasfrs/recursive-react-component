import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  Paper,
  Typography,
} from "@mui/material";
import TableRow from "./TableRow";

import { TreeNode } from "../lib";

export interface TableProps {
  title?: string;
  nodes: TreeNode[];
  onClickDelete: (data: TreeNode) => void;
}
export default function Table({
  nodes,
  onClickDelete,
  title = "Data",
}: TableProps) {
  if (!nodes.length) {
    return <Typography variant="body1">No data found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="body1">{title.toUpperCase()}</Typography>
      <MuiTable aria-label="collapsible table">
        <TableHead>
          <MuiTableRow sx={{ bgcolor: "grey.200" }}>
            <TableCell />
            {Object.keys(nodes[0].data).map((columnName: string) => (
              <TableCell key={columnName}>{columnName}</TableCell>
            ))}
            <TableCell />
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <TableRow
              key={Object.values(node.data)[0]}
              node={node}
              onClickDelete={onClickDelete}
            />
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
