import { useEffect, useState } from 'react'
import './LeaderBoard.css'  
import LeaderBoardListElement from './LeaderBoardListElement';
import closeLight from '../assets/close-light.svg'
import closeDark from '../assets/close-dark.svg'

function LeaderBoard({allUsers,setAllUsers,setIsLeaderBoardClicked,currentUser,hudRef,theme}){
    const [isTotal , setIsTotal] = useState(false);
    const [leaderBoardCount,setLeaderBoardCount] = useState(0);
    const [clickedUser,setClickedUser] = useState({});


    useEffect(()=>{
        if(isTotal==true){
            let tempAllUsers = [...allUsers].sort((a,b)=>a.overallRanking - (b.overallRanking));
            let tempCount = 0;
            tempAllUsers.map((user)=>{if(user.totalScore!=0)tempCount++;})
            setLeaderBoardCount(tempCount);
            setAllUsers(tempAllUsers);
        }else{
            let tempAllUsers = [...allUsers].sort((a,b)=>a.todayRanking - (b.todayRanking));
            let tempCount = 0;
            tempAllUsers.map((user)=>{if(user.todayScore!=0)tempCount++;})
            setLeaderBoardCount(tempCount);
            setAllUsers(tempAllUsers);
        }
    },[isTotal]);

    return (
        <>
            <div className="leaderBoardBackDrop">
                <div className="leaderBoardWrapper">
                    <div className="topOfLeaderBoard">
                        <div className="totalSelector">
                            <div className="todayRanking" onClick={()=>{setIsTotal(false)}} style={{backgroundColor:(isTotal)?'var(--primary-color)':'var(--secondary-color)'}}>
                                Today
                            </div>
                            <div className="sepratorSelector">
                            </div>
                            <div className="overAllRanking" onClick={()=>{setIsTotal(true)}} style={{backgroundColor:(!isTotal)?'var(--primary-color)':'var(--secondary-color)'}}>
                                All time
                            </div>
                        </div>
                        <div className="closeLeaderBoardBtn" onClick={()=>{setIsLeaderBoardClicked(false);hudRef.current.style.visibility = 'visible'}}>
                               {(theme=='light')? <img src={closeLight} alt="close" height={40} width={40} /> : <img src={closeDark} alt="close" height={40} width={40} />  }
                        </div>
                    </div>
                    <div className="leaderBoardListsWrapper">
                    <LeaderBoardListElement username={'Username'} ranking={'Ranking'} score={'Score'} />
                    {(isTotal)?
                        (leaderBoardCount==0)? 
                            <div className="nothingToDisplay">
                                No Data To Display!
                            </div>    :
                        allUsers.map((elem,index)=>{
                                if(elem.totalScore!=0){
                                return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.overallRanking} score={elem.totalScore} currentUser={currentUser} elem={elem} clickedUser={clickedUser} setClickedUser={setClickedUser}/>
                                }
                            })
                    :
                        (leaderBoardCount==0)? 
                            <div className="nothingToDisplay">
                                No One Has Started Yet !
                            </div>    :
                                allUsers.map((elem,index)=>{
                                    if(elem.todayScore!=0){
                                        return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.todayRanking} score={elem.todayScore}  currentUser={currentUser} elem={elem}  clickedUser={clickedUser} setClickedUser={setClickedUser}/>
                                    }
                                })
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaderBoard;