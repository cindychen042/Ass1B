import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table, TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import {Link} from "react-router-dom";
function List (){
    const [article,setArticle] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8082/').then(res=>setArticle(res.data))
       },[])


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
    {article.map((data,id) => {
     return (
       <TableRow>
        <TableCell>{id+1}</TableCell>
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
          <Link to={`view/${id+1}`}>View</Link>
          </TableCell>
        </TableRow>
   )})}
    </TableBody>
      </Table>
    </div>

);
}

export default List;