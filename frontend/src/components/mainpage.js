import React from'react';
import {Link} from 'react-router-dom';

//this basically the navigation bar, that can redirect you to the requested page
function MainPage(){
    return(
        <div className='nav-div'>
            <div className='link'>
            <Link to='/' style={{textDecoration:'none',color:'white'}}>Home</Link>
            </div>
            <div className='link'>
            <Link to='/articles' style={{textDecoration:'none',color:'white'}}>Submit An Article</Link>
            </div>
            <div className='link'>
            <Link to='/search' style={{textDecoration:'none',color:'white'}}>Search For an Article</Link>
            </div>
            <div className='link'>
            <Link to='/list' style={{textDecoration:'none',color:'white'}}>Admin</Link>
            </div>
            <div className='link'>
            <Link to='/analyser/articles' style={{textDecoration:'none',color:'white'}}>Analyser</Link>
            </div>
        </div>

    )
}


//this piece of UI is going to be displayed in every page, which  mean this is a children component for every other components

export default MainPage;