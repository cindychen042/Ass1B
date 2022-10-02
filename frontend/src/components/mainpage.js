import DisplayArticles from "./articleDisplay"
import Articles from "./articleSubmit";
import {Link} from 'react-router-dom';
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
        </div>

    )
}


//this piece of UI is going to be displayed in every page, which  mean this is a children component for every other components

export default MainPage;