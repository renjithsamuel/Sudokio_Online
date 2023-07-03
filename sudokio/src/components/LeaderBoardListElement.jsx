import './LeaderBoardListElement.css'

function LeaderBoardListElement({username , ranking , score,currentUser,elem,clickedUser,setClickedUser }){

    const handleClickedUser = ()=>{
        console.log(elem);
        console.log(clickedUser);
        if(JSON.stringify(clickedUser)!='{}'){
            setClickedUser({});
        }else{
            console.log("here");
            setClickedUser(elem);
        }
    }

    return (
        <div  onClick={()=>{handleClickedUser()}}>
            
            {(clickedUser && elem && clickedUser.username === elem.username)?
                 (<div className="clickedWrapper">
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft"> username  </div><div className="clickedUserRight">  {elem.username}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">over all ranking </div> <div className="clickedUserRight">  #{clickedUser.overallRanking}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">total score </div> <div className="clickedUserRight">   {clickedUser.totalScore}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">today ranking </div> <div className="clickedUserRight">  {clickedUser.todayRanking}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">today score </div>  <div className="clickedUserRight">   {clickedUser.todayScore}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">sudoku's cleared </div><div className="clickedUserRight">  {clickedUser.numberOfGamesPlayed}</div>
                            </div>
                            <div className="clickedUserListItem">
                                <div className="clickedUserLeft">streak  </div><div className="clickedUserRight">  {clickedUser.streak}</div>
                            </div>
                    </div>)
                :   

                (<div className="unclickedWrapper">
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
                </div>)

            }
        </div>
    )
}

export default LeaderBoardListElement;