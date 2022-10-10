import axios from "axios"
import { useParams ,useNavigate} from "react-router-dom";
import { React,useEffect,useState} from "react";
import MainPage from "./mainpage";
import {API_ENDPOINT} from '../api/index.js'


const View =()=>{  
   const [article1,setArticle1] = useState([]);
   const redirect = useNavigate()

   const {id} = useParams();

   useEffect(()=>{
    axios.get(`${API_ENDPOINT}/api/${id}/`).then(res=>setArticle1(res.data));
   },[]);

   const sendToAnalyst = (e)=>{
    e.preventDefault()
    axios.post(`${API_ENDPOINT}/api/analyser/articles/`,article1).then((res)=>{
        redirect('/analyser/articles')
    }).catch((e)=>{
        console.log(e.response.data)
    })
   }

return(
        <div className='article-div'>
            <MainPage></MainPage>
           
            <div className='post-form'>
            <form method='post' className='post-page'  onSubmit={(e)=>sendToAnalyst(e)} >
            <div className='header'><h1>Article Details</h1></div>
                <li className = 'title'>Title: <span className = 'title'>{article1.title}</span></li> 
                <li className = 'authors'>Authors: <span className = 'authors'>{article1.authors}</span></li> 
                <li className = 'source'>Source: <span className = 'source'>{article1.source}</span></li> 
                <li className = 'volume'>Volume: <span className = 'volume'>{article1.volume}</span></li> 
                <li className = 'pages'>Pages: <span className = 'pages'>{article1.pages}</span></li> 
                <li className = 'journal'>Journal: <span className = 'journal'>{article1.journal}</span></li> 
                <li className = 'pubyear'>Pubyear: <span className = 'pubyear'>{article1.pubyear}</span></li> 
                <li className = 'claim'>Claim: <span className = 'claim'>{article1.claim}</span></li> 
                <li className = 'evidence'>Evidence: <span className = 'evidence'>{article1.evidence}</span></li>
                <button type='submit' className='submit'>Send to Analyst</button>                    
            </form>
            </div>

        </div>
    )
}



export default View;