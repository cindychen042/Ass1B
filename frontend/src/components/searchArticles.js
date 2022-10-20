import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainPage from "./mainpage";
import {API_ENDPOINT} from '../api/index.js'
import {Link} from "react-router-dom";
 
function SearchArticles({dataTestId1, dataTestId2}){
  const[articles, setArticles] = useState([]);  //stores articles
  const[value, setValue] = useState(""); //stores input value from search bar
  let [old_data] = useState([]); //stores old searches from search bar
  let new_data = value; //stores value 
  const[dummArr, setDummyArr] = useState([]); //array for recent search values

   
    //responsible for getting recent searches from local storage
  useEffect(()=>{
    if(localStorage.getItem('dataKey') == null){
      localStorage.setItem('dataKey', '[]');
    }
   })

   //responsible for displaying article/s when/after being searched
  useEffect(()=> {
    fetch(`${API_ENDPOINT}/api/`)
      .then((response) => response.json())
      .then((json)=> {
        setArticles(json)
    })
  }, []);

  //initialise column
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
  }];
    
  //responsible for filtering table based on what is being searched
  const search= (data) => {
    return data.filter(item=> item.title.includes(value));
  }
  
  //sets value based on input value 
  const onSearch = (data) => {
    setValue(data);
    addSearch(); //adds the value to search history
  }
  

  const onChange=(event)=>{
    setValue(event.target.value);
    old_data = JSON.parse(localStorage.getItem('dataKey'));
    localStorage.setItem('dataKey', JSON.stringify(old_data)); //display search history
    setDummyArr(old_data); //set search array based on values obtained by previous searches
  }


  //adds the value to search history
  const addSearch= ()=>{
    old_data = JSON.parse(localStorage.getItem('dataKey'));
    if(!old_data.includes(new_data)){
      old_data.push(new_data);
    }

    localStorage.setItem('dataKey', JSON.stringify(old_data));
    setDummyArr(old_data); //set search array based on values obtained by previous searches
  }
    

  return (
    <div  style={{height: 680, width: '100%' }}>
      <MainPage></MainPage>
      <input 
        type = "text"
        placeholder="Search SE practice article"
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
        }).map((item)=>(
          <div className="dropdown-row" key = {item} onClick={()=>{}}>
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
