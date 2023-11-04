const xlsx = require('xlsx');
exports.readBacks = (filepath,filename)=>{
    try{
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
      
      let records = [];
        // console.log('*******',subjectInfoList);
         parsedData.forEach(data=>{
             records.push(createResultRecord(data));
         })
       
      return records;
    }catch(err){
        throw new Error('Problem with uploaded file')
    }
    

}



const createResultRecord =  (data)=>{
    const whiteList = ['A','A-','B+','B','B-','C+','C','C-','D+','D'];
    try{
        const record = new Object();
        record.rollNumber = data['CRN'];
        delete data['CRN'];
        record.examRollNumber = data['ERN'];
        delete data['ERN'];
        record.grades = [];
        for(const key in data){
            if(data.hasOwnProperty(key)){
                if(whiteList.includes(data[key]) && key !== 'SGPA'){ 
                    record.grades.push({
                        courseCode: key,
                        grade: data[key],
                        rollNumber: record.rollNumber
                    })
                }
                
            }
        }
        return record.grades;
    }catch(err){
        throw new Error('Error while reading xls file');
    }
    
};
