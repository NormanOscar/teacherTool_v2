import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import studentData from '../json/studentData.json';
import AutoComplete from '../components/AutoComplete';
import CurrentInterventions from '../components/CurrentInterventions';

export default function Home() {
  const [name, setName] = useState('');
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  
  function changeInputText (newValue) {
    setName(newValue);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '') {
      let student = studentData.students.filter((student) => student.name + " (åk. " + student.grade + ")" === name);
      if (student.length > 0) {
        localStorage.setItem("studentId", JSON.stringify(student[0].id));
        navigate('/assessment');
      }
      else {
        setInputError(true);
      }
    }
    else {
      setInputError(true);
    }
  };
  return (
    <>
      <div className="h-100">
        <div className="d-flex justify-content-center main-div">
          <form className="my-5" id="form-block">
            <h1 className="mb-4" style={{textAlign: 'center'}}>Hämta elev</h1>
            {inputError && (
              <div className="alert alert-danger" role="alert">
                Eleven finns ej
              </div>
            )}
            <div className="form-outline mb-4">
              <p style={{margin:0}}>Elevens namn: <span className="required-symbol">*</span></p>
              <AutoComplete change={changeInputText} />
            </div>

            <button className="btn btn-primary btn-block w-100 mb-2 submitBtn" onClick={handleSubmit}>
              Sök
            </button> 
          </form>
        </div>
        <CurrentInterventions />
      </div>
    </>
  );
};