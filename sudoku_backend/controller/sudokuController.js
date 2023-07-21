    const Sudokos = require('../models/sudokos');
    const Users = require('../models/users');

    // Board controller
    exports.getBoard = async ( req , res , next ) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // headers.append('Access-Control-Allow-Credentials', 'true');
        if(req.body.date == null)return res.status(400).send("send valid date!");
        try {
            const board = await Sudokos.findOne({date : req.body.date});
            if(!board){
                return res.status(400).json({
                    success : false,
                    error : "cannot find document"
                })
            }
            return res.status(200).json({
                success : true,
                data  : board,
            })
        }catch(err){
            return res.status(500).json({
                success : false , 
                error : "Internal server error " + err 
            })
        }
    }

    // create board in 12 noon : 
    exports.postBoard = async (req,res,next) => {
        if(req.body.board==null || req.body.date==null)
            return res.status(400).json({
            success : false,
            error : "send correct values!"
        })
        try{
            const board = await Sudokos.create(req.body);
            if(board == null){
                return res.status(400).json({
                    success : false,
                    error : "something went wrong!"
                })
            }
            // updating streak and resetting user for today's game : 
            const users = await Users.find();
            try {
                    await Promise.all(users.map(async (user) => {
                        // Update todayRanking
                        await Users.updateOne(
                            { emailId: user.emailId },
                            {
                                $set: {
                                    streak: user.todayGameWon ? user.streak + 1 : 0 
                                }
                            }
                        );
                    }));
              } catch (error) {
                console.error(error);
            }

            await Users.updateMany({},{todayGameWon:false,todayScore:0,heart:3,timer:{hours:0,minutes:0,seconds:0},gameOverToday:false,todayBoard : []}); 

            return res.status(200).json({
                success : true,
                data : board,
                count : board.length
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error "+ err
            })
        }
    }

    // User controller
    exports.getUsers = async (req,res,next) =>{
        try{
            const users = await Users.find();
            if(!users){
                return res.status(400).json({
                    success : false ,
                    error : "Something went wrong!",
                })
            }
            return res.status(200).json({
                success : true ,
                data : users,
                count : users.length
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error "+ err
            })
        }
    }

    exports.getCurrentUser = async (req,res,next) =>{
        const emailId = req.body.emailId;
        const username = req.body.username;
        const userImgLink = req.body.userImgLink;
        if(emailId==null || username==null)return res.status(400).json({success : false , error : "send valid values to login!"})
        try { 
            const user = await Users.findOne({emailId : emailId , username : username});
            if(!user){
                return res.status(404).json({
                    success : false,
                    error : "cannot find user! or something went wrong!"
                })
            }
            return res.status(200).json({
                success : true,
                data : user
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error!" + err
            })
        }
    }

    exports.postUser = async (req,res,next) =>{
        if(req.body.username == null || req.body.emailId == null){
            return res.status(400).json({
                success : false,
                error : "send correct values!"
            })
        }
        try{
            const totalNumberOfUsers = await Users.estimatedDocumentCount();
            const obj = {
                username  : req.body.username,
                emailId : req.body.emailId , 
                todayScore : 0,
                totalScore : 0,
                numberOfGamesPlayed : 0,
                todayRanking : 0,
                overallRanking : totalNumberOfUsers,
                todayGameWon : false,
                heart : 3,
                timer : {hours : 0 , minutes : 0 , seconds : 0},
                streak :  0,
                gameOverToday : false,
                todayBoard : [],
                theme : 'dark'
            }
            const user = await Users.create(obj);
            if(!user){
                return res.status(400).json({
                    success : false,
                    error : "something went wrong "
                })
            }
            return res.status(200).json({
                success : true,
                data : user
            })
        }catch(err){
            return res.status(500).json({
                success: false ,
                error : "Internal server error ",err
            })
        }
    }


    exports.patchUser = async (req,res,next) =>{
        const Id = req.params.id;
        if(Id==null)return res.status(400).send("send valid id of user!");
        if(req.body.username==null && req.body.emailId==null && req.body.todayScore==null && req.body.totalScore==null && req.body.numberOfGamesPlayed==null && req.body.todayRanking ==null && req.body.overallRanking==null && req.body.todayGameWon == null && req.body.heart == null && req.body.timer == null && req.body.gameOverToday && req.body.todayBoard && req.body.theme){
            console.log("heree!");
            return res.status(400).json({
                success : false,
                error : "send any one valid data to update!"
            })
        }
        let flag = 0;
        if(req.body.heart==0){flag=1;}
        // console.log(req.body.heart);
        try{
            const userOldObj = await Users.findById(Id);
            const obj = {
                username  : req.body.username || userOldObj.username,
                emailId : req.body.emailId || userOldObj.emailId, 
                todayScore : req.body.todayScore || userOldObj.todayScore,
                totalScore : req.body.totalScore || userOldObj.totalScore,
                numberOfGamesPlayed : req.body.numberOfGamesPlayed || userOldObj.numberOfGamesPlayed,
                todayRanking : req.body.todayRanking || userOldObj.todayRanking,
                overallRanking : req.body.overallRanking || userOldObj.overallRanking,
                todayGameWon : req.body.todayGameWon || userOldObj.todayGameWon,
                heart : (flag==1)?0 : (req.body.heart|| userOldObj.heart),
                timer : req.body.timer || userOldObj.timer,
                streak : req.body.streak || userOldObj.streak,
                gameOverToday : req.body.gameOverToday || userOldObj.gameOverToday,
                todayBoard : req.body.todayBoard || userOldObj.todayBoard,
                theme : req.body.theme || userOldObj.theme
            }
            const user = await Users.findByIdAndUpdate(Id , obj, {new:true});
            if(!user){
                return res.status(400).json({
                    success : false,
                    error : "something went wrong!"                
                })
            }
            return res.status(200).json({
                success : true,
                data : user,
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error!" + err
            })
        }
    }

    exports.patchManyUsers = async (req, res, next) => {
        if (!Array.isArray(req.body)) {
          return res.status(400).json({
            success: false,
            error: "Send a valid response! Patching many requires an array of objects."
          });
        }
        try {
          const data = await Promise.all(req.body.map(async (user) => {
            // Update todayRanking
            const updatedTodayRanking = await Users.updateOne(
              { emailId: user.emailId },
              { $set: { todayRanking: user.todayRanking } }
            );
      
            // Update totalRanking
            const updatedOverallRanking = await Users.updateOne(
              { emailId: user.emailId },
              { $set: { overallRanking : user.overallRanking } }
            );
      
            return {
              emailId: user.emailId,
              todayRankingUpdated: updatedTodayRanking.nModified > 0,
              totalRankingUpdated: updatedOverallRanking.nModified > 0
            };
          }));
      
          return res.status(200).json({
            success: true,
            data
          });

        } catch (err) {
          return res.status(500).json({
            success: false,
            error: "Something went wrong while updating ranking!"  + err
          });
        }
      };

    exports.deleteUserById = async (req,res,next) => {
        const Id = req.params.id;
        const user = await Users.findById(Id);
        if(!user){
            return res.status(404).json({
                success : false,
                error : "Cannot find user!"
            })
        }
        try{
            const deleteData = await Users.findByIdAndDelete(Id);
            if(!deleteData){
                return res.status(400).json({
                    success : false,
                    error : "something went wrong!"
                })
            }
            return res.status(200).json({
                success : true,
                data : deleteData,
            })
        }catch(err){
            return res.status(500).json({
                success : false,
                error : "Internal server error!"
            })
        }
    }



    exports.getTimeApi =  async (req, res , next) => {
        try {
          const getTimeApiUrl = 'http://worldtimeapi.org/api/timezone/Asia/Kolkata';
          const response = await fetch(getTimeApiUrl);
          const data = await response.json();
        //   console.log(data.datetime);
          res.json({success : true,time :  data.datetime });
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch time' });
        }
      };