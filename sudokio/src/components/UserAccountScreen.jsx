import { useEffect } from "react";
import './UserAccountScreen.css';
import cancelIcon from '../assets/cancel-icon.svg'
import logoutIcon from '../assets/logout-icon.svg'


function UserAccountScreen({user,setIsUserAccClicked,logOut,hudRef}){
    return (<>
            <div className="userAccScreenBackDrop">
                <div className="UserAccScreenWrapper">
                    <div className="topOfUserAcc">
                        <div className="userWelcome">Hi {user.username}!</div>
                        <div className="controlsUser">
                            <div className="logoutBtn" onClick={()=>{logOut()}}>
                                    <img src={logoutIcon} alt="close" height={30} width={30} />
                            </div>
                            <div className="closeUserAccBtn" onClick={()=>{setIsUserAccClicked(false);hudRef.current.style.visibility = 'visible'}}>
                                    <img src={cancelIcon} alt="close" height={40} width={40} />
                            </div>
                        </div>
                    </div>
                        <div className="userStatsList">
                            <div className="userListItem">
                                <div className="userLeft">email  </div><div className="userRight">  : {user.emailId}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">over all ranking </div> <div className="userRight"> :  #{user.overallRanking}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">total score </div> <div className="userRight">  : {user.totalScore}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">today ranking </div> <div className="userRight">  : {user.todayRanking}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">today score </div>  <div className="userRight"> :   {user.todayScore}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">sudoku's cleared </div><div className="userRight">  :  {user.numberOfGamesPlayed}</div>
                            </div>
                            <div className="userListItem">
                                <div className="userLeft">streak  </div><div className="userRight">  :  {user.streak}</div>
                            </div>
                        </div>
                </div>
            </div>
    </>)
}

export default UserAccountScreen;
