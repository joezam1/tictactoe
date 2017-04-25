module.exports =(bot) =>{

  const js3sydChannel =[
  '@joe',
  '@fintsai',
  '@jesicasaussay',
  '@josh-w',
  '@kikitse',
  '@kunle1104',
  '@miguelo',
  '@nicktho',
  '@oliviabasheer'
  ]

  //File setup working
  bot.hear(/chatmessages.js file!/i, res =>{
    return res.send('hi there file OK!')
  })

  /*bot.hear(/message (.*)/, res => {
    const userToMessage = res.match[1];
    console.log(userToMessage)
    res.send(`@${userToMessage} test`)
  })*/

  bot.hear(/(.*)people(.*)channel/, res => {
  const totalUsers = js3sydChannel.length;
  let usersList=''
  for (let index = 0; index < totalUsers; ++index) {
    usersList =usersList+'user:'+ js3sydChannel[index]+'\n'
  }
  const msg = "there "+((totalUsers>1)?' are ': ' is ')+totalUsers+ ((totalUsers>1)?' users ': ' user ')+
              'in this channel. List: \n'+usersList

  res.send(msg)
  })

  bot.hear(/(.*)message types(.*)/i, res =>{
    const msg = 'I can send individual and group messages.'
    return res.send(msg)
  })

  bot.hear(/(.*)individual (message|messages)(.*)/i, res =>{
    const msg = 'You only need to identify the user\n'+
                ' @username and type a message in the format:\n'+
                'msg @username: content/description'
    return res.send(msg)
  })

  bot.hear(/(.*)group messages(.*)/i, res =>{
    const msg = 'You need to identify all the users\n'+
                'you want to send a message. Format\n'+
                ' @usernames and type a message in the format:\n'+
                'message to @username1, @username2: content/description'
    return res.send(msg)
  })



  //Individual Message
  bot.hear(/msg(.*): (.*)/, res => {
    const user = res.match[1]
    const message = res.match[2]
    let userFound = false
    for(let i=0; i<js3sydChannel.length; i++)
    {
      if(user===js3sydChannel[i])
      {
        userFound=true
        break
      }
    }
    if(userFound)
    {
      //console.log(user)
      //console.log(message)
      bot.messageRoom(user, message)
      return res.send('Message to user: '+user +" sent.")
    }
    else {
      return res.send('user: '+user +" Not Found. Message not sent.")
    }

  })


  //Group Message
  bot.hear(/message to(.*):(.*)/, res => {

    const users = res.match[1]
    const message = res.match[2]

    let usersArray = (users.split('@'))
    let usersArrayTrim = []
    for(let d=0; d<usersArray.length; d++)
    {
      let x =usersArray[d].trim()
       usersArrayTrim.push(x);
    }
    for(let d=0; d<usersArrayTrim.length; d++)
    {
      if(usersArrayTrim[d]==='')
      {
        usersArrayTrim.splice(d,1)
      }
    }

    let msgArrayFound = []
    let msgArrayNotFound = []
    let counter=0;
    for(let a=0; a< usersArrayTrim.length; a++)
    {
      for(let b=0; b< js3sydChannel.length; b++)
      {
        if(js3sydChannel[b].includes(usersArrayTrim[a]))
        {
            msgArrayFound.push(js3sydChannel[b])
        }
        else {
          counter++
        }
      }

      if(counter=== js3sydChannel.length)
      {
        msgArrayNotFound.push('@'+usersArrayTrim[a])
      }
       counter=0
    }

    console.log(users)
    console.log(usersArrayTrim)
    console.log(message)

    console.log(msgArrayFound)
    console.log(msgArrayNotFound)

    let ms=''
    if(msgArrayFound.length>0)
    {
      for(let a=0; a<msgArrayFound.length; a++)
      {
        bot.messageRoom(msgArrayFound[a], message)
        ms=ms+('\n Message to user: '+msgArrayFound[a] +" sent.\n")
      }
    }

    if(msgArrayNotFound.length>0)
    {
      for(let a=0; a<msgArrayNotFound.length; a++)
      {
        ms=ms+('\n user: '+msgArrayNotFound[a] +" Not Found. Message not sent.\n")
      }
    }
    return res.send(ms)
  })
}
