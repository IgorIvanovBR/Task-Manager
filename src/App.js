import React, {useState} from 'react';
import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function TaskManager() {
    const [newTask, setNewTask] = useState('')
    const [newDesk, setNewDesk] = useState('')
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(1);

    function handleNewTask(e) {
      e.preventDefault()
        setNewTask(e.target.value)

    }

    function handleNewDesk(e) {
        e.preventDefault()
        setNewDesk(e.target.value)
    }

    function addNewTask(e){
        e.preventDefault()
        if (newTask  === '' )return
        else if (newDesk === '')return
        setCount(count + 1)
        setTasks([...tasks, {id: Date.now(), number: count, task: newTask, desk: newDesk}])
        console.log(newTask, newDesk)
    }

    function removeTask(id){
        setCount(count - 1)
       setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
            <div className="wrapper">
                <div className="form-wrap">
                    <form onSubmit={addNewTask}>
                        <input type="text" placeholder="Task Name" onChange={handleNewTask} />
                        <input type="text" placeholder="Task Description" onChange={handleNewDesk}/>
                        <input type="button" value="Add Task" className="btn btn-success" onClick={addNewTask}/>
                        <input type="button" value="X" className="btn btn-danger"/>
                    </form>
                </div>
                <h1>Easy Tasks</h1>
                <table className="tasks-table">
                    <tbody>
                    <tr>
                        <td>Number</td>
                        <td>Task Name</td>
                        <td>Task Description</td>
                        <td>X</td>
                    </tr>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                         <td>{task.number}</td>
                            <td>{task.task}</td>
                            <td>{task.desk}</td>
                            <td><input type="button" value='X' className="btn btn-danger" onClick={()=> removeTask(task.id)}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
}

export default TaskManager;
