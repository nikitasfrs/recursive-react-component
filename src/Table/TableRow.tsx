import { ComponentProps, useState } from "react";
import {
  TableRow as MuiTableRow,
  Collapse,
  IconButton,
  TableCell,
  Box,
} from "@mui/material";
import { TreeNode } from "../lib";
import Table from "./index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";

export interface TableRowProps {
  node: TreeNode;
  onClickDelete: ComponentProps<typeof Table>["onClickDelete"];
}

function TableRow({ node, onClickDelete }: TableRowProps) {
  const [open, setOpen] = useState(false);

  const { data, kids } = node;

  const handleClickDelete = () => {
    onClickDelete(node);
  };

  return (
    <>
      <MuiTableRow>
        <TableCell>
          {Object.keys(kids).length ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <Box />
          )}
        </TableCell>
        {Object.values(data).map((value: string, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
        <TableCell>
          <IconButton
            aria-label="delete row"
            size="small"
            onClick={handleClickDelete}
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
      </MuiTableRow>
      {Object.entries(kids).map(
        ([title, children]) =>
          children && (
            <MuiTableRow key={title}>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={Object.keys(data).length + 2}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box m={4}>
                    <Table
                      title={title}
                      nodes={children.records}
                      onClickDelete={onClickDelete}
                    />
                  </Box>
                </Collapse>
              </TableCell>
            </MuiTableRow>
          )
      )}
    </>
  );
}

export default TableRow;
