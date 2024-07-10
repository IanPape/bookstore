import React, { useState } from 'react';
import MadlibForm from './MadlibForm';
import MadlibStory from './MadlibStory';

function Madlib() {
    const [story, setStory] = useState('');
    const [showStory, setShowStory] = useState(false);

    function handleSubmit(inputs) {
        const storyText = `Today I went to the zoo. I saw a ${inputs.adjective} ${inputs.noun} jumping up and down in its tree. It moved through the large tunnel that led to its ${inputs.adjective2} ${inputs.noun2}. I got some peanuts and passed them through the cage to a gigantic gray ${inputs.noun2} towering above my head. Feeding that animal made me hungry. I went to get a ${inputs.color} scoop of ice cream. It filled my stomach. Afterwards, I had to rush to catch our bus. When I got home, I thanked my mom for a fun day at the zoo.`;
        setStory(storyText);
        setShowStory(true);
    };
    
    return (
        <div>
            <h1>Madlib Game</h1>
            {!showStory ? (
                <MadlibForm onSubmit={handleSubmit} />
            ) : (
                <MadlibStory story={story} />
            )}
        </div>
    );
}

export default Madlib;
