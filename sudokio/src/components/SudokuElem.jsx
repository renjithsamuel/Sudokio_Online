import React, { useState } from "react";

function SudokuElem({elem,onclick,style,currX,currY,rowind,colind,currVal}) {
      const [hovered, setHovered] = useState(false);

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    return ( <> 
            <div className="elem" 
                    style={{backgroundColor:elem.fixed ?( (currX !=-1 && currY!=-1) &&((currX == rowind) || (currY==colind) || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                      && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3)))))?('var(--secondary-hover-color)')
                     :( "var(--secondary-color)") 
                     :(style=='var(--extra-hover-color)' || (currX==rowind && currY==colind))?'var(--extra-hover-color)'
                     : (hovered)? "var(--hover-color)" 
                     : ((currX !=-1 && currY!=-1) &&((currX == rowind  && currY!=colind) 
                     || (currY==colind && currX!=rowind) 
                     || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                     && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3))))) ? "var(--hover-color)" 
                     : elem.style , color: 'var(--text-color)' ,
                    borderColor:(currX==rowind && currY==colind)?'var(--target-color)': ((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':'',
                    // borderStyle:(currX==rowind && currY==colind)?'dashed':'',

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