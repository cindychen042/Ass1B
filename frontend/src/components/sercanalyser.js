import {useState,useEffect,} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog } from '@mui/material';
import MainPage from './mainpage';


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
    const [id_,setId_] = useState(null) // to set the orginal article id
    const [switchPanel,setSwitchPanel] = useState('') // to switch between the edited articles and the articles in queue
    const [deleted,setDeleted] = useState([]) 
    const handleClick = (e)=>{
        setSwitchPanel(e.target.name)
        console.log(e.target.name)
    }



    useEffect(()=>{
        axios.get('http://localhost:8082/analyser/articles/').then((res)=>{
            setArticlesInQueue(res.data)
            console.log(res.data)

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


        })
        //ONCE YOU SUBMIT, REMOVE THE ARTICLE FROM ANALYSER TABLE
    }

    const deleteArticle = (e,id)=>{
        e.preventDefault()
        axios.delete(`http://localhost:8082/${id}`,id).then((res)=>{
            setArticlesInQueue(articlesInQueue.filter((article)=>{
                return article.id!== id
            }))
        }
        )
    }
        // to delete a specific article.
        // once deleted, add the deleted article to the deletedarticle table in the database

    useEffect(()=>{
        axios.get('http://localhost:8082/deleted').then((res)=>{
            console.log(res.data)
            setDeleted(res.data)
        })
    },[])

    const mappingArticles = (articles)=>{
        return(
        articles.map((article)=>{
            return(
            <div className='queue-div'>
                <h1>Article # {article.articleId} </h1>
                
                <Button  onClick={(e)=>editButtonById(article.articleId)}>Edit</Button>
                <Dialog open={open} fullWidth onClose={(e)=>setOpen(false)}>
                <div className='post-form'>
                    <form  className='post-page' onSubmit={(e)=>submitChange(e,article.articleId)} method='put'>
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
                <form method='delete' onSubmit={(e)=>deleteArticle(e,article.articleId)}>
                <Button type='submit' >Delete</Button>
                </form>
             </div>
            )
        })
        )
    }

    const mapDeleted = ()=>{
        return(
        deleted.map((article)=>{
            return(

            <div className='analyser-div'>
            <div required name='title'  className='title' placeholder='insert the title' onChange={(e)=>handleChange(e)}>{article.title}</div>
            <div required name='authors'  className='title' placeholder='insert the authors name/s' onChange={(e)=>handleChange(e)}>{article.authors}</div>
            <div name='source'  className='title' placeholder="insert the source url" onChange={(e)=>handleChange(e)}>{article.sources}</div>

            <div name='volume'  className='volume' onChange={(e)=>handleChange(e)}>{article.volume}</div>
            <div name='pages'  className='pages' placeholder="insert number of pages" >{article.pages}</div>
            <div name='journal'  className='journal' placeholder="insert journal" >{article.journal}</div>
            <div name='pubyear'  className='pubyear' placeholder='insert publish year'>{article.pubyear}</div>
            <div name='doi'  className='doi' placeholder='insert doi' >{article.doi}</div>
            <div name='number'  className='number' placeholder='insert the number' >{article.number}</div>
            <div name='claim'  className='claim' placeholder='insert the claim' >{article.claim}</div>
            <div name="evidence"  className='evidence' placeholder="insert the evidence" >{article.evidence}</div>
            </div>
            )

        })
        )
    }

    if(switchPanel==='edited/completed'){
        const editedArticles = articlesInQueue.filter((article)=>{return article.edited === true})
        return(
            <div className='analyser-div'>
                <MainPage/>
                <span>
            <Button name='queue' onClick={(e)=>handleClick(e)} >Queue</Button>
            <Button name='edited/completed' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid yellowgreen'}}>Completed Articles</Button>
            <Button name='deleted' onClick={(e)=>handleClick(e)} >Deleted Articles</Button>
            </span>
            <h1>Completed Articles</h1>
            
                {mappingArticles(editedArticles)}
            </div>


        )
    }


    else if (switchPanel ==='deleted'){
        <div className='analyser-div'>
            <MainPage/>
            <span>
            <Button name='queue' onClick={(e)=>handleClick(e)}>Queue</Button>
            <Button name='edited/completed' onClick={(e)=>handleClick(e)}>Completed Articles</Button>
            <Button name='deleted' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid red'}}>Deleted Articles</Button>
            </span>
            <h1>DELETED ARTICLES</h1>
            {mapDeleted()}

        </div>
    }

    else {

        return(
            <div className='analyser-div'>
                <MainPage/>
                <span>
                <Button name='queue' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid gray'}}>Queue</Button>
                <Button name='edited/completed' onClick={(e)=>handleClick(e)}>Completed Articles</Button>
                <Button name='deleted' onClick={(e)=>handleClick(e)} >Deleted Articles</Button>
                </span>
                <h1>SERC QUEUE</h1>
                {mappingArticles(articlesInQueue)}
    
            </div>
            // more to implement...
        )
        }





    

}


export default SercAnalyser;
