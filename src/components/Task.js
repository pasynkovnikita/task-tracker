import {FaRegTrashAlt} from "react-icons/fa";

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaRegTrashAlt cursor='pointer' onClick={() => onDelete(task.id)}/></h3>
            <p>{task.date}</p>
        </div>
    );
}

export default Task