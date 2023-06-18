import { useEffect } from "react";
import './LeaderBoardListElement.css'

function LeaderBoardListElement({username , ranking , score,currentUser}){

    return (
        <>
            <div className="leaderBoardListWrapper" style={{backgroundColor:(currentUser==username)?'rgb(97, 97, 188)':'rgba(240, 248, 255, 0.858)'}}>
                <div className="username">
                    {username}
                </div>
                <div className="separatorListLeaderBoard"></div>
                <div className="ranking">
                    {ranking}
                </div>
                <div className="separatorListLeaderBoard"></div>
                <div className="score">
                    {score}
                </div>
            </div>
        </>
    )
}

export default LeaderBoardListElement;