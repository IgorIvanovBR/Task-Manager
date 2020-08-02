import React, {useState} from 'react';
import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import envelope from './media/envelope.png'
import plus from './media/plus.png'
import remove from './media/remove.png'


function TaskManager() {
    const [newTask, setNewTask] = useState('')
    const [newDesk, setNewDesk] = useState('')
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(1);

    function  addTask() {
      document.getElementById('form-wrapper').classList.toggle('visible')
    }



    function handleNewTask(e) {
      e.preventDefault()
        setNewTask(e.target.value)

    }

    function handleNewDesk(e) {
        e.preventDefault()
        setNewDesk(e.target.value)
    }

    function addNewTask(){

        if (newTask  === '' ) {
            return
        } else if (newDesk === '') {
            return
        }
        if (localStorage.getItem('tasks') == null) {
            setCount(count + 1)
            setTasks([...tasks, {id: Date.now(), number: count, task: newTask, desk: newDesk}])
            localStorage.setItem('tasks', JSON.stringify({id: Date.now(), number: count, task: newTask, desk: newDesk}))
            console.log({id: Date.now(), number: count, task: newTask, desk: newDesk})
            document.getElementById('form-wrapper').classList.toggle('visible')
        }
        else {
            setCount(count + 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            setTasks([...tasks, {id: Date.now(), number: count, task: newTask, desk: newDesk}])
            document.getElementById('form-wrapper').classList.toggle('visible')
        }
    }

    function removeTask(id){
        setCount(count - 1)
       setTasks(tasks.filter((task) => task.id !== id))
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }

    return (
            <div className="container">
                <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8 main-wrapper ">
                <div className="form-wrap visible" id="form-wrapper">
                    <form onSubmit={addNewTask}>
                        <input type="text" placeholder="Task Name" onChange={handleNewTask} /><br/>
                        <input type="text" placeholder="Task Description" onChange={handleNewDesk}/><br/>
                        <input type="button" value="Add Task" className="btn btn-success" onClick={addNewTask}/>
                        <input type="button" value="X" onClick={addTask}  className="btn btn-danger"/>
                    </form>
                </div>
                <h1 className="heading">Easy Tasks</h1>
                <input type="button" onClick={addTask} value="Add Task" className="addTaskButton"/>
                <table className="tasks-table">
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td><img src={envelope} width="24" height="24" alt="letter"/></td>
                        <td>Task Name</td>
                        <td>Task Description</td>
                        <td>X</td>
                    </tr>
                    {tasks.map((task) =>(
                        <tr key={task.id}>
                         <td>{task.number}</td>
                            <td><img src={envelope} width="24" height="24" alt="letter"/></td>
                            <td>{task.task}</td>
                            <td>{task.desk}</td>
                            <td><input type="button"  value='X' className="btn btn-danger" onClick={()=> removeTask(task.id)}/></td>
                        </tr>
                    ))
                    }

                    </tbody>
                </table>
                </div>
            <div className="col-md-2"> </div>
                </div>
            </div>
        );
}

export default TaskManager;
