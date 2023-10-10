
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const Subject = require('../models/subject');
const User = require('../models/user');
const util = require('../utils/array-padding');
const url = require('url');
exports.generateForm = async (req,res,next)=>{

// get roll number
const {rollNumber,faculty} = req; 
 
// get current sem, ern 
const data = await User.aggregate([
    {$match:{rollNumber}},
    {$lookup:{
        from: 'results',
        localField: 'rollNumber',
        foreignField: 'rollNumber',
        as: 'examRollNumber'
    }},
    {$set:{
        examRollNumber: {
            $arrayElemAt: ['$examRollNumber.examRollNumber',0]
        }
    }}
]);

if(!data){
    res.status(500).send({message: 'cant process now'});
}
const regularSubjects = util.arrayPadding(req.body.formData.regularSubjects,10);
const backSubjects = util.arrayPadding(req.body.formData.backSubjects, 8);
const newData = new Object();
newData.backSubjects = backSubjects;
newData.regularSubjects = regularSubjects;
newData.firstName = data[0].firstName;
newData.lastName = data[0].lastName;
newData.middleName = data[0].middleName;
newData.faculty = data[0].faculty;
newData.examRollNumber = data[0].examRollNumber
const templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/template/entranceCard.html'), 'utf8');
    handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

var template = handlebars.compile(templateHtml);
	var html = template(newData);

    var pdfPath = path.join('form');
    const browser = await puppeteer.launch({
		headless: 'new'
	});
    var page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');
 
    // create a folder 
    console.log(__dirname);
    try{
        if(!fs.existsSync(`src/submitted-form/${faculty}`)){
            fs.mkdirSync(`src/submitted-form/${faculty}`);
        }
    }catch(err){
        console.log(err)
    }

    // Downlaod the PDF
  const pdf = await page.pdf({
    path: `src/submitted-form/${faculty}/${faculty}-${rollNumber}.pdf`,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

//   Close the browser instance
  await browser.close();
  res.status(200).send({message:'success !'});
};


exports.downloadForm = async (req,res,next)=>{
    const {rollNumber,faculty} = req;
    const fileDir = path.join('src','submitted-form',`${faculty}`);
    const absPath = path.resolve(fileDir);

    const stream = fs.createReadStream(absPath+`/${faculty}-${rollNumber}.pdf`);
    try{
        res.set({
            'Content-Disposition': `attachment; filename='hello.pdf'`,
            'Content-Type': 'application/pdf',
          });
          stream.pipe(res);
    
    }catch(err){
        console.log(err)
    }
    
    
    // fs.readFile(absPath+`/${faculty}-${rollNumber}.pdf`,(err,content)=>{
    //     if(err){
    //          return res.status(500).send({message: 'cant find file'});
    //     }else{
    //         return res.send(content);
    //     }
    // })
    
}



