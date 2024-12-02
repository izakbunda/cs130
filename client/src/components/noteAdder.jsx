import React, {useState} from "react";

export const NoteAdder = ({addNote}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        addNote(value);
        // clear form after submission
        setValue('');
        };

    return (
        <form onSubmit={handleSubmit} className="TaskAdder">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="TaskInputAdder" placeholder='Note name' />
            <button type="submit" className='TaskAddButton'>Add Note</button>
       </form>
    )
}