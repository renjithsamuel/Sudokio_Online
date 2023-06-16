import React, { forwardRef, useEffect, useRef, useState } from "react";

function SudokuElem({elem,onclick,style}) {
      const [hovered, setHovered] = useState(false);

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    return ( <> 
            <div className="elem" style={{backgroundColor:elem.fixed ? "var(--fixed-color)" : (hovered||style=='var(--hover-color)') ? "var(--hover-color)" : elem.style}}
              onClick={onclick}
              onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
              >
                   { elem.val}
            </div>
        </> );
}

export default SudokuElem;