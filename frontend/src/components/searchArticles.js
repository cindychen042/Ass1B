import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainPage from "./mainpage";
import {API_ENDPOINT} from '../api/index.js'
import {Link} from "react-router-dom";
 
function SearchArticles({dataTestId1, dataTestId2}){
    const[articles, setArticles] = useState([]);
    const[value, setValue] = useState("");
    let [old_data] = useState([]);
    let new_data = value;
    const[dummArr, setDummyArr] = useState([]);

   
   useEffect(()=>{
    if(localStorage.getItem('dataKey') == null){
      localStorage.setItem('dataKey', '[]');
    }
   })

    useEffect(()=> {
        fetch(`${API_ENDPOINT}/api/`)
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
    {field: 'actions',headerName:'Action',width:200,
    renderCell:(cellValues)=>{
      return <Link to={`userview/${cellValues.row._id}`}>View</Link>;
    }
  }
    ];
    
    
    const search= (data) => {
      return data.filter(item=> item.title.includes(value));
    }
   
    const onSearch = (data) => {
      setValue(data);
      addSearch();
    }
    const onChange=(event)=>{
      setValue(event.target.value);
      old_data = JSON.parse(localStorage.getItem('dataKey'));
      localStorage.setItem('dataKey', JSON.stringify(old_data));
      setDummyArr(old_data);
    }

    const addSearch= ()=>{
      old_data = JSON.parse(localStorage.getItem('dataKey'));
      if(!old_data.includes(new_data)){
        old_data.push(new_data);
      }

      localStorage.setItem('dataKey', JSON.stringify(old_data));
      setDummyArr(old_data);
      
    }
    

    return (
      <div  style={{height: 680, width: '100%' }}>
        <MainPage></MainPage>
        <input 
          type = "text"
          placeholder="Search SE method"
          className='searchBar'
          height= '50'
          value = {value}
          data-testid={dataTestId1}
          onChange={onChange}
        />
        <button style ={{
            height:50,
            width: '100px',
            border: '50px',
            borderRadius: '25px',
            color: 'black',
            backgroundClip:'grey'}}
            type='submit'
            data-testid={dataTestId2}
            onClick={()=> onSearch(value)}
            >
            Search
        </button>

        <div className = "dropdown">
          {dummArr.filter(item =>{
            const searchTerm = value.toLowerCase()
            const titleName = item.toLowerCase()
            return searchTerm && titleName.startsWith(searchTerm) && titleName !==searchTerm;
          })
          .map((item)=>(
            <div className="dropdown-row" key = {item} onClick={()=>{}}
            >
              {item} 
            </div>)
          )}
        </div>

        
        
        <DataGrid
          rows={search(articles)}
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
