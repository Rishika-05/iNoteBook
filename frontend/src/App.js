import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import NoteContext from './context/notes/NoteContext';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
