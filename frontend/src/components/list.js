import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table, TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import {Link} from "react-router-dom";
import {API_ENDPOINT} from  '../api/index.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

function List (){
    const [article,setArticle] = useState([]) //making a state to fetch all the articles data from backend
    


    /*
    useEffect will be invoked once the page is fully rendered and only once, 
    unless something is provided in the dependency array
    */

    //display all articles from database

    function loadArticle(){
      axios.get(`${API_ENDPOINT}/api/`).then(res=>setArticle(res.data))
    }
    useEffect(()=>{
       loadArticle() //making a get request and get the data and set it for the state
       },[])

//articles rejected will be deleted and send to the deleted Article database
       const deleteArticle = (e,id)=>{
        e.preventDefault()
        axios.delete(`${API_ENDPOINT}/api/${id}`,id).then((res)=>{
            setArticle(article.filter((data)=>{
                return data.id!== id

            }))
            loadArticle()
        }
        )
    }

return (
  
    
    <div className = "table">
    <Table>
      <TableHead>
          <TableRow>
          <TableCell>index</TableCell>
            <TableCell>title</TableCell>
            <TableCell>author</TableCell>
            <TableCell>source</TableCell>
            <TableCell>pubyear</TableCell>
            <TableCell>doi</TableCell>
            <TableCell>claimed benefits</TableCell>
            <TableCell>level of evidence</TableCell>
            <TableCell>journal</TableCell>
            <TableCell>method</TableCell>
            <TableCell>actions</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {article.map((data,index) => {
     return (
       <TableRow>
        <TableCell>{index+1}</TableCell>
        <TableCell>{data.title}</TableCell>
            <TableCell>{data.authors}</TableCell>
            <TableCell>{data.source}</TableCell>
            <TableCell>{data.pubyear}</TableCell>
            <TableCell>{data.doi}</TableCell>
            <TableCell>{data.claim}</TableCell>
            <TableCell>{data.evidence}</TableCell>
            <TableCell>{data.journal}</TableCell>
            <TableCell>{data.method}</TableCell>
          <TableCell>
          <Link to={`view/${data._id}`}>
            <Button variant = "primary">View</Button>
            </Link>
          <Button variant = "danger" onClick = {(e)=>deleteArticle(e,data._id)}>Delete</Button>
          </TableCell>
        </TableRow>
   )})}
    </TableBody>
      </Table>
    </div>


);
}

export default List;