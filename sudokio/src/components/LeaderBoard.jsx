import { useEffect, useState } from 'react'
import './LeaderBoard.css'  
import LeaderBoardListElement from './LeaderBoardListElement';
import closeLight from '../assets/close-light.svg'
import closeDark from '../assets/close-dark.svg'

function LeaderBoard({allUsers,setAllUsers,setIsLeaderBoardClicked,currentUser,hudRef,theme}){
    const [isTotal , setIsTotal] = useState(false);

    const [clickedUser,setClickedUser] = useState({});


    useEffect(()=>{
        if(isTotal==true){
            let tempAllUsers = [...allUsers].sort((a,b)=>a.overallRanking - (b.overallRanking));
            setAllUsers(tempAllUsers);
        }else{
            let tempAllUsers = [...allUsers].sort((a,b)=>a.todayRanking - (b.todayRanking));
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
                    <LeaderBoardListElement username={'Username'} ranking={'Ranking'} score={'Score'} />
                    {(isTotal)?
                        allUsers.map((elem,index)=>{
                                if(elem.totalScore!=0){
                                return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.overallRanking} score={elem.totalScore} currentUser={currentUser} elem={elem} clickedUser={clickedUser} setClickedUser={setClickedUser}/>
                                }
                            })
                    :
                        allUsers.map((elem,index)=>{
                            if(elem.todayScore!=0){
                                return <LeaderBoardListElement key={index} username={elem.username} ranking={elem.todayRanking} score={elem.todayScore}  currentUser={currentUser} elem={elem}  clickedUser={clickedUser} setClickedUser={setClickedUser}/>
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default LeaderBoard;