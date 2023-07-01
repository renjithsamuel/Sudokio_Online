    import { useEffect, useRef, useState } from "react";
    import SelectElem from "../components/SelectElem";
    import SudokuElem from "../components/SudokuElem";
    import { LoginSocialGoogle} from "reactjs-social-login";
    import './sudokuGame.css';
    import LeaderBoard from "../components/LeaderBoard";
    import UserAccountScreen from "../components/UserAccountScreen";
    import googleImg from "../assets/google.png" ;
    import leaderBoardImgLight from '../assets/leaderBoard-light.svg'
    import leaderBoardImgDark from '../assets/leaderBoard-dark.svg'
    import darkMode from '../assets/darkMode.svg'
    import lightMode from '../assets/lightMode.svg'
    import pauseLight from '../assets/pause-light.svg'
    import pauseDark from '../assets/pause-dark.svg'
    import playLight from '../assets/play-light.svg'
    import playDark from '../assets/play-dark.svg'
    import submitLight from '../assets/submit-light.svg'
    import submitDark from '../assets/submit-dark.svg'
    import resetLight from '../assets/reset-light.svg'
    import resetDark from '../assets/reset-dark.svg'
    import clearLight from '../assets/clear-light.svg'
    import clearDark from '../assets/clear-dark.svg'


    function SudokuGame(){
        
        // global variables 
        const hudRef = useRef();
        const sudoku = useRef();
        const [board, setBoard] = useState([]);
        const [currX ,  setCurrx] = useState(-1);
        const [currY ,  setCurry] = useState(-1);
        const [currVal , setCurrVal] = useState(-1);
        const [isValid ,  setIsValid] = useState(true);
        const [currentUser,setCurrentUser] = useState({});
        const [allUsers,setAllUsers] = useState([]);
        const [oauthData,setOauthData] = useState({});
        const [isLeaderBoardClicked,setIsLeaderBoardClicked] = useState(false);
        const [isUserAccClicked,setIsUserAccClicked] = useState(false);
        const [nowGameScore,setNowGameScore] = useState(0);
        const [heart,setHeart] = useState(3);
        const [gameStarted,setGameStarted] = useState(false);
        const [gameOver,setGameOver] = useState(false);
        const [todayGameWon,setTodayGameWon] = useState(false);
        const [gameTimer , setGameTimer ] = useState({hours : 0 , minutes : 0 , seconds : 0});
        const [timerInterval, setTimerInterval] = useState(null);
        const [isConnected, setIsConnected] = useState(false);
        const [theme , setTheme] = useState('dark');
        let today = '';
        
        const sendHTTPRequest = async (url , method , data) =>{
            let returnData = null;
            await fetch(url , {
                method : method,
                body : JSON.stringify(data),
                headers : {'content-Type' : 'application/json'}  
            }).then((response)=>{return response.json()}).then((response)=>returnData = response).catch((err)=>console.log("cannot retrive data!",err));
            return returnData;
        } 

        // initializing game
        useEffect( () => {
            connectToServer();
            getLeaderBoard();
            async function boardCreator(){
                // const getTimeApi = `http://worldtimeapi.org/api/timezone/Asia/Kolkata`;
                // let dateApiData = await sendHTTPRequest(getTimeApi,'GET');
                // console.log(dateApiData);
                today = new Date().toLocaleDateString('en-US',{day : 'numeric' , month : "short",year : "numeric"});
                // console.log(today);
                // sudokuGame();
                const isBoardAvail = await fetchBoard(today); 
                if(isBoardAvail===false){console.log('entering sudoku game'); sudokuGame();}
            }
            boardCreator();   
            
            // setInterval(async () => {
            //     const updateTimerUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
            //     let updatedTimer = await sendHTTPRequest(updateTimerUrl , `PATCH` , {timer : gameTimer , todayBoard : board});
            //     console.log(updatedTimer);
            //     if(updatedTimer && updatedTimer.success==false){
            //         console.log("something went wrong while updating timer!");
            //     }else if(updatedTimer &&  updatedTimer.success==true){
            //         console.log("timer updated successfully!");
            //     }else{
            //         console.log("something else went wrong");
            //     }
            // }, 20000);

        }, []);


        // handling side effects
        useEffect(()=>{ 
            const loginUser = async () => {
                // if(currentUser!=null)return;
                // if(sessionStorage.getItem('emailId')!=null)return;
                // console.log("inside login user : ");
                // console.log(oauthData);
                if(oauthData.name == null || oauthData.email==null) { console.log("oauth data not found!");return;}
                localStorage.setItem('username' , oauthData.name);
                localStorage.setItem('emailId',oauthData.email);
                localStorage.setItem('userImgLink',oauthData.picture);

                const getCurrentUserUrl = `https://sudokionode.onrender.com/api/v1/getCurrentUser`;
                const postCurrentUserUrl = `https://sudokionode.onrender.com/api/v1/postUser`;
                const currentUserObj = {emailId : oauthData.email , username : oauthData.name , userImgLink : oauthData.picture };
                // console.log(currentUserObj);
                const tempCurrentUser = await sendHTTPRequest(getCurrentUserUrl,'POST',currentUserObj);
                // console.log(tempCurrentUser);
                if(tempCurrentUser && tempCurrentUser.success==true){
                    setCurrentUser(tempCurrentUser.data);
                    localStorage.setItem('userId',tempCurrentUser.data._id)
                }else if(tempCurrentUser.error == 'cannot find user! or something went wrong!'){
                    const postNewUser = await sendHTTPRequest(postCurrentUserUrl,'POST',currentUserObj);
                    if(postNewUser.success == true){
                        setCurrentUser(postNewUser.data);
                        localStorage.setItem('userId',postNewUser.data._id)
                        console.log("User posted succesfully!");
                    }else{
                        console.log("something went wrong while posting new user!");
                    }
                }else{
                    console.log("some unknown server error occured!");
                }
            }
            loginUser();
        },[oauthData]);


        useEffect(()=>{
            console.log("all users  " , allUsers );
            console.log("currentusers  " , currentUser );
            if(localStorage.getItem('emailId')!=null || currentUser==null){
                console.log('setting current user~ ',allUsers.filter((elem)=> elem.emailId == localStorage.getItem('emailId'))[0]);
                setCurrentUser(()=>{return (allUsers.filter((elem)=> elem.emailId == localStorage.getItem('emailId')))[0]});
            }else if(localStorage.getItem('emailId')==null ){
                setCurrentUser(null);
            }
        },[allUsers]);
        
        useEffect(()=>{            
            if(JSON.stringify(currentUser)!='{}' && currentUser!=undefined){
                // console.log("currentusers inside currentuser timer  " , currentUser );
                 setGameTimer(currentUser.timer);
                 setHeart(currentUser.heart);
                 setTheme(currentUser.theme);
                 document.documentElement.setAttribute('data-theme', currentUser.theme);
                //  console.log("today game won : " , todayGameWon);
                 setTodayGameWon(currentUser.todayGameWon);
                 setGameOver(currentUser.gameOverToday);
                 if(JSON.stringify(currentUser.todayBoard)!='[]'){
                 setBoard(currentUser.todayBoard);
                }
            }
            if(currentUser!=null)localStorage.setItem('userId',currentUser._id)
        },[currentUser]);



        //  numpad listeners   
        useEffect(() => {
            if(currX==-1 || currY==-1)return;
            const handleKeyPress = (e) => {
                // console.log(isNaN(e.key));
                let s = e.key;
                console.log(s);
                if(s=='ArrowRight' || s=='ArrowUp' || s=='ArrowDown' || s=='ArrowLeft'){
                    updateArrowKeyFun(s);
                    return;
                }
                if(s=='Enter'){incrementXY(currX,currY);return;}
                if (!(isNaN(s))) {
                    console.log("ere");
                    updateCurrElemVal(parseInt(s), currX, currY);
                }
            };
            window.addEventListener('keyup', handleKeyPress);

            return () => {
                window.removeEventListener('keyup', handleKeyPress);
            };
        }, [currX,currY]);

        // escape and enter button listeners
        useEffect(() => {

            const handleEscapeKeyPress = (e) => {
                let s = e.key;
                if (s=='Escape') {
                    setCurrx(-1);setCurry(-1);setCurrVal(-1);
                    if(isLeaderBoardClicked==false && isUserAccClicked==false)return;
                    if(isLeaderBoardClicked==true) setIsLeaderBoardClicked(false);
                    if(isUserAccClicked==true) setIsUserAccClicked(false);
                    hudRef.current.style.visibility = 'visible';
                    
                }
            };
            window.addEventListener('keyup', handleEscapeKeyPress );

            return () => {
                window.removeEventListener('keyup', handleEscapeKeyPress);
            };
        }, [isLeaderBoardClicked,isUserAccClicked]);

        // countDownTimer 
        useEffect(()=>{
                const countDownTimerFunction = ()=>{
                        if (gameStarted ==  false) {
                            clearInterval(timerInterval);
                            return;
                        }
                        const intervalId = setInterval(() => {
                        let timer = gameTimer;
                        timer.seconds+=1;
                        if(timer.seconds==60){
                            timer.seconds = 0;
                            timer.minutes += 1;
                            if(timer.minutes==60){
                                timer.hours = 1;
                                timer.minutes = 0;
                                timer.seconds = 0;
                            }
                        }
                        setGameTimer({
                            hours : timer.hours,
                            minutes : timer.minutes,
                            seconds : timer.seconds
                        });
                        if (timer.hours == 1) {
                            clearInterval(timerInterval);
                            setGameStarted(false);
                            console.log("game time is over!");   
                            alert('Game Over'); 
                            setGameOver(true);
                            updateGameOver();
                        }
                    }, 1000 );
                    setTimerInterval(intervalId);
                }
            countDownTimerFunction();
            return () => {
                clearInterval(timerInterval);
              };
        },[gameStarted]);


        useEffect(()=>{
            updateHeart(heart);
            if(heart==0){
                setGameStarted(false);
                setGameOver(true);
                updateGameOver();
                alert('Game Over')
            }
        },[heart]);

        useEffect(()=>{
            if(JSON.stringify(currentUser)=='{}')return;
            updateTheme();
        },[theme]);

        // small functions for various online competitive game environment
        const fetchBoard = async (date) => {
            // console.log(date);
            const getBoardUrl = `https://sudokionode.onrender.com/api/v1/getBoard`;
            let tempBoard = await sendHTTPRequest(getBoardUrl,'POST',{date : date});
            if(tempBoard && tempBoard.success==true){
                let newBoardData = tempBoard.data.board;
                setBoard(newBoardData);
                return true;
            }
            return false;
        }

        const postNewBoard = async (newBoard) => {
            console.log("posting new board!");
            const postBoardUrl =  `https://sudokionode.onrender.com/api/v1/postBoard`;
            console.log("inside post" , newBoard);
            let postResponse = await sendHTTPRequest(postBoardUrl,'POST',{
                board : newBoard,
                date : today
            });
            if(postResponse.success == false){
                console.log("Something went wrong while posting!");
            }else{
                console.log("board posted successfully!");
            }
            console.log("getting leaderboard!");
            getLeaderBoard();
        }

        const resetBoard = async ()=>{
            setBoard((prevBoard)=>{
                return prevBoard.map((arr)=>{
                    return (arr).map(e=>{
                        if(e.fixed==false)return  { fixed : false, val: 0 }; 
                        return e;
                    })
                })
            });

            // reset the board in the backend: 
            const updateBoardUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
            let updatedBoard = await sendHTTPRequest(updateBoardUrl , `PATCH` , { todayBoard : []});
            if(updatedBoard && updatedBoard.success==false){
                console.log("something went wrong while updating timer!");
            }else if(updatedBoard &&  updatedBoard.success==true){
                console.log("timer updated successfully!");
            }else{
                console.log("something else went wrong");
            }
            setIsValid(true);
        };

        const logOut = ()=>{
            if(isLeaderBoardClicked==true)setIsLeaderBoardClicked(false);
            if(isUserAccClicked==true)setIsUserAccClicked(false);
            setCurrentUser(null);
            hudRef.current.style.visibility  = 'visible';
            localStorage.clear();
            setGameOver(false);
            setGameTimer({hours:0,minutes:0,seconds:0});
            setHeart(3);
            setGameStarted(false);
            resetBoard();
        }

        const connectToServer = async ()=>{
            const getHealthApi = `https://sudokionode.onrender.com/api/v1/health`;
            const res = await sendHTTPRequest(getHealthApi,`GET`);
            if(res && res.success==true){
                console.log("returning true!");
                setIsConnected(true);
            }
        }

        
        const getLeaderBoard = async ()=>{
                const getAllUsersUrl = `https://sudokionode.onrender.com/api/v1/getUsers`;
                const tempAllUsers = await sendHTTPRequest(getAllUsersUrl , 'GET');
                console.log(tempAllUsers);
                if(tempAllUsers && tempAllUsers.success==true){
                    setAllUsers(tempAllUsers.data);
                }else{
                    console.log("Something went wrong while fetching all users!");
                    return;
                }
        }


        const updateRanking = async ()=>{
            // todayRanking
            const sortedByTodayRank = allUsers.sort((a,b)=>b.todayScore - a.todayScore);
            let updatedAllUsers;
            allUsers.map((user)=>{
                updatedAllUsers =  sortedByTodayRank.map((sortedUser,index)=>{
                    if(user.emailId == sortedUser.emailId){
                        user.todayRanking = index+1;
                        return user;
                    }
                })
            })
            const sortedByTotalRank = allUsers.sort((a,b)=>b.totalScore - a.totalScore);
            allUsers.map((user)=>{
                updatedAllUsers =  sortedByTotalRank.map((sortedUser,index)=>{
                    if(user.emailId == sortedUser.emailId){
                        user.totalRanking = index+1;
                        return user;
                    }
                })
            })
            const updateRankingUrl = `https://sudokionode.onrender.com/api/v1/patchManyUsers`;
            const updatedTodayRankingResponse = await sendHTTPRequest(updateRankingUrl , 'PATCH' , updatedAllUsers);
            if(updatedTodayRankingResponse.success==true){
                console.log(updatedTodayRankingResponse);
                console.log("ranking updated successfully!");
            }else{
                console.log("something went wrong while updating ranking!");
            }
        }

        const updateStats = async (updatePlayerStats) => {
                    const patchCurrentUserUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
                    const updatedStatsResponse = await sendHTTPRequest(patchCurrentUserUrl,'PATCH',updatePlayerStats);
                    console.log("at update stats function ",updatedStatsResponse);
                    if(updatedStatsResponse.success==true){
                        console.log("user stats updated successfully!");
                    }else{
                        console.log("something went wrong while updating user stats!");
                    }
        }

        const calculateScore = ()=>{
            let sum = 1;
            sum+=gameTimer.hours*60;
            sum+=gameTimer.minutes;
            sum+=(gameTimer.seconds/60);
            sum=Math.floor(sum);
            let currentScore = Math.floor((heart*500)/sum);
            console.log("current score ",currentScore);
            setNowGameScore(currentScore);
            return currentScore;
        }

        const updateHeart = async (heart) => {
            if(currentUser==null)return;
            const  updateHeartUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
            const updatedHeart = await sendHTTPRequest(updateHeartUrl , 'PATCH' , {heart : heart});
            console.log(updatedHeart , "here");
            if(updatedHeart &&  updatedHeart.success == true){
                console.log("heart updated successfully");
            }else{
                console.log("something went wrong while updating heart!");
            }
        }

        const updatePausedGame = async ()=> {
            if(currentUser==null){ setGameStarted(!gameStarted); return;};
            if(todayGameWon)
            {
                alert("You have already won today's Game!");
                return;
            }else if(gameOver){
                alert("Your chances have finished for today! try again tomorrow!");
                return;
            }else{
                 setGameStarted(!gameStarted);
                    const updateTimerUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
                    console.log( "inside update paused game : " ,  board);
                    let updatedTimer = await sendHTTPRequest(updateTimerUrl , `PATCH` , {timer : gameTimer , todayBoard : board});
                    console.log(updatedTimer);
                    if(updatedTimer && updatedTimer.success==false){
                        console.log("something went wrong while updating timer!");
                    }else if(updatedTimer &&  updatedTimer.success==true){
                        console.log("timer updated successfully!");
                    }else{
                        console.log("something else went wrong");
                    }
            } 
        }

        const updateGameOver = async ()=>{
            if(gameStarted!=false)setGameStarted(false);
            const updateGameOverUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
            let updatedGameOver = await sendHTTPRequest(updateGameOverUrl , `PATCH` , {gameOverToday : true});
            console.log(updatedGameOver , "here2", heart);
            if(updatedGameOver && updatedGameOver.success==false){
                console.log("something went wrong while updating game over!");
            }else if(updatedGameOver &&  updatedGameOver.success==true){
                console.log("update Game Over updated successfull!");
            }else{
                console.log("something else went wrong");
            }
            updateHeart(0);
        }

        const updateTheme = async ()=>{
                const updateThemeUrl = `https://sudokionode.onrender.com/api/v1/patchUserById/${currentUser._id}`;
                let updatedTheme = await sendHTTPRequest(updateThemeUrl , `PATCH` , {theme : theme});
                console.log(updatedTheme);
                if(updatedTheme && updatedTheme.success==false){
                    console.log("something went wrong while updating Theme!");
                }else if(updatedTheme &&  updatedTheme.success==true){
                    console.log("updated Theme successfull!");
                }else{
                    console.log("something else went wrong");
                }
        }

        const submitFunc = async () => {
            if(true)console.log("isValid at listen : " , isValid);
            let flag = 0;
            if(verifySudoku(flag))
            {
                alert('Congratulations! You won the game');
                setGameStarted(false);
                let tempNowGameScore = calculateScore();
                setTodayGameWon(true);
                console.log("sc " , tempNowGameScore);
                let totsc = currentUser.totalScore + tempNowGameScore;
                const updatePlayerStats = {
                    numberOfGamesPlayed : currentUser.numberOfGamesPlayed+1,
                    totalScore : totsc,
                    todayScore : tempNowGameScore,
                    todayGameWon : true,
                    heart : heart,
                    timer : gameTimer,
                }
                console.log("stats" , updatePlayerStats);
                updateStats(updatePlayerStats)
                .then(()=> setCurrentUser(null))
                .then(()=> getLeaderBoard())
                .then(()=> updateRanking())
                .catch((err)=>console.log(err  , " while updating ranking!"));               
            }
            else {alert('try again!');}
            setIsValid(true);
        }


        const resetFunc =  ()=>{
            if( confirm("Are you sure!")==true){
            resetBoard();
            }else return;
        }

        const toggleTheme = () => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        };

        const clearCurrVal = ()=>{
            if(gameStarted==false)return;
            if(currX==-1 || currY==-1 || currVal==0 || board[currX][currY].fixed==true){
                setCurrx(-1);
                setCurry(-1);
                setCurrVal(-1);
                return;}
            board[currX][currY].val = 0;
            setBoard(board);
            setCurrx(-1);
            setCurry(-1);
            setCurrVal(-1);
        }

        
        const updateCurrElemVal = (newVal,x,y)=>{  
            if(newVal.toString()=='NaN')return
            if(gameStarted==false || x==-1 || y==-1)return;   
            // console.log(newVal , x, y );
            if( x!=-1 && y!=-1 && board[x][y].fixed==false){
                if(isSafe(board,x,y,newVal)==false){
                    if(heart>0)
                    setHeart(heart-1);
                }
                board[x][y].val = newVal;
                setBoard([...board]);
            }
            incrementXY(x,y);
        }

        const incrementXY = (currX, currY) => {
            let newx = currX;
            let newy = currY;
          
            do {
              newy++;
              if (newy > 8) {
                newy = 0;
                newx++;
                if (newx > 8) newx = 0;
              }
            } while ((board[newx][newy].fixed || board[newx][newy].val!=0) && !(currX === newx && currY === newy));
          
            setCurrx(newx);
            setCurry(newy);
            setCurrVal(board[newx][newy].val);
          };

        //   navigate with arrow keys
          const updateArrowKeyFun = (s) => {
            let newx = currX;
            let newy = currY;
          
            if (s === 'ArrowRight') {
              newy++;
              if (newy > 8) {
                newy = 0;
                newx++;
                if (newx === 9) {
                  newx = 8;
                  newy = 8;
                }
              }
            } else if (s === 'ArrowLeft') {
              newy--;
              if (newy < 0) {
                newy = 8;
                newx--;
                if (newx < 0) {
                  newx = 0;
                  newy = 0;
                }
              }
            } else if (s === 'ArrowUp') {
              newx--;
              if (newx < 0) {
                newx = 8;
                newy--;
                if (newy < 0) {
                  newy = 0;
                  newx = 0;
                }
              }
            } else if (s === 'ArrowDown') {
              newx++;
              if (newx > 8) {
                newx = 0;
                newy++;
                if (newy > 8) {
                  newy = 8;
                  newx = 8;
                }
              }
            }
          
            setCurrVal(board[newx][newy].val);
            setCurrx(newx);
            setCurry(newy);
          };
          
    // board generation logics
        const generateRandomValue = () => Math.floor(Math.random() * 9) + 1;
        // function to generate random numbers
        function r(a){
            return Math.floor(Math.random() * a) ;
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
                    if(Solve(board,row,col+1)){return true;}
                    
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
            newBoard[1][3] = { val: generateRandomValue(), fixed: true };
            newBoard[3][1] = { val: generateRandomValue(), fixed: true };          
            newBoard[2][6] = { val: generateRandomValue(), fixed: true };          
            newBoard[6][2] = { val: generateRandomValue(), fixed: true };          
            newBoard[4][4] = { val: generateRandomValue(), fixed: true };          
            newBoard[5][7] = { val: generateRandomValue(), fixed: true };          
            newBoard[7][5] = { val: generateRandomValue(), fixed: true };          
            newBoard[8][8] = { val: generateRandomValue(), fixed: true };          
            // Solve the Sudoku puzzle
            Solve(newBoard, 0, 0);
            console.log('printing sudoku board : ');
            setBoard(newBoard);
            for(let i=0;i<(newBoard.length*newBoard[0].length)/2;i++){
                    let x = r(9);
                    let y = r(9);
                    if(newBoard[x][y].val==0)i--;
                    else{
                        newBoard[x][y]={val:0,fixed:false};
                    }
                }
            // posting the newly genereated board:
            postNewBoard(newBoard);
          }

        // Partially solved sudoku generated
        
        // function that finally verifies the users gameplay
        const verifySudoku =  (flag) => {
            console.log(board.length);
            if(flag==0)
            {for(let i=0;i<board.length && !flag;i++){
                for(let j=0;j<board[0].length && !flag;j++){
                    let val = board[i][j].val;
                    if(val==0 || isfinalSafe(board,i,j,val)==false )
                    {
                        flag = 1;
                        return false;
                    }
                }
            }
            flag = 1;
            return true;}
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
                {(isLeaderBoardClicked==true)?<LeaderBoard allUsers={allUsers} setIsLeaderBoardClicked={setIsLeaderBoardClicked} currentUser={localStorage.getItem('username')} hudRef={hudRef} theme={theme}/>:''}
                {(isUserAccClicked==true)?<UserAccountScreen user={currentUser} setIsUserAccClicked={setIsUserAccClicked} logOut={logOut} hudRef={hudRef} theme={theme}/>:''}
                <div className="navBar">
                    <h1>Sudoku</h1>
                    <div className="online">
                        {(currentUser==null || currentUser==undefined)?
                            <div className="loginWithGoogle">
                            <LoginSocialGoogle
                                        client_id={import.meta.env.VITE_SUDOKIO_CLIENTID}
                                        scope="openid profile email"
                                        discoveryDocs="claims_supported"
                                        access_type="offline"
                                        onResolve={({ provider, data }) => {
                                            // console.log(provider);
                                            console.log(data);
                                            setOauthData(data);
                                        }}
                                        onReject={(err) => {
                                            console.log(err);
                                        }}
                                    >
                                <div className="googleBtn"><img src={googleImg} alt="google" height={30} width={30} /><span id="loginWord">Login</span></div>
                            </LoginSocialGoogle>
                        </div>
                        :
                            <div className="userAccBtn" onClick={()=>{if(isLeaderBoardClicked==true){setIsLeaderBoardClicked(false);}setIsUserAccClicked(true);hudRef.current.style.visibility = 'hidden'}}>
                                <img src={localStorage.getItem('userImgLink')} alt="user" height={50} width={50} />
                            </div>        
                        }
                        <div className="leaderBoard" onClick={()=>{if(isUserAccClicked==true){setIsUserAccClicked(false);}setIsLeaderBoardClicked(true);hudRef.current.style.visibility = 'hidden';}}> 
                            {(theme=='light')?<img src={leaderBoardImgLight} alt="leaderBoard" height={40} width={40} />
                            : <img src={leaderBoardImgDark} alt="leaderBoard" height={40} width={40} /> }    
                        </div>
                        <div className="darkMode" onClick={()=>{toggleTheme()}}>
                            {
                                (theme=='dark')?<img src={darkMode} alt="dark" height={40} width={40} /> 
                                              :  <img src={lightMode} alt="light" height={40} width={40} />    
                            }
                        </div>
                    </div>
                </div>

                {(isConnected)? '' : <h3>Connecting to server!</h3>}

                <div className="hud" ref={hudRef}>
                        <div className="hudLeft" >
                            <div className="timer" > {gameTimer.hours +  " : " + gameTimer.minutes + " : " + gameTimer.seconds} </div>
                        </div>
                        <div className="hudRight" >
                            <div className="heart"  style={{display:(heart>=1)?'flex':'none'}}></div>
                            <div className="heart"  style={{display:(heart>=2)?'flex':'none'}}></div>
                            <div className="heart" style={{display:(heart==3)?'flex':'none'}}></div>
                        </div>
                </div>
                <div className="pagewrap">
                    <div className="left">
                        <div className="sudokubox" ref={sudoku}>
                                {board.map((row, rowIndex) => (
                                    row.map((elem, colIndex) => (
                                        <SudokuElem 
                                        key={`${rowIndex}-${colIndex}`}
                                        elem={elem} 
                                        rowind={rowIndex}
                                        colind={colIndex}
                                        currX={currX}
                                        currY={currY}
                                        currVal={currVal}
                                        style={(currX==rowIndex && currY==colIndex)?'var(--extra-hover-color)':'var(--primary-color)'}
                                        onclick={()=>{             
                                            setCurrx(rowIndex);
                                            setCurry(colIndex);
                                            setCurrVal(elem.val);
                                            }}
                                        />
                                        ))
                                    ))}
                            <div className="pauseCover" style={{display:(isConnected)?(gameStarted)?'none':'flex':'none'}} onClick={()=>{updatePausedGame();}}>
                                {(theme=='light')?<img src={pauseLight} alt="paused" height={50} width={50} />
                                                    :  <img src={pauseDark} alt="paused" height={50} width={50} />}
                            </div>
                        </div>
                    </div>

                    <div className="middle">
                        <div className="controlElem" onClick={()=>{updatePausedGame();}}>
                            {(gameStarted)?
                            // pause buttons
                            (theme=='light')?<img src={pauseLight} alt="pause" height={38} width={38} />
                                            : <img src={pauseDark} alt="pause" height={38} width={38} />
                            : 
                            // playButtons
                            (theme=='light')?<img src={playLight} alt="play" height={38} width={38} />
                            : <img src={playDark} alt="play" height={38} width={38} />
                            }
                        </div>
                        <div className="controlElem" onClick={()=>{resetFunc()}}>
                            {(theme=='light')?<img src={resetLight} alt="reset" height={38} width={38} />
                                            : <img src={resetDark} alt="reset" height={38} width={38} />
                            }
                        </div>
                        <div className="controlElem"  onClick={()=>{submitFunc()}}>
                            {(theme=='light')?<img src={submitLight} alt="submit" height={38} width={38} />
                                            : <img src={submitDark} alt="submit" height={38} width={38} />
                            }
                        </div>
                        <div className="controlElem"  onClick={()=>{clearCurrVal()}}>
                            {(theme=='light')?<img src={clearLight} alt="clear" height={45} width={45} />
                                            : <img src={clearDark} alt="clear" height={45} width={45} />
                            }
                        </div>
                    </div>
                    
                        <div className="right">
                            {Array.from({ length: 9 }, (_, i) => (
                                <SelectElem 
                                key={i} 
                                val={i + 1}
                                onclick = {()=>{       
                                    if( currX!=-1 && currY!=-1 && board[currX][currY].fixed==false){
                                        if(isSafe(board,currX,currY,i+1)==false){
                                            if(heart>0)
                                            setHeart(heart-1);
                                        }
                                        board[currX][currY].val = i+1;
                                        setBoard(board);
                                    }
                                    // setCurrx(-1);setCurry(-1);setCurrVal(-1);
                                    incrementXY(currX,currY);
                                    }
                                 }
                                />
                            ))}
                        </div>
                </div>
            </>
        )
    }

    export default SudokuGame;
