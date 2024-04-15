import { students } from "../json/studentList.json";
import { users } from "../json/userList.json";
import { activities } from "../json/activities.json";

export function checkLoginAndData() {
  const path = window.location.href.split("/");
  if ((!localStorage.getItem("login") || !localStorage.getItem("userId")) && path[path.length -1] !== "login") {
    window.location.href = "/login";
  }
  if (!localStorage.getItem("studentData")) {
    addStudentsToLocalStorage();
  }
  if (!localStorage.getItem("activityData")) {
    addActivitiesToLocalStorage();
  }
  if (!localStorage.getItem("userData")) {
    addUsersToLocalStorage();
  }
}

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
    let filteredSavedData = savedData.filter((obj) => obj.hasOwnProperty("id"));

    for (let student of students) {
      let isAlreadyInLocalStorage = filteredSavedData.some(
        (obj) => obj.id === student.id
      );

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
    let filteredSavedData = savedData.filter((obj) => obj.hasOwnProperty("id"));

    for (let user of users) {
      let isAlreadyInLocalStorage = filteredSavedData.some(
        (obj) => obj.id === user.id
      );

      if (!isAlreadyInLocalStorage) {
        filteredSavedData.push(user);
      }
    }

    // Update the localStorage with the modified data
    localStorage.setItem("userData", JSON.stringify(filteredSavedData));
  }
}

export function addActivitiesToLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("activityData"));
  if (savedData === null) {
    let activityDataList = [];
    for (let i = 0; i < activities.length; i++) {
      activityDataList.push(activities[i]);
    }
    localStorage.setItem("activityData", JSON.stringify(activityDataList));
  } else {
    // Filter out objects without 'id'
    let filteredSavedData = savedData.filter((obj) => obj.hasOwnProperty("id"));

    for (let activity of activities) {
      let isAlreadyInLocalStorage = filteredSavedData.some(
        (obj) => obj.id === activity.id
      );

      if (!isAlreadyInLocalStorage) {
        filteredSavedData.push(activity);
      }
    }

    // Update the localStorage with the modified data
    localStorage.setItem("activityData", JSON.stringify(filteredSavedData));
  }
}

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
  const day = today.getDate().toString().padStart(2, "0"); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function saveUpdatedUser(field, inputValue) {
  let users = JSON.parse(localStorage.getItem("userData"));
  let user = users.find(
    (user) => user.id === JSON.parse(localStorage.getItem("userId"))
  );

  switch (field) {
    case "Förnamn":
      user.firstName = inputValue;
      break;
    case "Efternamn":
      user.lastName = inputValue;
      break;
    case "E-post":
      user.email = inputValue;
      break;
    case "Användarnamn":
      user.username = inputValue;
      break;
    case "Lösenord":
      user.password = inputValue;
      break;
    default:
      break;
  }

  localStorage.setItem("userData", JSON.stringify(users));

  window.location.href = "/profile";
}

export function getTeacher(teacherId) {
  let teachers = JSON.parse(localStorage.getItem("userData"));
  return teachers.find((teacher) => teacher.id === teacherId);
}

export function getTimelineData(student) {
  let items = [];
  let id = 0;

  student.assessments.map((assessment) => {
    let assessmentDate = new Date(assessment.date);
    items.push({
      id: id,
      date: assessmentDate,
      type: "Bedömning",
      name: assessment.gradingTool,
      color: "#00A8CC",
      obj: assessment,
    });
    id++;
  });

  student.activities.map((activity) => {
    activity.updates.map((update) => {
      let updateDate = new Date(update.date);
      items.push({
        id: id,
        date: updateDate,
        type: "Avstämning",
        name: "",
        color: "#D0BFFF",
        obj: update,
        activity: activity,
      });
      id++;
    });
  });

  return items;
}

export function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

export function createWeekDay(id, items, startWeek, index) {
  let days = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];
  let dayItems = items.filter(
    (item) =>
      getWeekNumber(item.date) === startWeek + index &&
      new Date(item.date).getDay() === id + 1
  );

  let dots = [];
  for (let i = 0; i < dayItems.length; i++) {
    dots.push({
      color: dayItems[i].color,
      present:
        dayItems[i].type === "Bedömning" ? true : dayItems[i].obj.present,
      obj: dayItems[i].obj,
      type: dayItems[i].type,
      activity: dayItems[i].type === "Avstämning" ? dayItems[i].activity : null,
    });
  } // Extract dot color information from the items, if any

  let day = {
    day: days[id],
    dots: dots, // Include dot information in the day object
  };
  return day;
}

export function checkIfToday(week, day) {
  let weekdays = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];
  let today = new Date();
  let currentWeek = getWeekNumber(today);
  let currentDay = weekdays[today.getDay() - 1];

  if (currentWeek === week && currentDay === day) {
    return true;
  } else {
    return false;
  }
}
