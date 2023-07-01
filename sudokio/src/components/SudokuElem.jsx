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
                    style={{backgroundColor:
                    //   elem.fixed ?( (currX !=-1 && currY!=-1) &&((currX == rowind) || (currY==colind) || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                    //   && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3)))))?('var(--secondary-hover-color)')
                    //  :( "var(--temp-secondary-color)") :
                    
                        ((currX==rowind && currY==colind))?'var(--temp-secondary-color)'
                     : (hovered)? (elem.fixed==true)?"var(--hover-color)":"var(--extra-hover-color)" 
                     : ((currX !=-1 && currY!=-1) &&((currX == rowind  && currY!=colind) 
                     || (currY==colind && currX!=rowind) 
                     || (((rowind >= (currX - currX%3)) && (rowind< (currX - currX%3) + 3)) 
                     && ((colind >= (currY - currY%3)) && (colind< (currY - currY%3) + 3))))) ? "var(--hover-color)" 
                     : elem.style ,
                     color:(elem.fixed==false || currX==rowind && currY==colind)?'var(--text-color)':'var(--secondary-text-color)' ,
                     fontWeight:(elem.fixed==true)?'400':'600',
                     fontSize:(elem.fixed==true)?'large':'larger',
                     // borderStyle:(currX==rowind && currY==colind)?'dashed':'',
                    // borderColor:(currX==rowind && currY==colind)?'var(--target-color)': ((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':'',
                    borderTopColor:(currX==rowind && currY==colind)?'var(--target-color)':((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':((rowind==3 || rowind == 6 ))?'var(--sudoku-border-color)':'',
                    borderLeftColor:(currX==rowind && currY==colind)?'var(--target-color)': ((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':((colind==3 || colind==6))?'var(--sudoku-border-color)':'',
                    borderRightColor : (currX==rowind && currY==colind)?'var(--target-color)': ((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':'',
                    borderBottomColor : (currX==rowind && currY==colind)?'var(--target-color)': ((currX==rowind && currY==colind) || (currVal!=0 && currVal==elem.val))?'var(--text-color)':''
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