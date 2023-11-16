import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import studentData from '../json/studentData.json';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

export default function AutoComplete ({ change }) {
  studentData.students.sort(function (a, b) {
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
      options={studentData.students.map((student) => student.name + " (åk. " + student.grade + ")")}
      selected={selected}
    />
  );
};