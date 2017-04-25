module.exports =(bot) =>{
//FUNCTIONS

let playerPoints=0;
let machinePoints=0;

let playGame = false;
const playRound ={
'1.1':'Player: Rock - Machine: Rock => Even round. We play Again \n',
'2.2':'Player: Paper - Machine: Paper => Even round. We play Again\n',
'3.3':'Player: Scissors - Machine: Scissors => Even round. We play Again\n',
'1.2':'Player: Rock - Machine: Paper => Machine wins 10 Points\n',
'1.3':'Player: Rock - Machine: Scissors => Player wins 10 Points\n',
'2.1':'Player: Paper - Machine: Rock => Player wins 10 Points\n',
'2.3':'Player: Paper - Machine: Scissors => Machine wins 10 Points\n',
'3.1':'Player: Scissors - Machine: Rock => Machine wins 10 Points\n',
'3.2':'Player: Scissors - Machine: Paper => Player wins 10 Points\n',
}

const calculateScorePlayer =(res)=>{
      if(res==='1.3'|| res==='2.1'|| res==='3.2'){
       playerPoints = playerPoints+10
      }
      return playerPoints
}
const calculateScoreMachine =(res)=>{
      if(res==='1.2'|| res==='2.3'|| res==='3.1'){
       machinePoints = machinePoints+10
      }
      return machinePoints
}

const getResult=(result)=>{
  let val='';
  for (let key in playRound) {
    if (playRound.hasOwnProperty(key)) {

      if(result ===key){

      val = (playRound[key]);
      break;

      }
    }
  }
  return val;
}


let playedResult=''

const rand = (min, max)=>{
	let randomNum =Math.random();
	let coef = (max - min);
	let num = randomNum * coef;
	let result = num + min;
	let resultStr = Math.floor(result).toString();
	return resultStr;
}

const machinePlays =()=>{
  let randomNumber = rand(1,4);
	switch (randomNumber)
	{
	  case "1":
		playedResult =playedResult+'1'
		break;
	  case "2":
		playedResult =playedResult+'2'
		break;
	  case "3":
		playedResult =playedResult+'3'
		break;
	}
}
  //Testing setup works
  bot.hear(/rockpaperscissors.js file!/i, res =>{
      return res.send('Great I\'m in!')
  })



  bot.hear(/play rps/i, res =>{


      const msg = 'Great now is Game On! \n '+
               'Each time you can type: rock, paper or scissors.'+
               ' then iRobot plays its move and on each round\n'+
               ' the winner earns 10 points. The first who\n'+
               'makes 100 points wins. Let The game Begin!'
      playGame = true
      return res.send(msg)
  })

//rock paper scissors words for the game
  bot.hear(/(.*)/i, res =>{
    const gameWords = res.match[1]
    let ms =''
    if((gameWords.includes('rock')||
       gameWords.includes('paper')||
       gameWords.includes('scissors'))&& playGame===false)
    {
      ms ='\nType: >>> play RPS <<< if you want to play the game RockPaperScissors.'

    }
    return res.send(ms)
  })


  //We Play the Game
  bot.hear(/(.*)/i, res =>{
    let message=''
    if(playGame===true)
    {
      const playerSelection = res.match[1]
      if((playerSelection).includes('rock')){
        playedResult = '1.'
      }else
      if((playerSelection).includes('paper')){
        playedResult = '2.'
      }else
      if((playerSelection).includes('scissors')){
        playedResult = '3.'
      }

      machinePlays()
      let resultPlayer = calculateScorePlayer(playedResult)
      let resultMachine = calculateScoreMachine(playedResult)
      const handPlayed = getResult(playedResult)
      message =(handPlayed + 'You:'+resultPlayer+' IRobot:'+resultMachine)
      if(resultPlayer===100 && resultMachine <100){
        playGame = false;
        message = 'You won - You:'+resultPlayer+' IRobot:'+resultMachine
        resultPlayer=0
        resultMachine=0
        message +='\nType: play rockpaperscissors. If you want to play again'
      }
      if(resultMachine===100 && resultPlayer<100){
        playGame = false;
        message = 'IRobot won - You:'+resultPlayer+' IRobot:'+resultMachine
        resultPlayer=0
        resultMachine=0
        message +='\nType: play RPS. If you want to play again'
      }

    }
    return res.send(message)

  })
}
