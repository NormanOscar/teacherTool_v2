import studentList from "../json/studentList.json";

export function addStudentsToLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("studentData"));
  if (savedData === null) {
    let studentDataList = [];
    for (let i = 0; i < studentList.students.length; i++) {
      studentDataList.push(studentList.students[i]);
    }
    localStorage.setItem("studentData", JSON.stringify(studentDataList));
  } else {
    // Filter out objects without 'id'
    let filteredSavedData = savedData.filter(obj => obj.hasOwnProperty('id'));

    for (let student of studentList.students) {
      let isAlreadyInLocalStorage = filteredSavedData.some(obj => obj.id === student.id);

      if (!isAlreadyInLocalStorage) {
        filteredSavedData.push(student);
      }
    }

    // Update the localStorage with the modified data
    localStorage.setItem("studentData", JSON.stringify(filteredSavedData));
  }
}

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}