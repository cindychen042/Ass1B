import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainPage from "./mainpage";

 
function SearchArticles(){
    const[articles, setArticles] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:8082/')
        .then((response) => response.json())
        .then((json)=> {
            setArticles(json)
        })
    }, []);

    const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 350},
    { field: 'authors', headerName: 'Author Name', width: 200 },
    { field: 'source', headerName: 'Source', width: 150 },
    {
      field: 'pubyear',
      headerName: 'Publish Year',
      type: 'number',
      width: 150,
    },
    { field: 'doi', headerName: 'DOI', width: 200 },
    { field: 'claim', headerName: 'Claim', width: 200 },
    { field: 'evidence', headerName: 'Evidence', width: 200 },
    
    ];
    
    

    return (
      <div style={{height: 680, width: '100%' }}>
        <MainPage></MainPage>
        <DataGrid
          rows={articles}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[3]}
          getRowId={(row) => row._id}
          checkboxSelection
          
        />
        
      </div>
      
    )
 }

export default SearchArticles;