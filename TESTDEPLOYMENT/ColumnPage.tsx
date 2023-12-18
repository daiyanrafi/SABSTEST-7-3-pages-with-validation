// ColumnPage.tsx
import * as React from 'react';
import {
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import InputPage from './InputPage';
import InputTwoPage from './InputTwoPage';

interface UserData {
  id: number;
  title: string;
  description: string;
  status: string;
  createdDate: Date;
  school?: string;
  college?: string;
}

const ColumnPage: React.FC = () => {
  const [data, setData] = React.useState<UserData[]>(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [currentPage, setCurrentPage] = React.useState(0);

  const handleDeleteClick = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  const handleInputSubmit = (inputData: { title: string; description: string; status: string }) => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newDate = new Date();
    const formattedData: UserData = { id: newId, createdDate: newDate, ...inputData };
    const newDataArray = [...data, formattedData];
    setData(newDataArray);
    localStorage.setItem('userData', JSON.stringify(newDataArray));

    // Move to the next page
    setCurrentPage(1);
  };

  const handleInputTwoSubmit = (inputTwoData: { school: string; college: string }) => {
    const updatedData = data.map((item) =>
      item.id === data.length ? { ...item, ...inputTwoData } : item
    );
    setData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));

    // Move back to the first page
    setCurrentPage(0);
  };

  const handleBack = () => {
    setCurrentPage(0);
  };

  return (
    <Grid container justifyContent="center" alignItems="flex-start" style={{ height: '100vh', marginTop: '40px' }}>
      <Grid item xs={8}>
        {currentPage === 0 && (
          <Button variant="contained" color="primary" onClick={() => setCurrentPage(1)}>
            Add Details
          </Button>
        )}
        {currentPage === 1 && <InputPage onSubmit={handleInputSubmit} onNext={() => setCurrentPage(2)} />}
        {currentPage === 2 && <InputTwoPage onSubmit={handleInputTwoSubmit} />}
        {currentPage === 1 || currentPage === 2 ? (
          <Button 
          variant="contained" 
          onClick={handleBack}
          style={{ marginTop: '16px' }}
            >
            Back
          </Button>
        ) : null}
        {currentPage !== 1 && currentPage !== 2 && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.school || '-'}</TableCell>
                    <TableCell>{row.college || '-'}</TableCell>
                    <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(row.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ColumnPage;
