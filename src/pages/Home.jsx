import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import studentData from '../json/studentData.json';
import AutoComplete from '../components/AutoComplete';
import CurrentInterventions from '../components/CurrentInterventions';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  function changeInputText (newValue) {
    setName(newValue)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '') {
      let student = studentData.students.filter((student) => student.name === name);
      localStorage.setItem("studentId", JSON.stringify(student[0].id));
      navigate('/assessment');
    }
  };
  return (
    <>
      <div className="h-100">
        <div className="d-flex justify-content-center mt-5 main-div">
          <form className="mb-4" id="form-block">
            <h1 className="mb-4" style={{textAlign: 'center'}}>Hämta elev</h1>
            <div className="form-outline mb-4">
              <label htmlFor="name">Elevens namn: <span className="required-symbol">*</span></label>
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