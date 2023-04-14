const data = [{
    name: 'Ravi Teja',
    email: 'ravi@teja.com',
    rollNo: 12345,
    semester: 7,
    department: {
      name: 'department of punjabi',
      id: 'dept_punj'
    },
    course: 'bachlore of history',
    degreeType: 'ug_3',
    image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    createdBy: {
      name: 'Lakshay Kapoor',
    },

  } , 
  {
    name: 'Rajesh kapoor',
    email: 'rajeshkapoor@gmail.com',
    rollNo: 12341,
    semester: 4,
    department: {
      name: 'department of computer science',
      id: 'dept_cs'
    },
    course: 'MSC_IT',
    degreeType: 'pg_2',
    image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    createdBy: {
      name: 'Lakshay Kapoor',
    },
  
  },
  {
    name: 'mandeep singh',
    email: 'mandeepsingh13524@gmail.com',
    rollNo: 10310,
    semester: 7,
    department: {
      name: 'department of computer science',
      id: 'dept_cs'
    },
    course: 'BCA',
    degreeType: 'ug_3',
    image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    createdBy: {
      name: 'Lakshay Kapoor',
    },
  
  }
  ];
  const adminInfo = {
    name: "mandeep singh", 
    _id : 123345,
    email : "mandeep@singh.com"
  }

  const newData = data.map(obj => {
    return {
      name: obj.name,
      email: obj.email,
      department: {
        name: obj.department.name,
        id: obj.department.id
      },
      degreeType : obj.degreeType,
      course : obj.course,
      image : obj.image,
      createdBy : {
        name: adminInfo.name,
        id: adminInfo._id
      }
    }
  });
  console.log(newData);
  