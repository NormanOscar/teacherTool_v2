import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import studentData from '../json/studentData.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

export default function AutoComplete ({ change }) {
  studentData.students.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  const [selected, setSelected] = useState([]);
  function handleChange(selectedName) {
    selectedName = selectedName[0].split(" (åk. ");
    selectedName.splice(1, 1);
    setSelected(selectedName);
    change(selectedName[0]);
  }

  return (
    <Typeahead
      id="student_name"
      onChange={handleChange}
      options={studentData.students.map((student) => student.name + " (åk. " + student.grade + ")")}
      selected={selected}
    />
  );
};