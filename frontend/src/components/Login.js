import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){
  const [formData, setFormData] = useState({username:'',password: ''});
  const [error,setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
   };

   const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',formData,{withCredentials: true});
      dispatch(setCredentials({token: res.data.token}));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
   };

   return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl mb-4">Login</h2>
        <input name="username" onChange={handleChange} placeholder="Username" className="border p-2 mb-2 w-full"/>
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 mb-2 w-full"/>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 rounded text-white p-2 w-full hover:bg-blue-600">Login</button>
         <button 
        type="button" 
        onClick={() => navigate('/register')} 
        className="bg-gray-500 rounded text-white p-2 w-full hover:bg-gray-600 mt-2"
      >
        Register
      </button>
      </form>
    </div>
   );
}

export default Login;
