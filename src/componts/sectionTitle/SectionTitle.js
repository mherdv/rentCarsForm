import React from 'react';

const SectionTitle = (props) => {
    return (
        
            <legend><span className="icon">{props.number}</span> {props.title}</legend>
        
    );
}

export default SectionTitle;