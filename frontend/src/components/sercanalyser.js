import {useState,useEffect,} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog } from '@mui/material';

function SercAnalyser(){
    const id = useParams() // to access a specific article by id 
    const redirect = useNavigate() // to redirect to another page when needed
    const [articlesInQueue,setArticlesInQueue] = useState([]) // receiving all articles in queue
    const [articleOnEdit,setArticleOnEdit] = useState({title:'',authors:'',volume:'',journal:'',number:'',pages:'',source:'',pubyear:'',doi:'',claim:'',evidence:'',method:'',status:''})
    const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume,method,status} = articleOnEdit
    const [isEdited,setIsEdited] = useState(false) // if article has been edited, the useEffect function will be invoked again to actually fetch the article again 
    //with the updated values// this state will be put in useEffect dependency array in order for the function to invoke on every update
    const [notify,setNotify] = useState(0) //this state will be used in sprint 2
    const [open,setOpen] = useState(false) //we are going to use a dialog, so this state is going to control opening/closing the dialog


    useEffect(()=>{
        axios.get('http://localhost:8082/analyser/articles/').then((res)=>{
            setArticlesInQueue(res.data)

        }).catch((e)=>{
            console.log(e.response.data)
        })
    },[])
    // this effect is implemented to receive all articles in queue


    const editButtonById = (id)=>{

        axios.get(`http://localhost:8082/${id}/`).then((res)=>{
            setArticleOnEdit(res.data)
            setOpen(true)


        })
        
    }

    const handleChange = (e)=>{
        //time to edit a specific article

        setArticleOnEdit({
            ...articleOnEdit,
            [e.target.name]:e.target.value
        })


    }
    const submitChange = (e,id)=>{
        e.preventDefault()
        axios.put(`http://localhost:8082/articles/${id}`,articleOnEdit).then((res)=>{
            console.log(res.data)   
        })
        //ONCE YOU SUBMIT, REMOVE THE ARTICLE FROM ANALYSER TABLE
    }

    const deleteArticle = (e)=>{
        // to delete a specific article.
        // once deleted, add the deleted article to the deletedarticle table in the database
    }

    const mappingArticles = ()=>{
        return(
        articlesInQueue.map((article)=>{
            return(
            <div className='article-div'>
                <p>Title: {title}</p>
                <p>Authors: {authors}</p>
                <p>Source: {source} </p>
                <p>Volume : {volume}</p>
                <p>Pages : {pages}</p>
                <p>Journal : {journal}</p>
                <p>Number : {number}</p>
                <p>Publish year : {pubyear}</p>
                <p>DOI : {doi}</p>
                <p>Claim : {claim}</p>
                <p>Evidence: {evidence}</p>
                <p>Method: {method}</p>
                <p>Status: {status}</p>
                
                <Button  onClick={(e)=>editButtonById(article.article)}>Edit</Button>
                <Dialog open={open} fullWidth onClose={(e)=>setOpen(false)}>
                <div className='post-form'>
                    <form  className='post-page' onSubmit={(e)=>submitChange(e,article.article)} method='put'>
                    <input required name='title' value={title} className='title' placeholder='insert the title' onChange={(e)=>handleChange(e)}/>
                    <input required name='authors' value={authors} className='title' placeholder='insert the authors name/s' onChange={(e)=>handleChange(e)}/>
                    <input name='source' value={source} className='title' placeholder="insert the source url" onChange={(e)=>handleChange(e)}/>

                    <input name='volume' value={volume} className='volume' onChange={(e)=>handleChange(e)} placeholder='enter volume'/>
                    <input name='pages' value={pages} className='pages' placeholder="insert number of pages" onChange={(e)=>handleChange(e)}/>
                    <input name='journal' value={journal} className='journal' placeholder="insert journal" onChange={(e)=>handleChange(e)}/>
                    <input name='pubyear' value={pubyear} className='pubyear' placeholder='insert publish year' onChange={(e)=>handleChange(e)}/>
                    <input name='doi' value={doi} className='doi' placeholder='insert doi' onChange={(e)=>handleChange(e)}/>
                    <input name='number' value={number} className='number' placeholder='insert the number' onChange={(e)=>handleChange(e)}/>
                    <input name='claim' value={claim} className='claim' placeholder='insert the claim' onChange={(e)=>handleChange(e)}/>
                    <input name="evidence" value={evidence} className='evidence' placeholder="insert the evidence" onChange={(e)=>handleChange(e)}/>
                    <Button type='submit'>Submit Article</Button>
                    </form>
                    </div>
                </Dialog>
                <Button onClick={(e)=>deleteArticle(e)}>Delete</Button>
             </div>
            )
        })
        )
    }

    return(
        <div className='analyser-div'>
            <h1>SERC QUEUE</h1>
            {mappingArticles()}

        </div>
        // more to implement...
    )





    

}


export default SercAnalyser;
