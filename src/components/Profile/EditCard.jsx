import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { saveUpdatedUser } from "../func";

export default function EditCard({ field }) {

  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Byt {field}
        </h4>
        <form>
          {field === "Lösenord" ? (
            <>
              
            </>
          ) : (
            <div className="form-outline mb-2">
              <label style={{ margin: 0 }} htmlFor="inputValue">
                {field} <span className="required-symbol">*</span>
              </label>
              <input
                type="text"
                id="inputValue"
                value={inputValue}
                className="form-control"
                onChange={handleTextChange}
              />
            </div>
          )}
        </form>
      </Card>
    </>
  );
}

