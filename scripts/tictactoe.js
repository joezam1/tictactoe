module.exports =(bot) =>{

  //Multidimensional Arrays [row][column]
  /*TESTING begin=====*/
  const testArray =
  [
    ['a','b','c'],
    ['d','e','f'],
    ['g','h','i'],
  ]

  const drawTestArray=()=>{
    let msg=''
    let m=''
    for(let a=0; a<3; a++)
    {
      for(let b=0; b<3; b++)
      {
        if(b==2) {m='\n'} else {m=''}
        msg = msg+ testArray[a][b]+m

      }
    }
    console.log(msg)
    return msg
  }

  bot.hear(/image/i, res =>{

    const drawing = drawTestArray()
    console.log(drawing)
    return res.send(drawing)

  })
  bot.hear(/array/i, res =>{

    const array = testArray[1][2]
    console.log(array)
    return res.send(array)
  })
  /*TESTING end========*/

  const tictactoeArray =
  [
    ['|___|','|___|','|___|'],
    ['|___|','|___|','|___|'],
    ['|___|','|___|','|___|'],
  ]

  const initialTictactoeArrayPositions=[
  ['a','0.0',' => First Row and First Column'],
  ['b','0.1',' => First Row and Middle Column'],
  ['c','0.2',' => First Row and Third Column'],
  ['d','1.0',' => Middle Row and First Column'],
  ['e','1.1',' => Middle Row and Middle Column'],
  ['f','1.2',' => Middle Row and Third Column'],
  ['g','2.0',' => Third Row and First Column'],
  ['h','2.1',' => Third Row and Middle Column'],
  ['i','2.2',' => Third Row and Third Column']
]

  const tictactoeArrayPositions=[
  ['a','0.0',' => First Row and First Column'],
  ['b','0.1',' => First Row and Middle Column'],
  ['c','0.2',' => First Row and Third Column'],
  ['d','1.0',' => Middle Row and First Column'],
  ['e','1.1',' => Middle Row and Middle Column'],
  ['f','1.2',' => Middle Row and Third Column'],
  ['g','2.0',' => Third Row and First Column'],
  ['h','2.1',' => Third Row and Middle Column'],
  ['i','2.2',' => Third Row and Third Column']
]

  const populateArrayPositions=()=>{
    console.log('START populateArrayPositions Function');
    console.log('populateArrayPositions length:'+tictactoeArrayPositions.length )
    if(tictactoeArrayPositions.length===0)
    {
      const newArrayLength = initialTictactoeArrayPositions.length
      console.log('newArrayLength:'+newArrayLength)
      tictactoeArrayPositions.length = newArrayLength
      for(let i=0; i<newArrayLength; i++)
      {
        tictactoeArrayPositions[i]=initialTictactoeArrayPositions[i]
      }

      console.log('populateD tictactoeArrayPositions'+ tictactoeArrayPositions)
    }
  console.log('END populateArrayPositions Function');
  }

  const clearTictactoeArray=()=>
  {
    const icon = '|___|'
    for(let a=0; a<3; a++)
    {
      for(let b=0; b<3; b++)
      {
        tictactoeArray[a][b] = icon
      }
    }
  }

  const drawArrayPositions=()=>{
    console.log('START drawArrayPositions Function')
    const lengthTictactoeArray = tictactoeArrayPositions.length
    console.log(lengthTictactoeArray)
    console.log('tictactoeArrayPositions: '+tictactoeArrayPositions)
    let output = ''
    if(lengthTictactoeArray>0)
    {
      for(let a=0; a<lengthTictactoeArray; a++)
      {
        output =output+ tictactoeArrayPositions[a][0]+ tictactoeArrayPositions[a][2]+'\n'
      }
    }
    console.log('END drawArrayPositions Function')
    return output;
  }

  const player1={
    'userInput':false,
    'icon':'|_x_|',
    'iconDisplay': 'X'
  }

  const player2={
    'userInput':false,
    'icon':'|_o_|',
    'iconDisplay': 'O'
  }

  const rand = (min, max)=>{
  	let randomNum =Math.random();
  	let coef = (max - min);
  	let num = randomNum * coef;
  	let result = num + min;
  	let resultStr = Math.floor(result)
  	return resultStr;
  }

  const playerMoves=(input)=>{
  console.log('START PlayerMoves Function')
    let playerMove = false
    let playerSelection = input.toString()
    playerSelection = playerSelection.trim().toString().toLowerCase()
    let remainingPositions = ''
    let response=''
    console.log('player selection: '+playerSelection)
    const length = (tictactoeArrayPositions.length)
    console.log(length)
    for(let a=0;a<length;a++)
    {
        const vectorLetter = ((tictactoeArrayPositions[a][0]).trim()).toString()
        console.log('vector letter PlayerMoves: '+vectorLetter)
        if(playerSelection===vectorLetter)
        {
          console.log('player selection and vector are equal')
          const arrayPlayer = getTictactoeVectorPositions(tictactoeArrayPositions[a][1])
          //We update the tictactoe Drawing
          const row = arrayPlayer[0]
          const col = arrayPlayer[1]
          const resultPlayerMove = (player1.userInput===true)?player1.icon :((player2.userInput===true)?player2.icon:"Failure.Please check")
          console.log('resultPlayerMove'+resultPlayerMove)
          tictactoeArray[row][col] = resultPlayerMove

          //We remove the item from the array
          tictactoeArrayPositions.splice(a,1)
          remainingPositions = drawArrayPositions()
          console.log(remainingPositions)
          playerMove = true
          break;
        }

    }


    if(!playerMove)
    {
      response = 'there is an Error in the logics of the PlayerMove function. Please check.'
      console.log('there is an Error in the logics of the PlayerMove function. Please check.')
    }
    console.log('respons:'+response)
    console.log('END PlayerMoves Function')
    return response
  }

  const robotMoves=()=>{
    console.log('START robotMoves Function')
    let robotMoveBool = false
    let messageRobot = ''
    const length = tictactoeArrayPositions.length
    if(length>0)
    {
      const randomPosition = rand(0,length)
      const robotVectorPosition = tictactoeArrayPositions[randomPosition][1]
      const array = getTictactoeVectorPositions(robotVectorPosition)
      const row = array[0]
      const col = array[1]
      const resultRobotMove = (player1.userInput===false)?player1.icon :((player2.userInput===false)?player2.icon:"Failure.Please check")
      console.log(resultRobotMove)
      tictactoeArray[row][col] = resultRobotMove

      tictactoeArrayPositions.splice(randomPosition,1)
      remainingPositions = drawArrayPositions()
      console.log(remainingPositions)
      robotMoveBool = true
    }

    if(!robotMoveBool)
    {
      messageRobot='there is an Error in the logics of the robotMove function. Please check.'
    }
    console.log('END robotMoves Function')
    return messageRobot
  }

  const identifyTictactoeWinner = ()=>{
    let msg=''
    //Rows Equivalence
    for(let a=0; a<3; a++)
    {
        //We Find a winner
        if((tictactoeArray[a][0]===tictactoeArray[a][1] &&tictactoeArray[a][0]===tictactoeArray[a][2]) &&
           tictactoeArray[a][0] !== '|___|')
        {
          console.log('Row Equivalence is TRUE')
          //We identify the Winner

          if((tictactoeArray[a][0]=== player1.icon && player1.userInput === true)||
             (tictactoeArray[a][0]=== player2.icon && player2.userInput === true))
          {
            console.log('player1 icon: '+player1.icon )
            msg = 'YOU Won with horizontal line!'
          }
          else
          if((tictactoeArray[a][0]=== player1.icon && player1.userInput === false) ||
             (tictactoeArray[a][0]=== player2.icon && player2.userInput === false))
          {
            console.log('player2 icon: '+player2.icon )
            msg = 'IRobot Won with horizontal line!'
          }

          break;
        }
    }
    //Column Equivalence
    for(let b=0; b<3; b++)
    {
        if((tictactoeArray[0][b]===tictactoeArray[1][b]&& tictactoeArray[0][b]===tictactoeArray[2][b] )&&
         tictactoeArray[0][b] !== '|___|')
        {
          console.log('Column Equivalence is TRUE')
          if((tictactoeArray[0][b]=== player1.icon && player1.userInput === true)||
             (tictactoeArray[0][b]=== player2.icon && player2.userInput === true))
          {
            console.log('player1 icon: '+player1.icon )
            msg = 'YOU Won with vertical line!'
          }
          else
          if((tictactoeArray[0][b]=== player1.icon && player1.userInput === false)||
             (tictactoeArray[0][b]=== player2.icon && player2.userInput === false))
          {
            console.log('player2 icon: '+player2.icon )
            msg = 'IRobot Won with vertical line!'
          }

          break;
        }
    }
    //Diagonal Equivalence
    if((//Top left to Bottom right
      tictactoeArray[0][0]===tictactoeArray[1][1]&& tictactoeArray[0][0]===tictactoeArray[2][2] ||
      //Bottom left to Top right
      tictactoeArray[2][0]===tictactoeArray[1][1]&& tictactoeArray[2][0]===tictactoeArray[0][2]
    )&& tictactoeArray[1][1] !== '|___|')
    {
      console.log('Diagonal Equivalence is TRUE')
      if((tictactoeArray[1][1]=== player1.icon && player1.userInput===true) ||
          (tictactoeArray[1][1]=== player2.icon && player2.userInput===true))
      {
        msg = 'YOU Won!'
      }
      else
      if((tictactoeArray[1][1]=== player1.icon && player1.userInput===false) ||
         (tictactoeArray[1][1]=== player2.icon && player2.userInput===false))
      {
        msg = 'IRobot Won!'
      }

    }
    return msg
  }

  const getTictactoeVectorPositions=(input)=>
  {
    //We get the corresponding vector position of the array
    const location = (input.trim()).toString()
    console.log('location'+location)
    const arrayLocation = location.split('.')
    const intArray =[]
    intArray[0] =parseInt(arrayLocation[0])
    intArray[1] =parseInt(arrayLocation[1])
    return intArray
  }

  const drawTictactoe=()=>{
    let msg=''
    let m=''
    for(let a=0; a<3; a++)
    {
      for(let b=0; b<3; b++)
      {
        if(b==2) {m='\n'} else {m=''}
        msg = msg+ tictactoeArray[a][b]+m

      }
    }
    console.log(msg)
    return msg
  }

 const stopGame =()=>{
   clearTictactoeArray()
   tictactoeArrayPositions.length = 0
   player1.userInput=false
   player2.userInput= false
   console.log('Player1:'+player1.userInput+' Player2:'+player2.userInput)
   console.log(tictactoeArrayPositions.length)
   const msgStopGame = '\n\nto play again please type: "Play TTT" if you want to play the game TicTacToe Again.'
   return msgStopGame
 }

/******COMMANDS*************/
//We Confirm the tictactoe file works
  bot.hear(/tictactoe file!/i, res =>{
    console.log('Player1:'+player1.userInput+' Player2:'+player2.userInput)
    return res.send('Great I\'m in!')
  })
  bot.hear(/Stop Game TTT/i, res =>{
    const robotResponseToStop = stopGame()
    return res.send(robotResponseToStop)
  })

  bot.hear(/(.*)play games(.*)/i, res =>{
    console.log('Player1:'+player1.userInput+' Player2:'+player2.userInput)
    const respondTictactoe ='yes. I can play two games.\n'+
    'One is TicTacToe and the other is RockPaperScissors. \n'+
    'To play TicTacToe you need to type: Play TTT\n'+
    'To play RockPaperScissors you need to type: Play RPS\n'+
    'Enjoy them!.'
    return res.send(respondTictactoe)
  })


  bot.hear(/play:(.*)/i, res =>{
    if(player1.userInput===true || player2.userInput===true)
    {
      const playerSelection = res.match[1]
      let responsePlayer = playerMoves(playerSelection)
      console.log('responsePlayer'+ responsePlayer)
      if(responsePlayer ==='')
      {
        //The robot makes its move
        robotMoves()
        const draw = drawTictactoe()
        const remainingPositions = drawArrayPositions()
        console.log(draw +'\n'+remainingPositions)
        let msgInCaseOfDraw = '';
        const winnerFound = identifyTictactoeWinner()
        if(winnerFound ==='')
        {
            if(tictactoeArrayPositions.length===0)
            {
                msgInCaseOfDraw ='There is no winner.\n'
                msgInCaseOfDraw =msgInCaseOfDraw +'You can stop the game by typing: Stop Game TTT'
                return res.send(draw +'\n'+ remainingPositions+'\n'+msgInCaseOfDraw)
            }
            else {
                return res.send(draw +'\n'+ remainingPositions)
            }
        }
        else
        {
          const msg = stopGame()

          console.log(tictactoeArrayPositions)
          return res.send(draw +'\n'+winnerFound +msg)
        }
      }
      else
        {
          return res.send(responsePlayer)
        }

    }
    else {
      return res.send('You have not selected your icon yet, \n'+
        'Please type: "Play TTT" to start the game TicTacToe.')
    }
  })

  /*Player SELECTION*/
  bot.hear(/(.*)Play TTT(.*|s)/i, res =>{

    let msg = ''
    const choice = rand(1,3)
    console.log("choice: "+choice)
    if(choice ===1){
      player1.userInput = true
      player2.userInput = false
      msg =player1.userInput+ ' - you are player 1. your Icon is: '+ player1.iconDisplay
    }
    else if(choice ===2){
      player1.userInput = false
      player2.userInput = true
      msg =player2.userInput+' - you are player 2. your Icon is: '+ player2.iconDisplay
    }
    console.log(msg)
    populateArrayPositions()
    const draw = drawTictactoe()
    const remainingPositions = drawArrayPositions()
    console.log(draw +'\n'+remainingPositions)
    return res.send(msg + '\n the tictactoe Board. \n\n'+draw +'\n'+
          'Select a letter equivalent to the position you wish to place your icon.\n'+ remainingPositions +
          '\n Once you select a letter, you type your'+
          ' \nletter of choice in the following format: play: "selected letter" eg: play: c'+
          '\n Then the Robot will make its move. The best will win.'+
          '\n\nLet the Game Begin!')

  })

}
