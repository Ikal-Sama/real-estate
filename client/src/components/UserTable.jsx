
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';


const columns = [
    { field: 'id', headerName: 'ID', width: 190 },
    {
        field: 'image',
        headerName: '',
        width: 10,
        renderCell: (params) => (
            <img src={params.value} alt="User" style={{ width: '100%', height: 'auto', borderRadius: '50%'}} />
          ),
    },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 190,
      editable: true,
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 450,
      editable: true,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 210,
        renderCell: (params) => (
            <div className='flex gap-4'>
              <button onClick={() => handleEdit(params.row.id)}>Edit</button>
              <button onClick={() => handleDelete(params.row.id)}>Delete</button>
              <button onClick={() => handleView(params.row.id)}>View</button>
            </div>
          ),
      },
  ];
  
  const handleEdit = (id) => {
    // Handle edit action for the user with the given id
    console.log(`Edit user with id ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action for the user with the given id
    console.log(`Delete user with id ${id}`);
  };

  const handleView = (id) => {
    // Handle view action for the user with the given id
    console.log(`View user with id ${id}`);
  };

export default function UserTable() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch('http://localhost:5000/api/user/', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            setUser(data);
          } catch (error) {
            console.error('Error fetching houses:', error);
          }
        };
    
        fetchUsers();
      }, []);

      const filteredUsers = user.filter((user) => user.role === 'user');

      const rows = filteredUsers.map((user) => ({
            id: user._id,
            image: user.avatar,
            userName: user.username,
            Email: user.email,
        }));
  return (
    <div>
        <h1 className='text-xl my-5 font-medium'>USER LISTS</h1>
        <Box sx={{ height: 330, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  )
}
