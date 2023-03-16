import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {useState, useEffect} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'


function App() {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        // Get tasks from the server
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:4000/tasks')
        const data = await res.json()

        return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    // AddTask
    const addTask = async (task) => {
        const res = await fetch(`http://localhost:4000/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    // Tasks
    const deleteTask = async (id) => {
        await fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'DELETE',
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'PUT', headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !data.reminder} : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Routes>
                    <Route path='/'
                           element={
                               <>
                                   {showAddTask && <AddTask onAdd={addTask}/>}
                                   {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}
                                                              onToggle={toggleReminder}/> : 'You have no tasks at the moment'}
                               </>}
                    />
                    <Route path='/about' element={<About/>} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
