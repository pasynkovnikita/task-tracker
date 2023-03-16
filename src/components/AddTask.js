import {useState} from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const handleFormSubmit = (e) => {
        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, date, reminder})

        setText('')
        setDate('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleFormSubmit(e);
            return false;
        }}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' name={'task'} placeholder='Add Task' value={text} onInput={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='text' name={'date'} placeholder='Add Date' value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className='form-control-check'>
                <label>SetReminder</label>
                <input type='checkbox' name={'reminder'} checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <button className='btn btn-block' type='submit'>Save</button>
        </form>

    );
}

export default AddTask