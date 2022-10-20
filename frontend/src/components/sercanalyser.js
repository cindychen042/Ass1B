import {useState,useEffect,} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, Menu, MenuItem,Fade} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainPage from './mainpage';
import {API_ENDPOINT} from '../api/index.js'


function SercAnalyser(){
    const [articlesInQueue,setArticlesInQueue] = useState([]) // receiving all articles in queue


    const [articleOnEdit,setArticleOnEdit] = useState({title:'',authors:'',volume:'',journal:'',number:'',pages:'',source:'',pubyear:'',doi:'',claim:'',evidence:'',method:'',status:''})


    const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume,method,status} = articleOnEdit


    const [isEdited,setIsEdited] = useState(false) // if article has been edited, the useEffect function will be invoked again to actually fetch the article again 
    //with the updated values// this state will be put in useEffect dependency array in order for the function to invoke on every update


    const [open,setOpen] = useState(false) //we are going to use a dialog, so this state is going to control opening/closing the dialog


    const [switchPanel,setSwitchPanel] = useState('') // to switch between the edited articles and the articles in queue

    const [deleted,setDeleted] = useState([])
    const [updated,setUpdated] = useState(0) //re-invoke useEffect whenever there is a change in the queue


    const [anchorEl, setAnchorEl] = useState(null);

    const open_ = Boolean(anchorEl);
    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const handleClick = (e)=>{
        setSwitchPanel(e.target.name)
    }



    useEffect(()=>{
        axios.get(`${API_ENDPOINT}/api/analyser/analyser/articles/`).then((res)=>{
            setArticlesInQueue(res.data)
            }).catch((e)=>{
        })
    },[isEdited,updated])

    // this effect is implemented to receive all articles in queue
    const editButtonById = (id)=>{

        axios.get(`${API_ENDPOINT}/api/${id}/`).then((res)=>{
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
        axios.put(`${API_ENDPOINT}/api/analyser/articles/${id}`,articleOnEdit).then((res)=>{
            setIsEdited(true)
            setOpen(false)
            setSwitchPanel('edited/completed')


        })
    }

    

    const deleteArticle = (e,id)=>{
        e.preventDefault()
        axios.delete(`${API_ENDPOINT}/api/${id}/`,id).then((res)=>{
            setArticlesInQueue(articlesInQueue.filter((article)=>{
                return article.id!== id

            }))
            setUpdated(updated+1)
        }
        )
    }
        // to delete a specific article.
        // once deleted, add the deleted article to the deletedarticle table in the database

    useEffect(()=>{
        axios.get(`${API_ENDPOINT}/deleted`).then((res)=>{
            setDeleted(res.data)
        })
    },[])

    const mappingArticles = (articles)=>{
        if(articles.length){
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
                    <input name='status' value={status} className='status' placeholder="status" onChange={(e)=>handleChange(e)} />
                    <input name='method' value={method} className='method' placeholder="method" onChange={(e)=>handleChange(e)} />
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
    return(
        null
        
    )
    }

    const mapDeleted = (deleted)=>{

        if(deleted.length){
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
    return null
    }

    if(switchPanel==='edited/completed'){
        const editedArticles = articlesInQueue.filter((article)=>{return article.edited === true})
        return(
            <div className='analyser-div'>
                <MainPage/>
                <Button
        id="fade-button"
        aria-controls={open_ ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open_ ? 'true' : undefined}
        onClick={handleMenu}
      >
        <div style={{width:'100%'}}>
        <NotificationsIcon color={articlesInQueue.length?'primary':'action'} fontSize='large'></NotificationsIcon>
        </div>
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open_}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
          {<MenuItem onClick={handleClose}>{articlesInQueue.length?<span>New Articles has been added to the queue</span>:<span>Nothing to show.</span>}</MenuItem>}
      </Menu>
                <span >
            <Button name='queue' onClick={(e)=>handleClick(e)} >Queue</Button>
            <Button name='edited/completed' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid yellowgreen'}}>Completed Articles</Button>
            <Button name='deleted' onClick={(e)=>handleClick(e)} >Deleted Articles</Button>
            </span>
            <h1>Completed Articles</h1>
            
                {mappingArticles(editedArticles)}
            </div>


        )
    }


    if (switchPanel ==='deleted'){
        return(
        <div className='analyser-div'>
            <MainPage/>
            <Button
        id="fade-button"
        aria-controls={open_ ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open_ ? 'true' : undefined}
        onClick={handleMenu}
      >
        <NotificationsIcon color={articlesInQueue.length?'primary':'action'} fontSize='large'></NotificationsIcon>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open_}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {<MenuItem onClick={handleClose}>{articlesInQueue.length?<span>New Articles has been added to the queue</span>:<span>Nothing to show.</span>}</MenuItem>}
      </Menu>
            <span>
            <Button name='queue' onClick={(e)=>handleClick(e)}>Queue</Button>
            <Button name='edited/completed' onClick={(e)=>handleClick(e)}>Completed Articles</Button>
            <Button name='deleted' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid red'}}>Deleted Articles</Button>
            </span>
            <h1>DELETED ARTICLES</h1>
            {deleted.length?mapDeleted(deleted):null}

        </div>
        )
    }

    else {
        let articles_ = articlesInQueue.filter((article)=>article.edited===false)

        return(
            <div className='analyser-div'>
                <MainPage/>
                <Button
        id="fade-button"
        aria-controls={open_ ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open_ ? 'true' : undefined}
        onClick={handleMenu}
      >
        <NotificationsIcon color={articlesInQueue.length?'primary':'action'} fontSize='large'></NotificationsIcon>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open_}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
          {<MenuItem onClick={handleClose}>{articlesInQueue.length?<span>New Articles has been added to the queue</span>:<span>Nothing to show.</span>}</MenuItem>}
      </Menu>
                <span>
                <Button name='queue' onClick={(e)=>handleClick(e)} style={{'borderBottom':'2px solid gray'}}>Queue</Button>
                <Button name='edited/completed' onClick={(e)=>handleClick(e)}>Completed Articles</Button>
                <Button name='deleted' onClick={(e)=>handleClick(e)} >Deleted Articles</Button>
                </span>
                <h1>SERC QUEUE</h1>
                {mappingArticles(articles_)}
    
            </div>
        )
        }





    

}


export default SercAnalyser;
