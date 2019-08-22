import React from 'react';

const SectionTitle = (props) => {
    return (
        <div>
            <legend><span className="number">{props.number}</span> {props.title}</legend>
        </div>
    );
}

export default SectionTitle;