
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTasks } from "../slices/taskSlice";
import axios from "axios";
import { logout } from "../slices/authSlice";
import TaskItem from "./TaskItem";


function Dashboard(){
  const [newTask, setNewTask] = useState({title:'',description:''});
  const {token} = useSelector((state) => state.auth);
  const {tasks} = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchTasks = async ()=>{
      try {
        const res = await axios.get('http://localhost:5000/api/tasks',{headers:{Authorization:`Bearer ${token}`}}) ;
        dispatch(setTasks(res.data));
      } catch (error) {
        console.error('fetch error:',error);
      }
    }
    fetchTasks();
  },[token, dispatch]);

  const handleCreate = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks',newTask,{headers:{Authorization:`Bearer ${token}`}});
      dispatch(addTask(res.data));
      setNewTask({title:'',description:''});
    } catch (error) {
      console.error('create error:',error);
    }
  };

  const handleLogout = ()=>{
    dispatch(logout());
    axios.post('http://localhost:5000/api/auth/logout',{withcredentials: true});
  }

  return(
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Task Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mb-4">Logout</button>
      <form onSubmit={handleCreate} className="mb-4 flex gap-2">
        <input name="title" value={newTask.title} onChange={(e)=>setNewTask({...newTask,title:e.target.value})} placeholder="Title" className="border p-2 flex-1"/>
        <input name="description" value={newTask.description} onChange={(e)=>setNewTask({...newTask,description:e.target.value})} placeholder="Description" className="border p-2 flex-1"/>
        <button type="submit" className="bg-green-500 text-white p-2">Add Task</button>
      </form>
      <ul className="space-y-2">
        {tasks.map(task=>(<TaskItem key={task._id} token={token}/>))}
      </ul>
    </div>
  );
}

export default Dashboard;
