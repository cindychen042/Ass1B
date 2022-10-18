import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table, TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import {Link} from "react-router-dom";
import {API_ENDPOINT} from  '../api/index.js';


function List (){
    const [article,setArticle] = useState([])

    function loadArticle(){
      axios.get(`${API_ENDPOINT}/api/`).then(res=>setArticle(res.data))
    }
    useEffect(()=>{
       loadArticle()
       },[])

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
          <TableCell>id</TableCell>
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
    {article.map((data) => {
     return (
       <TableRow>
        <TableCell>{data._id}</TableCell>
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
          <Link to={`view/${data._id}`}>View</Link>
          <form method='delete' onSubmit={(e)=>deleteArticle(e,data._id)}>
          <button>Delete</button>
          </form>
          </TableCell>
        </TableRow>
   )})}
    </TableBody>
      </Table>
    </div>


);
}

export default List;