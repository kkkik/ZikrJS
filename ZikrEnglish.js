const quotes = [
  {text:"Imam Ali (AS) said: The pious is the rich, the sinner is the poor.",source:"Nahj al-Balagha"},
  {text:"Imam Sadiq (AS) said: There is no good in a world where religion is not completed.",source:"Bihar al-Anwar"},
  {text:"Actions are judged by intentions.",source:"Nahj al-Balagha"},
  {text:"The most beloved people to Allah are those most beneficial to people.",source:"Bihar al-Anwar"},
  {text:"Patience is the key to relief.",source:"Bihar al-Anwar"},
  {text:"Do not despair of Allah's mercy.",source:"Nahj al-Balagha"},
  {text:"Religion is advice.",source:"Nahj al-Balagha"},
  {text:"Speak good or remain silent.",source:"Bihar al-Anwar"},
  {text:"Truthfulness is salvation.",source:"Bihar al-Anwar"},
  {text:"O Allah, bless Muhammad and the family of Muhammad.",source:""}
];

const texts = [
  "Reminder: Pray on time; prayer is the pillar of religion.",
  "Dhikr: There is no god but Allah, Muhammad is His messenger.",
  "Advice: Seek forgiveness and quit bad habits for success.",
  "Reminder: Morning and evening dhikr protect the heart.",
  "Advice: Whoever leaves sin gains peace of heart.",
  "Dhikr: Glory be to Allah and praise Him, Glory be to Allah the Great.",
  "Reminder: Prayer is better than sleep.",
  "Advice: Remember death and always self-reflect.",
  "Dhikr: I seek refuge in Allah from the accursed Satan.",
  "Reminder: Invest your time in what pleases Allah."
];

const colors = [new Color("#f7e9d7"),new Color("#d0e8f2"),new Color("#c7efcc"),new Color("#f8d7da"),new Color("#fff3b0")];
const hijriMonths = ["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qi'dah","Dhu al-Hijjah"];

async function fetchHijriDate(){
  try{
    let req = new Request("https://api.aladhan.com/v1/gToH?date="+formatDate(new Date()));
    let json = await req.loadJSON();
    if(json?.data?.hijri){
      let d=json.data.hijri;
      return {day:+d.day,month:+d.month.number,year:+d.year};
    }
  }catch{}
  return null;
}

function formatDate(date){
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")}`;
}

function getNextPrayer(){
  const prayers=[
    {name:"Fajr",hour:4,minute:30},
    {name:"Sunrise",hour:6,minute:0},
    {name:"Dhuhr",hour:12,minute:30},
    {name:"Asr",hour:15,minute:45},
    {name:"Maghrib",hour:18,minute:15},
    {name:"Isha",hour:19,minute:45}
  ];
  let now=new Date();
  for(let p of prayers){
    let t=new Date(now.getFullYear(),now.getMonth(),now.getDate(),p.hour,p.minute);
    if(t>now)return p;
  }
  return prayers[0];
}

async function createWidget(){
  let widget=new ListWidget();
  widget.backgroundColor=colors[Math.floor(Math.random()*colors.length)];

  let now=new Date();
  let gregorian=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  let hijri=await fetchHijriDate()||{day:now.getDate(),month:now.getMonth()+1,year:now.getFullYear()};
  let hijriText=`${hijri.day} ${hijriMonths[hijri.month-1]} ${hijri.year} AH`;

  let quote=quotes[Math.floor(Math.random()*quotes.length)];
  let reminder=texts[Math.floor(Math.random()*texts.length)];
  let nextPrayer=getNextPrayer();

  let title=widget.addText("📿 Daily Reminder");
  title.font=Font.boldSystemFont(16);
  title.centerAlignText();
  title.textColor=Color.black();

  widget.addSpacer(6);
  widget.addText(`📅 Gregorian: ${gregorian}`).font=Font.systemFont(12);
  widget.addText(`🕌 Hijri: ${hijriText}`).font=Font.systemFont(12);
  widget.addSpacer(6);

  let qt=widget.addText(`📝 Wisdom:\n"${quote.text}"`);
  qt.font=Font.italicSystemFont(14);
  qt.textColor=Color.black();

  widget.addText(`Source: ${quote.source}`).font=Font.systemFont(10);
  widget.addSpacer(6);

  widget.addText(`🔔 Reminder:\n${reminder}`).font=Font.systemFont(12);
  widget.addSpacer(6);

  widget.addText(`🕋 Next Prayer: ${nextPrayer.name} (${nextPrayer.hour}:${nextPrayer.minute.toString().padStart(2,"0")})`).font=Font.systemFont(12);
  widget.addSpacer(6);

  let salawat=widget.addText("O Allah, bless Muhammad and the family of Muhammad");
  salawat.font=Font.boldSystemFont(14);
  salawat.textColor=Color.blue();

  return widget;
}

await createWidget().then(w=>{
  if(config.runsInWidget){
    Script.setWidget(w);
  }
  Script.complete();
});
