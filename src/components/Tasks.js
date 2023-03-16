import Task from "./Task";
import {useEffect} from "react";

const Tasks = ({tasks, onDelete, onToggle}) => {
    useEffect(() => {
        console.log(tasks)
    }, [tasks])
    return (
        <>
            {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    );
}

export default Tasks