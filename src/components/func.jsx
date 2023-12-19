import { students } from "../json/studentList.json";
import { users } from "../json/userList.json";

export function addStudentsToLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("studentData"));
  if (savedData === null) {
    let studentDataList = [];
    for (let i = 0; i < students.length; i++) {
      studentDataList.push(students[i]);
    }
    localStorage.setItem("studentData", JSON.stringify(studentDataList));
  } else {
    // Filter out objects without 'id'
    let filteredSavedData = savedData.filter(obj => obj.hasOwnProperty('id'));

    for (let student of students) {
      let isAlreadyInLocalStorage = filteredSavedData.some(obj => obj.id === student.id);

      if (!isAlreadyInLocalStorage) {
        filteredSavedData.push(student);
      }
    }

    // Update the localStorage with the modified data
    localStorage.setItem("studentData", JSON.stringify(filteredSavedData));
  }
}

export function addUsersToLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("userData"));
  if (savedData === null) {
    let userDataList = [];
    for (let i = 0; i < users.length; i++) {
      userDataList.push(users[i]);
    }
    localStorage.setItem("userData", JSON.stringify(userDataList));
  } else {
    // Filter out objects without 'id'
    let filteredSavedData = savedData.filter(obj => obj.hasOwnProperty('id'));

    for (let user of users) {
      let isAlreadyInLocalStorage = filteredSavedData.some(obj => obj.id === user.id);

      if (!isAlreadyInLocalStorage) {
        filteredSavedData.push(user);
      }
    }

    // Update the localStorage with the modified data
    localStorage.setItem("userData", JSON.stringify(filteredSavedData));
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