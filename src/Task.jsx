import React, { useContext, useEffect, useState } from "react";
import taskContext from "./Context/TaskContext";
import "./task.css";

const dateDifference = (date) => {
  if (new Date().getTime() - new Date(date).getTime() < 60000)
      // if the difference is less than a minute
      return "Just now";
  else if (new Date().getTime() - new Date(date).getTime() < 3600000)
      // if the difference is less than an hour
      return (
          Math.floor(
              (new Date().getTime() - new Date(date).getTime()) / 60000
          ) + "m ago"
      );
  else if (new Date().getTime() - new Date(date).getTime() < 86400000)
      // if the difference is less than a day
      return (
          // Hours and minutes
          Math.floor(
              (new Date().getTime() - new Date(date).getTime()) / 3600000
          ) +
          "h, " +
          Math.floor(
              ((new Date().getTime() - new Date(date).getTime()) % 3600000) /
                  60000
          ) +
          "m ago"
      );
  // if the difference is more than a day
  else
      return (
          // Days, hours and minutes
          Math.floor(
              (new Date().getTime() - new Date(date).getTime()) / 86400000
          ) +
          "d, " +
          Math.floor(
              ((new Date().getTime() - new Date(date).getTime()) % 86400000) /
                  3600000
          ) +
          "h, " +
          Math.floor(
              (((new Date().getTime() - new Date(date).getTime()) %
                  86400000) %
                  3600000) /
                  60000
          ) +
          "m ago"
      );
};

const Task = ({task})=>{
    const [isChecked, setIsChecked] = useState(task.status);
    const [tasktitle,settasktitle] = useState(task.tasktitle); 
    const { tasks , settasks } = useContext(taskContext);
    const [editmode,seteditmode] = useState(false);
    const [showDiff, setShowDiff] = useState(true);

    useEffect(() => {
        localStorage.setItem("taskslist", JSON.stringify(tasks));
    }, [tasks]);


    const handlestatusChange = (e)=>{
      setIsChecked(!isChecked);

      settasks((prevTasks) =>
        prevTasks.map((t) =>
            t.taskid === task.taskid
                ? { ...t, status: !isChecked }
                : t
        )
    );
    }
    
    const handleTitleChange = () => {
        settasks((prevTasks) =>
            prevTasks.map((t) =>
                t.taskid === task.taskid
                    ? { ...t, tasktitle: tasktitle }
                    : t
            )
        );
        seteditmode(false);
    };

    const handleDelete = () => {
        const updatedTasks = tasks.filter((t) => t.taskid !== task.taskid);
        settasks(updatedTasks);
        localStorage.setItem("taskslist", JSON.stringify(updatedTasks));
    };
    

   return<>
   <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossOrigin="anonymous"
    />

<div class="card " style={{width:'100%'}}>
  <div className='card-body'>
    {!editmode?(<h5 class="card-title">{tasktitle}</h5>
      ):(
        <div className="input-group">
            <input type='text'
                    onChange={(e)=>settasktitle(e.target.value)}
                    /><button className="btn btn-primary" onClick={()=>{
                      handleTitleChange();
                      seteditmode(false);
                      }}>Done</button>
        </div>
      )}
    
    <div class="form-check">
      <input class="form-check-input" 
             onChange={(e)=>handlestatusChange(e)} 
             type="checkbox" 
             value="" 
             id={`completedCheckbox-${task.id}`}
             checked={isChecked}/>
      <label class="form-check-label" for="completedCheckbox">
      {isChecked ? "Completed!" : "Pending..."}
      </label>
    </div>
    <div className={"taskTime align-self-end"}
         title={"This task was created " + dateDifference(task.tasktime)}>
                    {showDiff ? dateDifference(task.tasktime) : task.tasktime}
                    <i
                        onClick={() => setShowDiff(!showDiff)}
                        title={"Click to see " +
                            (showDiff ? "creation time" : "task age")
                        }
                        className="bi bi-clock-history mx-2"></i>
                </div>
    
      <button type="button" class="btn btn-primary" onClick={()=>seteditmode(true)}>Edit</button>
      <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
    
  </div>
</div>

    {/* <div class="card task visible my-3">
        <button class="btn btn-primary"
        ><svg style={{ marginBottom: '3px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg><span style={{ marginLeft: '8px' }}>Edit</span></button>
        
    </div> */}
   
   
    </>
}
export default Task;