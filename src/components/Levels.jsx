import React, { useState } from 'react';
import data from '../json/data.json';

export default function Levels ({ id }) {
  let selectedCriteria = data.criteria.find((criteria) => criteria.id == id)

  return (
    <>
      <div id="level-div">
        {
          selectedCriteria.tickBox ? (
            <div
              className="form-check mb-2"
              id="level-check-div">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Uppnår kriteria{" "}
              </label>
              <input
                className="form-check-input border border-2"
                type="checkbox"
                id="flexCheckDefault"/>
            </div>
          ) : (
            <div className="form-outline mb-2" id="level-select-div">
            <label htmlFor="level"> Uppnår: <span className="required-symbol">*</span></label>
            <select
              className="form-select border border-2"
              id="level"
              name="level">
              <option value="0">Välj nivå</option>
              {selectedCriteria.levels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          )
        }

      </div>
    </>
  );
};