import MainPage from "./mainpage";
import List from "./list";
import { useState,useEffect } from "react";

function ManageArticles(){


    return(
        <div>
            <MainPage></MainPage>
             <div className='post-form'>
        <h2>Articles submitted by users</h2>
        </div>
        <br></br>
        <List></List>
          </div>
          
        )
    }



export default ManageArticles;