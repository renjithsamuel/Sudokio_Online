import { useEffect, useState } from 'react'
import './LeaderBoard.css'  
import LeaderBoardListElement from './LeaderBoardListElement';
import cancelIcon from '../assets/cancel-icon.svg'

function LeaderBoard({allUsers,setIsLeaderBoardClicked,currentUser,hudRef}){
    const [isTotal , setIsTotal] = useState(false);

    useEffect(()=>{
        if(isTotal==true){
            allUsers.sort((a,b)=>a.overallRanking - (b.overallRanking));
        }else{
            allUsers.sort((a,b)=>a.todayRanking - (b.todayRanking));
        }
        console.log(allUsers);
    },[isTotal])

    return (
        <>
            <div className="leaderBoardBackDrop">
                <div className="leaderBoardWrapper">
                    <div className="topOfLeaderBoard">
                        <div className="totalSelector">
                            <div className="todayRanking" onClick={()=>{setIsTotal(false)}} style={{backgroundColor:(isTotal)?'rgb(97, 97, 188)':'rgb(68, 68, 167)'}}>
                                today
                            </div>
                            <div className="sepratorSelector">
                            </div>
                            <div className="overAllRanking" onClick={()=>{setIsTotal(true)}} style={{backgroundColor:(!isTotal)?'rgb(97, 97, 188)':'rgb(68, 68, 167)'}}>
                                all time
                            </div>
                        </div>
                        <div className="closeLeaderBoardBtn" onClick={()=>{setIsLeaderBoardClicked(false);hudRef.current.style.visibility = 'visible'}}>
                                <img src={cancelIcon} alt="close" height={40} width={40} />
                        </div>
                    </div>
                    <LeaderBoardListElement username={'username'} ranking={'ranking'} score={'score'} />
                    {(isTotal)?
                            allUsers.map((elem,index)=>{
                                return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.overallRanking} score={elem.totalScore} currentUser={currentUser} />
                            })
                    :
                        allUsers.map((elem,index)=>{
                            return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.todayRanking} score={elem.todayScore}  currentUser={currentUser}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default LeaderBoard;