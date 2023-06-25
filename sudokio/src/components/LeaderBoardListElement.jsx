import './LeaderBoardListElement.css'

function LeaderBoardListElement({username , ranking , score,currentUser}){

    return (
        <>
            <div className="leaderBoardListWrapper" style={{backgroundColor:(currentUser==username)?'var(--secondary-color)':'var(--primary-color)'}}>
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