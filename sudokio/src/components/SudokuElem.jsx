import React, { useState } from "react";

function SudokuElem({elem,onclick,style}) {
      const [hovered, setHovered] = useState(false);

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    return ( <> 
            <div className="elem" style={{backgroundColor:elem.fixed ? "var(--secondary-color)" : (hovered||style=='var(--hover-color)') ? "var(--hover-color)" : elem.style , color: 'var(--text-color)'}}
              onClick={onclick}
              onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
              >
                   { (elem.val==0)?'':elem.val}
            </div>
        </> );
}

export default SudokuElem;