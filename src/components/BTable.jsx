import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import BTableRow from './BTableRow';
import BTableCell from './BTableCell';

const BTable = ({ headers = [], items = [], children }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <BTableRow>
            {
              headers.map((header) => {
                return (<BTableCell key={header.key}>{header.title}</BTableCell>)
              })
            }
          </BTableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BTable