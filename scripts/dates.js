module.exports =(bot) =>{

  //FUNCTIONS

  const holidays = {
    1.01:"New Year's Day",
    1.02:"New Year's Holiday",
    1.26:"Australia Day",

    3.06:"Labour Day Western Australia",
    3.13:"Labour Day Victoria",
    3.13:"March Public Holiday Adelaide Cup South Australia",
    3.13:"Canberra Day",

    4.14:"Good Friday",
    4.16:"Easter Sunday",
    4.17:"Easter Monday",
    4.25:"Anzac Day",

    5.01:"Labour Day Queensland",
    5.01:"Monday	May Day Northern Territory",

    6.05:"Monday	Western Australia Day. WA only",
    6.12:"Queen's Birthday except QLD and WA",
    8.07:"Picnic Day NT Only",

    10.02:"Labour Day. SA, NSW,ACT",
    10.02:"Queen's Birthday. QLD",

    11.07:"Melbourne Cup Day. VIC Only",

    12.24:"Christmas Eve",
    12.25:"Christmas Day",
    12.26:"Boxing Day",
    12.31:"New Year's Eve"
  };
  const getMonthAndDate=()=>{
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;

    if(dd<10) {
      dd='0'+dd
    }
    if(mm<10) {
      mm='0'+mm
    }
    const monthAndDate = mm+"."+dd

    return monthAndDate
  }

  const getToday =()=>{
    const md = getMonthAndDate()
    const fields = md.split('.')
    const mm = fields[0]
    const dd = fields[1]
    const yyyy =new Date().getFullYear();

    const today = dd+'/'+mm+'/'+yyyy;
    return today
  }

  //MESSAGES - COMMANDS

  //Hears a message not related to the robot name
  //Testing setup works
  bot.hear(/date.js file!/i, res =>{
    return res.send('Great I\'m in!')
  })

  bot.respond(/(\s|(.*))date is today(\s|\\?)/i, res =>{
    return res.send("today is "+getToday())
  })

  bot.respond(/(\s|(.*))day is today(\s|\\?)/i, res =>{
    let indexDay = new Date();
    indexDay = indexDay.getDay();
    const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    return res.send('Today is '+dayOfWeek[indexDay])
  })

  bot.respond(/(\s|(.*))next holiday(\s|\\?)/i, res =>{
    const floatNum = parseFloat(getMonthAndDate()).toFixed(2)
    const keys = Object.keys(holidays);
    let current = 0;
    let next = 0;
    for(let i = 0; i < keys.length; i++) {

        current =keys[i];
        next =keys[i + 1];
       if(floatNum>=current && floatNum <next)
       {
         const fields = next.split('.');
         const month = fields[0];
         const day = fields[1];

         return res.send('next holiday is on : '+day+'/'+month+'/2017 -> '+holidays[next])
       }
    }
  })

  bot.respond(/(\s|(.*))remaining holidays(\s|\\?)(.*)/i, res =>{
  let val ="";
  const floatDate= parseFloat(getMonthAndDate()).toFixed(2)
    for (var key in holidays) {
      if (holidays.hasOwnProperty(key)) {
        let floatKey = parseFloat(key)
        if(floatDate <floatKey){
          const fields = floatKey.toString().split('.');
          const month = fields[0];
          const day = fields[1];

         val =val+('Holiday: '+day +'/'+month+'/2017'+ " -> " + holidays[key]+"\n").toString();
        }
      }
    }
    return res.send(val)
  })
}
