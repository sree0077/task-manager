import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register(){
  const [formData,setFormData] = useState({username:'',password:''});
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register',formData);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Register failed');
    }
  };

  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl mb-4">Register</h2>
        <input name="username" onChange={handleChange} placeholder="Username" className="border p-2 mb-2 w-full"/>
        <input name="password" onChange={handleChange} placeholder="Password" className="border p-2 mb-2 w-full"/>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 mt-2">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register;