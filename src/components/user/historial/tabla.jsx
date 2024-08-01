"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider } from '@mui/material';
import getColor from '@/themes/colorUtils';

const columns = [
  { id: 'project', label: 'Proyecto', minWidth: 170, align: 'left' },
  { id: 'term', label: 'Plazo', minWidth: 50, align: 'left' },
  { id: 'date', label: 'Fecha', minWidth: 100, align: 'left' },
  { id: 'status', label: 'Estatus', minWidth: 100, align: 'center' },
  { id: 'amount', label: 'Monto', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
  { id: 'earnings', label: 'Ingresos', minWidth: 100, align: 'right', format: (value) => `$${value.toFixed(2)}` },
];

function createData(project, term, date, status, amount, earnings, img) {
  return { project, term, date, status, amount, earnings, img };
}

const initialRows = [
  createData('Mis inversiones', '1 mes', '11/02/24', 'Pagado', 97.85, 628),
  createData('Mis inversiones', '1 mes', '02/02/24', 'Pagado', 105.40, 841),
  createData('Mis inversiones', '2 mes', '03/02/24', 'Cancelado', 53.98, 535),
  createData('Mis inversiones', '1 mes', '14/02/24', 'Pagado', 92.42, 855),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
  createData('Mis inversiones', '1 mes', '17/02/24', 'Pagado', 47.10, 338),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
  createData('Mis inversiones', '1 mes', '11/02/24', 'Pagado', 97.85, 628),
  createData('Mis inversiones', '1 mes', '02/02/24', 'Pagado', 105.40, 841),
  createData('Mis inversiones', '2 mes', '03/02/24', 'Cancelado', 53.98, 535),
  createData('Mis inversiones', '1 mes', '14/02/24', 'Pagado', 92.42, 855),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
  createData('Mis inversiones', '1 mes', '17/02/24', 'Pagado', 47.10, 338),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
  createData('Mis inversiones', '2 mes', '21/02/24', 'Pagado', 15.69, 375),
];

const statusColors = {
  'Pagado': 'green',
  'Cancelado': 'orange',
};

const iconColor = {
  'up': 'green',
  'down': 'blue'
};

export default function InvestmentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();

  React.useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setRows(initialRows);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    // <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
    <Box>
      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
        height: '100%',
        boxShadow: `1px 1px 9px 10px ${getColor(theme, 'shadow')}`,
      }}>
        <TableContainer>
          <Table stickyHeader aria-label="investment table">
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={row.project} src={row.img} sx={{ width: 40, height: 40, marginRight: 2 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">{row.project}</Typography>
                      <Typography variant="body2" color="textSecondary">{row.term} {row.date}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color={statusColors[row.status]}>{row.status}</Typography>
                    <Divider sx={{ backgroundColor: statusColors[row.status], height: 2, marginTop: 1 }} />
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <Box display="flex" alignItems="center">
                        <ArrowUpwardIcon sx={{ color: iconColor.up, fontSize: 16 }} />
                        <Typography variant="body1" fontWeight="bold">${row.amount.toFixed(2)}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <ArrowForwardIcon sx={{ color: iconColor.down, fontSize: 16 }} />
                        <Typography variant="body2" color="textSecondary">${row.earnings}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
