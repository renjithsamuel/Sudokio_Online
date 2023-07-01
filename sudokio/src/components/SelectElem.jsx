import React, { useState } from "react";

function SelectElem({val,onclick,remVal}) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
    return (
         <>
            <div className="selem" style={{backgroundColor:(hovered)?'var(--cover-color)':'var(--primary-color)'}} onClick={onclick}
            
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="selemVal">{val}</div>
            <div className="selemRemVal" style={{fontSize:'medium',color:'(--secondary-text-color)',}}>{remVal}</div>
        </div>
    </> );
}

export default SelectElem;