import axios from "axios"
import { useParams } from "react-router-dom";
import { React,useEffect,useState} from "react";
import MainPage from "./mainpage";


const View =()=>{  
   const [article1,setArticle1] = useState([]);

   const {id} = useParams();

   useEffect(()=>{
    axios.get(`http://localhost:8082/${id}`).then(res=>setArticle1(res.data));
   });

return(
        <div className='article-div'>
            <MainPage></MainPage>
           
            <div className='post-form'>
            <form method='post' className='post-page' >
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
                <button type='submit' className='submit'>Accept</button>                    
            </form>
            </div>

        </div>
    )
}



export default View;