import React, { useState } from "react";

function SudokuElem({elem,onclick,style,currX,currY,rowind,colind}) {
      const [hovered, setHovered] = useState(false);

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    return ( <> 
            <div className="elem" 
                    style={{backgroundColor:elem.fixed ?((currX == rowind) || (currY==colind) || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                      && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3))))?('var(--secondary-hover-color)')
                     :( "var(--secondary-color)") 
                     :(style=='var(--extra-hover-color)' || (currX==rowind && currY==colind))?'var(--extra-hover-color)'
                     : (hovered||(currX == rowind  && currY!=colind) 
                     || (currY==colind && currX!=rowind) 
                     || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                     && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3)))) ? "var(--hover-color)" 
                     : elem.style , color: 'var(--text-color)' ,
                    borderColor: (currX==rowind && currY==colind)?'var(--text-color)':'',
                    // scale :((currX == rowind) || (currY==colind) || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                    // && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3))))?'1.05':'' ,
                    // zIndex :  ((currX == rowind) || (currY==colind) || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                    // && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3))))?'5':'1'
                    }}
              onClick={onclick}
              onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
              >
                   { (elem.val==0)?'':elem.val}
            </div>
        </> );
}

export default SudokuElem;