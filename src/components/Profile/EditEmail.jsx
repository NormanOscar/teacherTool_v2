import { useState } from "react";
import { Card } from "react-bootstrap";
import { saveUpdatedUser } from "../func";

export default function EditEmail() {
  const [inputValue, setInputValue] = useState("");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handleTextChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setInputResult({ msg: "E-post saknas", type: "danger" });
    } else {
      saveUpdatedUser("E-post", inputValue);
    }
  }

  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Byt E-post
        </h4>
        <form>
          {inputResult.msg !== null && (
            <div
              className={
                inputResult.type === "danger"
                  ? "alert alert-danger"
                  : "alert alert-success"
              }
              role="alert"
            >
              {inputResult.msg}
            </div>
          )}
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="inputValue">
              E-post <span className="required-symbol">*</span>
            </label>
            <input
              type="email"
              id="inputValue"
              value={inputValue}
              className="form-control"
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-2 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Spara
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}