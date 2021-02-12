import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import Users from './components/Users';

function App() {
  return (
    <Router>

    <Navbar />

      <div className="container p-4">
      
            <Switch>

             <Route  path="/about" component={About} />
            <Route  path="/" component={Users} />
              

            </Switch>

      </div>
     

    </Router>
  );
}

export default App;
