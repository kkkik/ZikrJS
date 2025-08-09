const quotes = [
  {"text":"قال الإمام علي عليه السلام: التقى هو الغني، والفاجر هو الفقير.","source":"نهج البلاغة"},
  {"text":"قال الإمام الصادق عليه السلام: لا خير في دنيا لا يتم فيها دين.","source":"بحار الأنوار"},
  {"text":"إنما الأعمال بالنيات.","source":"نهج البلاغة"},
  {"text":"أحب الناس إلى الله أنفعهم للناس.","source":"بحار الأنوار"},
  {"text":"الصبر مفتاح الفرج.","source":"بحار الأنوار"},
  {"text":"لا تقنطوا من رحمة الله.","source":"نهج البلاغة"},
  {"text":"الدين النصيحة.","source":"نهج البلاغة"},
  {"text":"قل خيراً أو اصمت.","source":"بحار الأنوار"},
  {"text":"الصدق منجاة.","source":"بحار الأنوار"},
  {"text":"اللهم صلّ على محمد وآل محمد","source":""}
];

const texts = [
  "تذكير: صلِّ في وقتها، فالصلاة عمود الدين.",
  "ذكر: لا إله إلا الله محمد رسول الله.",
  "نصيحة: استغفر الله وترك العادة السيئة طريق للنجاح.",
  "تذكير: أذكار الصباح والمساء تحفظ القلب.",
  "نصيحة: من ترك المعصية نال راحة القلب.",
  "ذكر: سبحان الله وبحمده سبحان الله العظيم.",
  "تذكير: الصلاة خير من النوم.",
  "نصيحة: تذكر الموت وراجع نفسك دائماً.",
  "ذكر: أعوذ بالله من الشيطان الرجيم.",
  "تذكير: استثمر وقتك فيما يرضي الله."
];

const colors = [new Color("#f7e9d7"),new Color("#d0e8f2"),new Color("#c7efcc"),new Color("#f8d7da"),new Color("#fff3b0")];
const hijriMonths = ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"];

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
    {name:"الفجر",hour:4,minute:30},
    {name:"الشروق",hour:6,minute:0},
    {name:"الظهر",hour:12,minute:30},
    {name:"العصر",hour:15,minute:45},
    {name:"المغرب",hour:18,minute:15},
    {name:"العشاء",hour:19,minute:45}
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
  let hijriText=`${hijri.day} ${hijriMonths[hijri.month-1]} ${hijri.year} هـ`;

  let quote=quotes[Math.floor(Math.random()*quotes.length)];
  let reminder=texts[Math.floor(Math.random()*texts.length)];
  let nextPrayer=getNextPrayer();

  let title=widget.addText("📿 تذكير يومي");
  title.font=Font.boldSystemFont(16);
  title.centerAlignText();
  title.textColor=Color.black();

  widget.addSpacer(6);
  widget.addText(`📅 ميلادي: ${gregorian}`).font=Font.systemFont(12);
  widget.addText(`🕌 هجري: ${hijriText}`).font=Font.systemFont(12);
  widget.addSpacer(6);

  let qt=widget.addText(`📝 حكمة:\n"${quote.text}"`);
  qt.font=Font.italicSystemFont(14);
  qt.textColor=Color.black();

  widget.addText(`المصدر: ${quote.source}`).font=Font.systemFont(10);
  widget.addSpacer(6);

  widget.addText(`🔔 تذكير:\n${reminder}`).font=Font.systemFont(12);
  widget.addSpacer(6);

  widget.addText(`🕋 الصلاة القادمة: ${nextPrayer.name} (${nextPrayer.hour}:${nextPrayer.minute.toString().padStart(2,"0")})`).font=Font.systemFont(12);
  widget.addSpacer(6);

  let salawat=widget.addText("اللهم صلّ على محمد وآل محمد");
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
