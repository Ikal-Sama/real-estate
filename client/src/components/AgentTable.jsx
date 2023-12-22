
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
  

export default function AgentTable() {
    const [agents, setAgents] = useState([]);
    useEffect(() => {
        const fetchAgents = async () => {
          try {
            const res = await fetch('http://localhost:5000/api/user/', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            setAgents(data);
          } catch (error) {
            console.error('Error fetching agents:', error);
          }
        };
    
        fetchAgents();
      }, []);

      const filteredAgents = agents.filter((agent) => agent.role === 'agent');

      const rows = filteredAgents.map((agent) => ({
            id: agent._id,
            image: agent.avatar,
            userName: agent.username,
            Email: agent.email,
        }));
  return (
    <div>
        <h1 className='text-xl my-5 font-medium'>AGENT LISTS</h1>
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
