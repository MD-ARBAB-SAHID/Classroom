const subjectsDetails = (subjects)=>{

    const newSubjectModel = subjects.map((element)=>{
       
        let attendancePercentage =0;
        let totalClasses = 0;
        let attendedClasses = 0;
        let classesCanceled = 0;
        let unattendedClasses = 0;
        element.attendance.forEach((attendanceDetails)=>{
                if(attendanceDetails.attendanceType==="ATTENDED")
                {
                    attendedClasses++;
                    totalClasses++;
                }
                if(attendanceDetails.attendanceType==="UNATTENDED")
                {
                    unattendedClasses++;
                    totalClasses++;
                }
                if(attendanceDetails.attendanceType==="CANCELLED")
                {
                    classesCanceled++;
                };
        })
        totalClasses===0 ? attendancePercentage=0 : attendancePercentage = (attendedClasses/totalClasses)*100;
        
        return({
            _id:element._id,
            subjectName:element.subjectName,
            attendance:element.attendance,
            attendedClasses,
            totalClasses,
            classesCanceled,
            unattendedClasses,
            attendancePercentage
        })

    })

    return newSubjectModel;
}


module.exports = subjectsDetails;
