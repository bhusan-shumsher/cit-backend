const excelToJson = require('convert-excel-to-json');
const xlsx = require('xlsx');
const {getCourseCode} = require('./getCouseCode');
exports.ex2json = (filepath,filename,flag,currentSemester,obj,subjectInfoList)=>{
    const file = xlsx.readFile(filepath);
    const sheetName = file.SheetNames;
    const totalSheets = sheetName.length;
    // Variable to store our data
  let parsedData = [];

  // Loop through sheets
//   for (let i = 0; i < totalSheets; i++) {

      // Convert to json using xlsx
      const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetName]);

      // Skip header row which is the colum names
    //   tempData.shift();
      // Add the sheet's json to our data array
      parsedData.push(...tempData);
//   }
  
  let student = [];
  if(flag === 'school'){
    parsedData.forEach(data=>{
        student.push(createSchoolRecord(data));
  })
  }else if(flag === 'result'){

    // console.log('*******',info)
     parsedData.forEach(data=>{
        console.log(data)
         student.push(createResultRecord(data,obj));
     })
  }
  else{
    parsedData.forEach(data=>{
        student.push(createStudentRecord(data,currentSemester));
    })
  }
   
  return student;

}

const createStudentRecord = (data,currentSemester)=>{
    const record= new Object();
    record.email = data.email;
    // // get roll number from the email
    // const rollNumber = data.split('.')[1].split('@')[0];
    record.rollNumber = data.student_id;
    record.currentSemester = currentSemester;
    record.role = 'student';
    record.password = data['student_id']; // password same as the roll number initially
    record.firstName = data.first_name;
    record.lastName = data.last_name;
    record.middleName = data.middleName;
    record.dobNepali = data.dob_nepali;
    record.dobEnglish = data.dob_english;
    record.gender = data.gender;
    record.nationality = data.nationality;
    record.batch = data.batch;
    record.faculty = getDepartment(data.student_id.toString());
    record.religion = data.religion;
    record.address = data.address;
    record.town = data['town_village'];
    record.district = data.district;
    record.zone = data.zone;
    record.wardNum = data.ward;
    record.studentContactNumber = data['std_contactno'];
    record.fatherContactNumber = data['father_contactno'];
    record.motherContactNumber = data['mother_contactno'];
    record.localGuardianContactNumber = data['local_contactno'];
    return record;
}

const getDepartment = (rollNumber)=>{
    const code = rollNumber.slice(2,4);
   if(code === '15' || code == '14'){
    return 'BEIT'
   }
    if(code === '16' || code === '17'){
        return 'BESE'
    }
    if(code == '12' || code == '13'){
        return 'BECE';
    }

};


const createSchoolRecord = (data)=>{
    const record= new Object();
    record.rollNumber = data['student id'];
    record.secondaryLevelBoard = data['secondary level board'];
    record.schoolYear = data['school year'];
    record.schoolSymbolNumber = data['school symbol no'];
    record.schoolTotalMarks = data['school total marks'];
    record.schoolObtainedMarks = data['school obtained marks'];
    record.schoolDivision = data['school division'];
    record.highSchoolBoard = data['Higher secondary level board'];
    record.highSchoolYear = data['college year'];
    record.highSchoolSymbolNumber = data['college symbol no'];
    record.highSchoolTotalMarks = data['college total marks'];
    record.highSchoolObtainedMarks = data['college obtained marks'];
    record.highSchoolDivision = data['college division'];
    record.migration = data['migration'] == 1 ? true : false;
    record.schoolAddress = data['school address'];
    record.schoolName = data['school name'];
    record.collegeName = data['college name'];
    record.collegeAddress = data['college address'];
    return record;
};

const createResultRecord =  (data,obj)=>{
    const record = new Object();
    record.semester = obj.semester;
    record.semesterType = obj.semesterType;
    record.year = obj.year;
    record.faculty = obj.faculty;
    record.rollNumber = data['CRN'];
    delete data['CRN'];
    record.examRollNumber = data['ERN'];
    delete data['ERN'];
    record.sgpa = typeof data['SGPA'] ==='number' ? data['SGPA'] : 0.0;
    delete data['SGPA'];
    record.grades = [];
    const grade= new Object();
    for(const key in data){
        if(data.hasOwnProperty(key)){
            const newKey = key.replace(/[\r\n]/gm,'');
            grade[`${newKey}`] = data[key];
            record.grades.push({
                subject: newKey,
                grade: data[key]
            })
        }
    }

    // console.log(record);
    // const r = new Result(record);
    // await r.save();
    return record;
};


