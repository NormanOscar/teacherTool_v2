import { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { addStudentsToLocalStorage, addActivitiesToLocalStorage } from "../func";

export default function AutoComplete ({ change }) {
  const students = JSON.parse(localStorage.getItem('studentData'));
  console.log(students);
  if (!students) {
    addStudentsToLocalStorage();
    addActivitiesToLocalStorage();
  }
  students.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  const [selected, setSelected] = useState([]);

  function handleSelectChange(selectedName) {
    setSelected(selectedName);
    change(selectedName[0]);
  }

  function handleTypeChange(selectedName) {
    change(selectedName);
  }

  return (
    <Typeahead
      id="name"
      onChange={handleSelectChange}
      onInputChange={handleTypeChange}
      options={students.map((student) => student.name + " (åk. " + student.grade + ")")}
      selected={selected}
    />
  );
};