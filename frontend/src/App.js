import './App.css';
import Articles from './components/articleSubmit';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import DisplayArticles from './components/articleDisplay';
import SercAnalyser from './components/sercanalyser';
import SearchArticles from './components/searchArticles';
import ManageArticles from './components/manageArticle';
import View from './components/view';
import UserView from './components/userview'

function App() {
  return (
    <div>

    <Router>
      <Routes>
      <Route exact path='articles' element={<Articles/>}></Route>
      <Route exact path='/' element={<DisplayArticles></DisplayArticles>}></Route>
      <Route exact path='search' element={<SearchArticles data-testid="child"></SearchArticles>}></Route>
      <Route exact path='list' element={<ManageArticles></ManageArticles>}></Route>
      <Route exact path='/list/view/:id' element={<View></View>}></Route>
      <Route exact path='analyser/articles/:id' element={<SercAnalyser></SercAnalyser>}></Route>
      <Route exact path='analyser/articles' element ={<SercAnalyser></SercAnalyser>}></Route>
      <Route exact path='/search/userview/:id' element ={<UserView></UserView>}></Route>
      <Route exact path='/userview/:id' element ={<UserView></UserView>}></Route>
      </Routes>
      </Router>
   
      </div>
  );
}

export default App;