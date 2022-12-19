import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path={['/tv', '/movie/:movieId']}>
            <Tv />
          </Route>
          <Route path={['/search', '/movie/:movieId']}>
            <Search />
          </Route>
          <Route path={['/', '/movie/:movieId']}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
