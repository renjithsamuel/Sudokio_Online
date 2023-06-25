import './UserAccountScreen.css';
import closeLight from '../assets/close-light.svg'
import closeDark from '../assets/close-dark.svg'
import logoutLight from '../assets/logout-light.svg'
import logoutDark from '../assets/logout-dark.svg'

function UserAccountScreen({user,setIsUserAccClicked,logOut,hudRef,theme}){
    return (<>
            <div className="userAccScreenBackDrop">
                <div className="UserAccScreenWrapper">
                    <div className="topOfUserAcc">
                        <div className="userWelcome">Hi {user.username}!</div>
                        <div className="controlsUser">
                            <div className="logoutBtn" onClick={()=>{logOut()}}>
                                  { (theme=='light')? <img src={logoutLight} alt="close" height={30} width={30} />
                                    : <img src={logoutDark} alt="close" height={30} width={30} />
                                  }
                            </div>
                            <div className="closeUserAccBtn" onClick={()=>{setIsUserAccClicked(false);hudRef.current.style.visibility = 'visible'}}>
                                   {(theme=='light')? <img src={closeLight} alt="close" height={40} width={40} />
                                      : <img src={closeDark} alt="close" height={40} width={40} />
                                   }
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
