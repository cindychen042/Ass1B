import './App.css';
import Articles from './components/articleSubmit';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import DisplayArticles from './components/articleDisplay';
import SercAnalyser from './components/sercanalyser';
import SearchArticles from './components/searchArticles';

function App() {
  return (
    <div>
    <Router>
      <Routes>
      <Route exact path='articles' element={<Articles/>}></Route>
      <Route exact path='/' element={<DisplayArticles></DisplayArticles>}></Route>
      <Route exact path='search' element={<SearchArticles></SearchArticles>}></Route>
      <Route exact path='analyser/articles/:id' element={<SercAnalyser></SercAnalyser>}></Route>
      <Route exact path='analyser/articles' element ={<SercAnalyser></SercAnalyser>}></Route>
      </Routes>
      </Router>
   
      </div>
  );
}

export default App;
