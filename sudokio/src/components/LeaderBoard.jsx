import { useEffect, useState } from 'react'
import './LeaderBoard.css'  
import LeaderBoardListElement from './LeaderBoardListElement';
import closeLight from '../assets/close-light.svg'
import closeDark from '../assets/close-dark.svg'

function LeaderBoard({allUsers,setAllUsers,setIsLeaderBoardClicked,currentUser,hudRef,theme}){
    const [isTotal , setIsTotal] = useState(false);

    useEffect(()=>{
        if(isTotal==true){
            let tempAllUsers = [...allUsers].sort((a,b)=>b.totalScore - (a.totalScore));
            setAllUsers(tempAllUsers);
        }else{
            let tempAllUsers = [...allUsers].sort((a,b)=>b.todayScore - (a.todayScore));
            setAllUsers(tempAllUsers);
        }
    },[isTotal])

    return (
        <>
            <div className="leaderBoardBackDrop">
                <div className="leaderBoardWrapper">
                    <div className="topOfLeaderBoard">
                        <div className="totalSelector">
                            <div className="todayRanking" onClick={()=>{setIsTotal(false)}} style={{backgroundColor:(isTotal)?'var(--primary-color)':'var(--secondary-color)'}}>
                                today
                            </div>
                            <div className="sepratorSelector">
                            </div>
                            <div className="overAllRanking" onClick={()=>{setIsTotal(true)}} style={{backgroundColor:(!isTotal)?'var(--primary-color)':'var(--secondary-color)'}}>
                                all time
                            </div>
                        </div>
                        <div className="closeLeaderBoardBtn" onClick={()=>{setIsLeaderBoardClicked(false);hudRef.current.style.visibility = 'visible'}}>
                               {(theme=='light')? <img src={closeLight} alt="close" height={40} width={40} /> : <img src={closeDark} alt="close" height={40} width={40} />  }
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