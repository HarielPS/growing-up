"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import getColor from '@/themes/colorUtils';
import Loading from '@/components/loading/loading'; // Importa tu componente de carga

const columns = [
  { id: 'project', label: 'Proyecto', minWidth: 170, align: 'center' },
  { id: 'term', label: 'Plazo', minWidth: 50, align: 'center' },
  { id: 'investment', label: 'Inversión', minWidth: 170, align: 'right', format: (value) => `$${value.toLocaleString('en-US')}` },
  { id: 'earnings', label: 'Ingresos', minWidth: 170, align: 'right', format: (value) => `$${value.toLocaleString('en-US')}` },
  { id: 'dueDate', label: 'Fecha Corte', minWidth: 170, align: 'right' },
  { id: 'status', label: 'Estatus', minWidth: 170, align: 'center' },
];

function createData(project, term, investment, earnings, dueDate, status, img) {
  return { project, term, investment, earnings, dueDate, status, img };
}

const initialRows = [
  createData('Proyecto A', '1 mes', 241, 0, '02/02/24', 'Al corriente', '/path/to/imageA.jpg'),
  createData('Proyecto B', '1 mes', 535, 0, '03/02/24', 'Atrasado', '/path/to/imageB.jpg'),
  createData('Proyecto C', '1 mes', 855, 0, '14/02/24', 'En proceso', '/path/to/imageC.jpg'),
  createData('Proyecto D', '1 mes', 375, 0, '21/02/24', 'Al corriente', '/path/to/imageD.jpg'),
  createData('Proyecto E', '1 mes', 338, 0, '17/02/24', 'En proceso', '/path/to/imageE.jpg'),
  createData('Proyecto F', '1 mes', 628, 0, '11/02/24', 'Al corriente', '/path/to/imageF.jpg'),
  createData('Proyecto G', '1 mes', 241, 0, '02/02/24', 'Al corriente', '/path/to/imageA.jpg'),
  createData('Proyecto H', '1 mes', 535, 0, '03/02/24', 'Atrasado', '/path/to/imageB.jpg'),
  createData('Proyecto I', '1 mes', 855, 0, '14/02/24', 'En proceso', '/path/to/imageC.jpg'),
  createData('Proyecto J', '1 mes', 375, 0, '21/02/24', 'Al corriente', '/path/to/imageD.jpg'),
  createData('Proyecto K', '1 mes', 338, 0, '17/02/24', 'En proceso', '/path/to/imageE.jpg'),
  createData('Proyecto L', '1 mes', 628, 0, '11/02/24', 'Al corriente', '/path/to/imageF.jpg'),
];

const statusSeverity = {
  'Al corriente': 'success',
  'En proceso': 'info',
  'Atrasado': 'warning',
  'Pagado': 'success',
  'Cancelado': 'error',
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            sx={{
              background: getColor(theme, 'head'),
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function InvestmentTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('project');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();

  React.useEffect(() => {
    const fetchData = () => {
      // Simula la carga de datos
      setTimeout(() => {
        setRows(initialRows);
        setLoading(false);
      }, 2000); // Ajusta el tiempo de espera según tus necesidades
    };

    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.project.toLowerCase().includes(search.toLowerCase())
  );

  const visibleRows = stableSort(filteredRows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Box sx={{ marginBottom: '2vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          sx={{
            width: {
              xs: '100%',
              md: '50%'
            }
          }}
          variant="outlined"
          label="Buscar"
          multiline
          value={search}
          onChange={handleSearch}
        />
      </Box>

      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
        background: getColor(theme, 'fifth'),
        border: `2px solid ${getColor(theme, 'six')}`,
        boxShadow: `0px 0px 6vh ${getColor(theme, 'shadow')}`,
      }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.project}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="center" style={{ textAlign: 'center' }}>
                        {column.id === 'project' ? (
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <Avatar alt={row.project} src={row.img} sx={{ width: 24, height: 24, marginRight: 1 }} />
                            {value}
                          </Box>
                        ) : column.id === 'status' ? (
                          <Alert severity={statusSeverity[value]}>{value}</Alert>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
