import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTask,deleteTask } from "../slices/taskSlice";

function TaskItem({task , token}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({title: task.title,description:task.description,completed: task.completed});
  const dispatch = useDispatch();

  const handleUpdate = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`,editData,{headers:{Authorization:`Bearer ${token}`}});
      dispatch(updateTask(res.data));
      setIsEditing(false);
    } catch (error) {
      console.log('Update error:',error);
    }
  };

  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`,{headers:{Authorization: `Bearer ${token}`}});
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error('Delete error:',error);
    }
  };

  const handleShare = async () =>{
    const sharedUserId = prompt('Enter user ID to share with:');
    if(sharedUserId){
      try {
        const res = await axios.post(`http://localhost:5000/api/tasks/${task._id}/share`,{sharedUserId},{headers:{Authorization: `Bearer ${token}`}});
        dispatch(updateTask(res.data));
      } catch (error) {
        console.error('Share error:',error);
      }
    }
  };

  return(
    <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex gap-2 flex-1">
          <input name="title" value={editData.title} onChange={(e)=> setEditData({...editData,title:e.target.value})} className="border p-1 flex-1"/>
          <input name="description" value={editData.description} onChange={(e)=> setEditData({...editData,description:e.target.value})} className="border p-1 flex-1"/>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={editData.completed}
              onChange={(e)=> setEditData({...editData,completed:e.target.checked})}
            />
            Completed
          </label>
          <button type="submit" className="bg-blue-500 text-white p-1"> Save</button>
          <button type="button" onClick={()=>setIsEditing(false)} className="bg-gray-500 text-white p-1"> Cancel</button>
        </form>
      ):(
        <div className="flex gap-2 items-center flex-1">
          <span className={task.completed ? 'line-through': ''}>{task.title}-{task.description}</span>
          <span>{task.completed ? 'done' : 'pending'}</span>
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={()=> setIsEditing(true)} className="bg-gray-500 text-white p-1">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-1">Delete</button>
        <button onClick={handleShare} className="bg-green-500 text-white p-1">Share</button>
      </div>

    </li>
  )
}

export default TaskItem;