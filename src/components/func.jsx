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