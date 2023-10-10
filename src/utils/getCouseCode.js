
exports.getCourseCode = async(subjectInfoList,subjectName)=>{
    try{
        const obj = new Object();

        subjectInfoList.map(data=>{
            if(data.subjectName.replaceAll(' ','').toLowerCase() === subjectName.replaceAll(' ','').toLowerCase()){
                obj.courseCode = data.courseCode;
                obj.creditHour = data.creditHour;
            }
        });
        return obj;

    }catch(err){

    }
}