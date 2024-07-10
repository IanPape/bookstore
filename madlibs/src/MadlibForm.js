import React, { useState } from 'react';

function MadlibForm({ onSubmit }) {
    const [inputs, setInputs] = useState({
        adjective: '',
        noun: '',
        noun2: '',
        adjective2: '',
        color: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="adjective" placeholder="Adjective" value={inputs.adjective} onChange={handleChange} />
            <input type="text" name="noun" placeholder="Noun" value={inputs.noun} onChange={handleChange} />
            <input type="text" name="noun2" placeholder="Noun2" value={inputs.noun2} onChange={handleChange} />
            <input type="text" name="adjective2" placeholder="Another Adjective" value={inputs.adjective2} onChange={handleChange} />
            <input type="text" name="color" placeholder="Color" value={inputs.color} onChange={handleChange} />
            <button type="submit">Create Story</button>
        </form>
    );
}

export default MadlibForm;
