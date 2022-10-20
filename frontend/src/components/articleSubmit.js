
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import MainPage from "./mainpage";
import {API_ENDPOINT} from '../api/index.js'



function Articles(){
        //creating a state for article data, to be sent to the server side once submitted (post request)
        const [content,setContent] = useState({title:'',authors:'',volume:'',journal:'',number:'',pages:'',source:'',pubyear:'',doi:'',claim:'',evidence:''})
        
        /*
        a state for controlling opening/closing a dialog with a message (shows you a confirmation message thatt your article
        has been submitted
        */
        const [openDialog,setOpenDialog] = useState({message:'',value:0})

        //destructing the openDialog state to directly retrieving the values of the object
        const {message,value} = openDialog 

        //same destructing here for content state
        const {title,authors,journal,number,pages,doi,pubyear,source,evidence,claim,volume} = content

        //initializing a redirect functionality for redirecting to other pages
        const redirect = useNavigate()



    /* This function is responsible for tracking the change of "current" state 
    and updating it with every change (user event (e.g writing stuffs from keyboard)) that happens */
    const handleChange = (e)=>{
        setContent(
                {
                ...content,
                [e.target.name]:e.target.value
                }
        )
    }


    /*handling the submission by making a post request (sending "content" data) from client side
    and putting "content" state data as a request body*/
    const handleSubmit = (e)=>{
        e.preventDefault() //this functionality prevent any hard reload whenever a user press the submit button
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
            //a dialog will display, and after 2 seconds the client will redirect the user to 'Home' page.
           

        })

        
    }



    //finally, rendering the jsx content.

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