import axios from "axios"
import { useParams, redirect} from "react-router-dom";
import { React,useEffect,useState} from "react";
import MainPage from "./mainpage";
import {FaStar} from "react-icons/fa";
import {API_ENDPOINT} from '../api/index.js'

const UserView =()=>{  
    const {id} = useParams();
   const [article1,setArticle1] = useState([]);
   const [ratingArticle,setratingArticle] = useState([]);
   const[rating,setRating] = useState();
   let [articleRate] = useState([]);

   useEffect(()=>{
    axios.get(`${API_ENDPOINT}/api/${id}/`).then(res=>setArticle1(res.data));
   },[id]);

   useEffect(()=>{
    axios.get(`${API_ENDPOINT}/search/userview/${id}`) 
    .then(res=>setratingArticle(res.data));
     } )

   const getRating= ()=>{
    axios.get(`${API_ENDPOINT}/search/userview/${id}`)
    .then(res=>setratingArticle(res.data));
    console.log(ratingArticle);
   }


   const ratingFunction = (value) =>{
        console.log(value);
        setRating(value);
        articleRate.splice(0, articleRate.length)
        articleRate.push(value);
     }

    const submitRate = ()=>{
        axios.post(`${API_ENDPOINT}/search/userview/${id}`,articleRate).then((res)=>{
            console.log(res.data);
            console.log("getting average....");
            getRating();
            axios.get(`${API_ENDPOINT}/search/userview/${id}`)
            .then(res=>setratingArticle(res.data));
            console.log(ratingArticle);
            setTimeout(()=>{
                redirect('/userview/:id')
            },3000)
        }).catch((e)=>{
            console.log(e.response.data)
        });
       
        
    }

return(
        <div className='article-div' >
            <MainPage></MainPage>
        
            <div className='post-form'>
            <form  className='post-page'  >
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
                <div>
                <label> Average Rating: {ratingArticle } </label>
                {[...Array({ratingArticle})].map((star,index)=>{
                    return (
                    <label>
                        <FaStar className = "star" size = {10} color = { "#ffc107"} />
                    </label>

                    );
                })}
                <h2>Rate the article </h2>
                {[...Array(5)].map((star,index)=>{
                    const rate = index+1;
                    return (
                    <label>
                        <input type = "radio" value={rate} onClick={()=>ratingFunction(rate)}/>
                        <FaStar className = "star" size = {40} color = {rate <=  rating ? "#ffc107" : "#e4e5e9"} />
                    </label>

                    );
                })}
            </div>            
            </form>
            </div>
            <button  onClick = {()=>submitRate()} className='rateSubmitButton'>Submit</button> 
        </div>
    )
}



export default UserView;