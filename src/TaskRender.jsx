import React, { useContext } from "react";
import Task from "./Task";
import taskContext from "./Context/TaskContext";

const TaskRender = ()=>{
    const{ tasks } = useContext(taskContext);
    console.log(tasks);

    return<>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossOrigin="anonymous"
    />

    <div className="container-fluid">
        {tasks && tasks.length>0?(
            <>
            <hr />
            <div className="row gap-4">
                <div className="alert alert-danger col">
                    <b> Tasks waiting for you!</b>
                    <p>You have <b>{tasks.length}</b> tasks to do.</p>
                </div>
            </div>
            <h1 className="text-center">
                <i className="bi bi-list-task mx-2"></i>ALL TASKS
            </h1>
            <hr />
            <div className="allTasks" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                        {tasks.length > 0 &&
                            tasks.map((task, index) => {
                                return (
                                    <Task
                                        key={task.taskid}
                                        task={task}
                                        index={index}
                                    />
                                );
                            })}
                    </div>
            </>
        ):(<>
            <div className="alert alert-success">
                    <b>No tasks!</b>
                         <p>You have no tasks to do. That's great!</p>
                </div>
        </>)}
    </div>
    </>
}
export default TaskRender;