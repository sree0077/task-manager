import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='./register' element={<Register/>}/>
      <Route path='./login' element={<Login/>}/>
      <Route path='./register' element={<PrivateRoute><Register/></PrivateRoute>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>
   </Router>
  );
}

export default App;
