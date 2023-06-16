    import { useEffect, useRef, useState } from "react";
    import SelectElem from "../components/SelectElem";
    import SudokuElem from "../components/SudokuElem";
    import { GoogleLoginButton } from "react-social-login-buttons";
    import { LoginSocialGoogle} from "reactjs-social-login";
    import './sudokuGame.css';

    function SudokuGame(){
        
        // global variables 
        // const selems = useRef();
        // const elems = useRef();
        const submitbtn = useRef();
        const resetbtn = useRef();
        const sudoku = useRef();
        const [board, setBoard] = useState([]);
        const [currX ,  setCurrx] = useState(0);
        const [currY ,  setCurry] = useState(0);

        useEffect(() => {
            sudokuGame();
            // submit and reset buttons
            let eventlist2 = submitbtn.current.addEventListener('click',()=>{
                if(verifySudoku()==true){alert('Congratulations! You won the game'); sudoku.innerHTML=''   ;sudokuGame();}
                else alert('try again!');   
            })
            
            let eventlist3 = resetbtn.current.addEventListener('click',()=>{
                if( confirm("Are you sure!")==true){
                    sudoku.innerHTML=''   ;
                    sudokuGame();
                }else return;
            })
            
            return () => {
            removeEventListener('click',eventlist2);
            removeEventListener('click',eventlist3);
            }
        }, [])
        
        const generateRandomValue = () => Math.floor(Math.random() * 9) + 1;

        
        // function to generate random numbers
        function r(a){
            return Math.floor(Math.random() * a) + 1;
        }

        // function to check the positional correctness
        function isSafe(board , row, col, val){
            for(let i=0;i<board.length;i++){
                if(board[i][col].val==val)return false;
            }
            for(let i=0;i<board[0].length;i++){
                if(board[row][i].val==val)return false;
            }
            for(let i=row-row%3;i<(row-row%3)+3;i++){
                for(let j=col-col%3;j<(col-col%3)+3;j++){
                    if(board[i][j].val==val)return false;
                }
            }
            return true;
        }


        // backtracking function that solves the puzzle
        function Solve( board, row, col){
            console.log("inside solve fun : ");
            if(row==board.length-1 && col==board[0].length)return true;
            if(col==board[0].length){row++;col=0;}
            if(board[row][col].val!=0)return Solve(board,row,col+1);
            for(let i=1;i<=board.length;i++){
                let obj = new Object({
                    val : i,
                    fixed : true
                })  
                if(isSafe(board,row,col,i)){
                    board[row][col] = obj;
                    if(Solve(board,row,col+1)){printBoard(board);return true;}
                    
                }
                board[row][col] = { val: 0, fixed: false };
            }
            return false;
        }


        // main function that does all the sub functions
        function sudokuGame() {
            const newBoard = Array.from({ length: 9 }, (_, i) =>
              Array.from({ length: 9 }, (_, j) => ({
                val: 0,
                fixed: false,
              }))
            );
            newBoard[0][0] = { val: generateRandomValue(), fixed: true };
            newBoard[8][8] = { val: generateRandomValue(), fixed: true };          
            // Solve the Sudoku puzzle
            Solve(newBoard, 0, 0);
            console.log('printing sudoku board : ');
            printBoard(newBoard);
            setBoard(newBoard);
          
            // Skip the randomization step for some elements
            for(let i=0;i<(newBoard.length*newBoard[0].length)/2;i++){
                    let x = r(8);
                    let y = r(8);
                    if(newBoard[x][y]==0)i--;
                    else{
                        newBoard[x][y]={val:0,fixed:false};
                    }
                }
          }

        // Partially solved sudoku generated
        
        // function that finally verifies the users gameplay
        function verifySudoku(){
            for(let i=0;i<board.length;i++){
                for(let j=0;j<board[0].length;j++){
                    let val = board[i][j].val;
                    if(isfinalSafe(board,i,j,val)==false)return false;
                }
            }
            return true;
        }

        function isfinalSafe(board , row, col, val){
            for(let i=0;i<board.length;i++){
                if( i!=row && board[i][col].val==val)return false;
            }
            for(let i=0;i<board[0].length;i++){
                if(i!=col && board[row][i].val==val)return false;
            }
            for(let i=row-row%3;i<(row-row%3)+3;i++){
                for(let j=col-col%3;j<(col-col%3)+3;j++){
                    if(!(i==row && j==col) && board[i][j].val==val)return false;
                }
            }
            return true;
        }

        // function to print the sudoku
        function printBoard( board){
            for(let i=0;i<board.length;i++){
                let str = "";
                for(let j=0;j<board[0].length;j++){
                    str+=board[i][j].val + " ";
                }
                console.log(str);
            }
        }
    


        return  (
            <>
                <h1>Sudoku</h1>
                <LoginSocialGoogle
                            client_id={"765286335673-0ida964dqmv0obr3ilg7rjb0b6b0anr3.apps.googleusercontent.com"}
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({ provider, data }) => {
                                console.log(provider, data);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >
                    <GoogleLoginButton  />
                    
                </LoginSocialGoogle>
                <div className="pagewrap">
                    <div className="left">
                        <div className="sudokubox" ref={sudoku}>
                            {
                                board.map((row, rowIndex) => (
                                    row.map((elem, colIndex) => (
                                    <SudokuElem 
                                     key={`${rowIndex}-${colIndex}`}
                                     elem={elem} 
                                     style={(currX==rowIndex && currY==colIndex)?'var(--hover-color)':'var(--change-color)'}
                                     onclick={()=>{             
                                        setCurrx(rowIndex);
                                        setCurry(colIndex);
                                        }}
                                    />
                                    ))
                                ))
                            }

                        </div>
                        <div className="btns">
                            <div className="submitbtn" ref={submitbtn}>
                                submit
                            </div>
                            <div className="resetbtn" ref={resetbtn}>
                                reset
                            </div>
                        </div>
                    </div>
                    
                        <div className="right">
                            {Array.from({ length: 9 }, (_, i) => (
                                <SelectElem 
                                key={i} 
                                val={i + 1}
                                onclick = {()=>{           
                                    if(board[currX][currY].fixed==false &&  currX!=0 && currY!=0){
                                    board[currX][currY].val = i+1;
                                    setBoard(board);
                                }
                                setCurrx(0);setCurry(0)}}
                                />
                            ))}
                        </div>
                </div>
            </>
        )
    }

    export default SudokuGame;
