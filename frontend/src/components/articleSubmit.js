
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import MainPage from "./mainpage";
import {API_ENDPOINT} from '../api/index.js'



function Articles(){
        const [content,setContent] = useState({title:'',authors:'',volume:'',journal:'',number:'',pages:'',source:'',pubyear:'',doi:'',claim:'',evidence:''})
        const [openDialog,setOpenDialog] = useState({message:'',value:0})
        const {message,value} = openDialog 
        const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume} = content
        const redirect = useNavigate()



    const handleChange = (e)=>{
        setContent(
                {
                ...content,
                [e.target.name]:e.target.value
                }
        )
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(`${API_ENDPOINT}/api/articles`,content).then((res)=>{
            setOpenDialog(
                {
                    value:!value,
                    message:res.data

                }

            )
            setTimeout(()=>{
                redirect('/')
            },2000)
            //a dialog will display, and after 3 seconds the client will redirect the user to 'Home' page.
           

        })

        
    }



    return(
            <div className='article-div'>
                <MainPage></MainPage>
               
                <div className='post-form'>
    
                <form method='post' className='post-page' onSubmit={(e)=>handleSubmit(e)}>
                <div className='header'><h1>Article Submission Form</h1></div>
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
                    <form method='dialog'>
                    <dialog open={value} >
                        {message}
                    </dialog>
                    </form>
                    <button type='submit' className='submit'>Submit</button>                    
                </form>
                </div>

            </div>
        )
    }



export default Articles;