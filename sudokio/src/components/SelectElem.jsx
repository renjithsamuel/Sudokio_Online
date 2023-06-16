import React, { forwardRef, useEffect, useRef, useState } from "react";

function SelectElem({val,onclick}) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
    return (
         <>
            <div className="selem" style={{backgroundColor:(hovered)?'var(--change-color)':'var(--border-color)'}} onClick={onclick}
            
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {val}
        </div>
    </> );
}

export default SelectElem;