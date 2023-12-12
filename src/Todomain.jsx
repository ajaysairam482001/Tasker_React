import React, { useEffect, useState } from "react";
import styles from "./todomain.css";
import taskContext from "./Context/TaskContext";
import { useNavigate } from "react-router-dom";
import Task from './Task';
import TaskRender from "./TaskRender";
const Todomain = ()=>{

    const navigate = useNavigate();

    const [newItem,setnewItem] = useState([]); //acts like a formdata

    const [Input,setInput] = useState(""); //for inputfield

    const [tasks,settasks] = useState(JSON.parse(localStorage.getItem('taskslist')) || []); //the main const to store objs

    const handleInputChange = (e)=>{
        setInput(e.target.value);
        setnewItem({
            taskid : Math.floor(Math.random()*1000),
            tasktitle : e.target.value.trim(),
            tasktime : new Date().toLocaleString(),
            status : false
        });
    }

    const addItem = ()=>{
        if(newItem.tasktitle == ""){
            alert("Enter task");
            return;
        }

        settasks((items) => [...items, newItem]);
        setInput("");
        setnewItem({
            taskid: 0,
            tasktitle: "",
            tasktime: "",
            status: false,
          });
    }

    useEffect(()=>{
        if(tasks){
        localStorage.setItem("taskslist",JSON.stringify(tasks));
        }
    },[tasks]);

    const handleSignout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    }
    

    return<>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossOrigin="anonymous"
    />

    <div className="container">
        <ul class="nav justify-content-end nav-pills p-3 mb-3 navi">
            <li class="nav-item">
            <a class="nav-link active btn " 
                aria-current="page" 
                onClick={handleSignout}
                style={{backgroundColor:"red"}}>Sign-Out</a>
            </li>
        </ul>   
        <div className="title"><h2>To-Do List</h2></div>

        <div class="row mt-3 mb-3"
            style={{display:"flex",
                    justifyContent:"space-around",
                    width:"70%",
                    marginLeft:"17%"}}
        >
                <input type="text" class="form-control todoinput"
                    style={{width:"80%"}}
                    onChange={handleInputChange}
                    value={Input}
                    onKeyPress={(e) => {
                        e.key === "Enter" && addItem();
                    }}
                />
                <button className="col-2 btn btn-primary" onClick={addItem}>Enter</button>        
        </div>
        <div>
            <taskContext.Provider value={{tasks , settasks}}>
                <TaskRender/>
            </taskContext.Provider>
        </div>
        
        
    </div>
    </>
}
export default Todomain;