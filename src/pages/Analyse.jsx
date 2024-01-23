import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceMeh, faFaceFrown } from '@fortawesome/free-regular-svg-icons';

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

import Loading from '../components/Loading';
import { getTeacher } from '../components/func';

export default function Analyse() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState('');
  const [present, setPresent] = useState({"amount": 0, "percentage": 0});
  const [absent, setAbsent] = useState({"amount": 0, "percentage": 0});
  const [performances, setPerformances] = useState({
    good : {
      "amount": 0,
      "percentage": 0
    },
    neutral: {
      "amount": 0,
      "percentage": 0
    },
    bad: {
      "amount": 0,
      "percentage": 0
    }
  });

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      window.location.href = '/login';
    }

    function getData() {
      let studentId = JSON.parse(localStorage.getItem('studentId'));
      let students = JSON.parse(localStorage.getItem('studentData'));
      setStudent(students.find((student) => student.id === studentId));
    }
    
    if (loading) {
      getData();
      setLoading(false);
    }
    
    if (student.flag) {
      setFlag(student.flag);
    }
    
    if (student.activities) {
      let presentCount = 0;
      let absentCount = 0;
      let goodCount = 0;
      let neutralCount = 0;
      let badCount = 0;

      student.activities.forEach((activity) => {
        activity.updates.forEach((update) => {
          if (update.present) {
            presentCount++;
          } else {
            absentCount++;
          }

          if (update.performance === 'good') {
            goodCount++;
          } else if (update.performance === 'neutral') {
            neutralCount++;
          } else if (update.performance === 'bad') {
            badCount++;
          }
          const totalPerformances = goodCount + neutralCount + badCount;
          setPerformances((prevPerformances) => ({
            ...prevPerformances,
            good: {
              "amount": goodCount,
              "percentage": totalPerformances === 0 ? 0 : Math.round((goodCount / totalPerformances) * 100, 2)
            },
            neutral: {
              "amount": neutralCount,
              "percentage": totalPerformances === 0 ? 0 : Math.round((neutralCount / totalPerformances) * 100, 2)
            },
            bad: {
              "amount": badCount,
              "percentage": totalPerformances === 0 ? 0 : Math.round((badCount / totalPerformances) * 100, 2)
            }
          }));
        });
      });
      const totalUpdates = presentCount + absentCount;
      setPresent((prevPresent) => ({
        ...prevPresent,
        amount: presentCount,
        percentage: totalUpdates === 0 ? 0 : Math.round((presentCount / totalUpdates) * 100, 2),
      }));
      setAbsent((prevAbsent) => ({
        ...prevAbsent,
        amount: absentCount,
        percentage: totalUpdates === 0 ? 0 : Math.round((absentCount / totalUpdates) * 100, 2),
      }));
    }
  }, [loading]);

  

  const handleFlagChange = (e) => {
    setFlag(e.target.id);
    let studentId = JSON.parse(localStorage.getItem('studentId'));
    let students = JSON.parse(localStorage.getItem('studentData'));
    let selectedStudent = students.find((student) => student.id === studentId);
    selectedStudent.flag = e.target.id;
    localStorage.setItem('studentData', JSON.stringify(students));
  }

  return (
    <>
        <Container fluid>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Row className="pt-2">
                <Col xs={12} md={2} className='d-flex justify-content-center align-items-center'>
                  <button 
                    className='btn btn-primary py-3 px-4'
                    onClick={() => window.location.href = '/assessment'}
                  >
                    Tillbaka
                  </button>
                </Col>
                <Col xs={12} md={8} className='d-flex justify-content-center align-items-center'>
                  <Container className="text-center d-flex justify-content-center">
                    <h3 className="student-name d-inline-block">{student.name + " (åk. " + student.grade + ")"}</h3>
                  </Container>
                </Col>
                <Col xs={12} md={2} className='d-flex justify-content-center align-items-center'>
                  <div className="btn-group">
                    <input
                      type="radio"
                      className="btn-check flag-btn"
                      name="flag-options"
                      id="ok"
                      autoComplete="off"
                      onChange={handleFlagChange}
                      checked={flag === 'ok'}
                    />
                    <label
                      className="btn flag-label py-3 px-4"
                      htmlFor="ok"
                      style={{ backgroundColor: "#20b26b" }}
                    >
                      Ok
                    </label>
                    <input
                      type="radio"
                      className="btn-check flag-btn"
                      name="flag-options"
                      id="indentify"
                      autoComplete="off"
                      onChange={handleFlagChange}
                      checked={flag === 'indentify'}
                    />
                    <label
                      className="btn flag-label py-3 px-4"
                      htmlFor="indentify"
                      style={{ backgroundColor: "#ffe207" }}
                    >
                      Indikera
                    </label>
                    <input
                      type="radio"
                      className="btn-check flag-btn"
                      name="flag-options"
                      id="danger"
                      autoComplete="off"
                      onChange={handleFlagChange}
                      checked={flag === 'danger'}
                    />
                    <label
                      className="btn flag-label py-3 px-4"
                      htmlFor="danger"
                      style={{ backgroundColor: "#ff3d4d", color: "white" }}
                    >
                      Befara
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col xs={12} md={4}>
                  <Card className="p-4 my-2">
                    <h4 className="mb-4" style={{ textAlign: "center" }}>
                      Bedömningar
                    </h4>
                    {student.assessments.length > 0 ? (
                      <div className='d-flex justify-content-center'>
                        <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "300px", width: "100%" }}>
                          {student.assessments.map((assessment, index) => (
                            <li
                            className="list-group-item"
                            key={index}
                            style={{ marginBottom: "0.5em" }}
                            >
                              <p className="mb-0 d-flex justify-content-between">
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {assessment.gradingTool}
                                </span>
                                <small className="align-middle" style={{ color: "grey" }}>
                                  {assessment.date}
                                </small>
                              </p>
                              {assessment.teacher && (
                                <span>Lärare: {getTeacher(assessment.teacher).firstName + " " + getTeacher(assessment.teacher).lastName}</span>
                              )}
                              <div>
                                <Row className="d-flex justify-content-between">
                                  <span style={{ width: 'fit-content' }}>{assessment.area} &rarr; {assessment.criteria} &rarr; {assessment.level}</span>
                                </Row>
                                <Row className="d-flex justify-content-between">
                                  <span style={{ width: 'fit-content', color: 'grey' }}>Kommentar: {assessment.comment}</span>
                                </Row>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-center">Det har inte utförts några bedömningar</p>
                    )}
                  </Card>
                </Col>
                <Col xs={12} md={4}>
                  <Card className='p-4 my-2'>
                    <h4 className="mb-4" style={{ textAlign: "center" }}>
                      Aktiviteter
                    </h4>
                    <Row className='mb-2'>
                      <Col className='d-flex align-items-center justify-content-center'>
                          <span className='d-flex align-items-center'>
                            <FontAwesomeIcon icon={faFaceSmile} size='xl' style={{ backgroundColor: '#20b26b', width: 'fit-content', borderRadius: '5px' }} className='p-2' />
                            &nbsp;{performances.good.amount} ({performances.good.percentage}%)
                          </span>
                      </Col>
                      <Col className='d-flex align-items-center justify-content-center'>
                        <span className='d-flex align-items-center'>
                          <FontAwesomeIcon icon={faFaceMeh} size='xl' style={{ backgroundColor: '#ffe207', width: 'fit-content', borderRadius: '5px' }} className='p-2' />
                          &nbsp;{performances.neutral.amount} ({performances.neutral.percentage}%)
                        </span>
                      </Col>
                      <Col className='d-flex align-items-center justify-content-center'>
                        <span className='d-flex align-items-center'>
                          <FontAwesomeIcon icon={faFaceFrown} size='xl' style={{ backgroundColor: '#ff3d4d', width: 'fit-content', borderRadius: '5px' }} className='p-2' />
                          &nbsp;{performances.bad.amount} ({performances.bad.percentage}%)
                        </span>
                      </Col>
                    </Row>
                    <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "500px" }}>
                      {student.activities.length > 0 ? (
                        student.activities.map((activity) => (
                          <li
                            className="list-group-item"
                            key={activity.id}
                            style={{ marginBottom: "0.5em" }}
                          >
                            <p className="mb-0 d-flex justify-content-between">
                              <span
                                className="align-middle"
                                style={{ fontWeight: "bold" }}
                              >
                                {activity.name}
                              </span>
                              <small className="align-middle" style={{ color: "grey" }}>
                                {activity.date} - {activity.cancelDate === "" ? "Pågående" : activity.cancelDate}
                              </small>
                            </p>
                            <div>
                              <p>Avstämningar:</p>
                              {activity.updates.length > 0 ? (
                                <ul className="mx-2">
                                  {activity.updates.sort((a, b) => new Date(b.date) - new Date(a.date)).map((update, index) => (
                                    <li key={index}>
                                      <Row className="d-flex justify-content-between">
                                        <span style={{ color: "grey", width: 'fit-content' }}>{update.date}</span>
                                        {update.present && (
                                          <>
                                            {update.performance === 'good' && (
                                              <FontAwesomeIcon icon={faFaceSmile} size='xl' style={{ backgroundColor: '#20b26b', width: 'fit-content', borderRadius: '50%' }} className='p-1' />
                                            )}
                                            {update.performance === 'neutral' && (
                                              <FontAwesomeIcon icon={faFaceMeh} size='xl' style={{ backgroundColor: '#ffe207', width: 'fit-content', borderRadius: '50%' }} className='p-1' />
                                            )}
                                            {update.performance === 'bad' && (
                                              <FontAwesomeIcon icon={faFaceFrown} size='xl' style={{ backgroundColor: '#ff3d4d', width: 'fit-content', borderRadius: '50%' }} className='p-1' />
                                            )}
                                          </>
                                        )}
                                        <span style={{ color: update.present ? "#20b26b" : "#ff3d4d", width: 'fit-content' }}>
                                          {update.present ? "Närvarande" : "Frånvarande"}
                                        </span>
                                      </Row>
                                      <Row>
                                        {update.comment !== "" ? (
                                          <p>{update.comment}</p>
                                        ) : (
                                          <p>Ingen kommentar</p>
                                        )}
                                      </Row>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p style={{paddingLeft: '1em'}}>Inga avstämningar</p>
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-center">Det finns inga aktiviteter</p>
                      )}
                    </ul>
                  </Card>
                </Col>
                <Col xs={12} md={4}>
                  <Card className='p-4 my-2'>
                    <h4 className="mb-4" style={{ textAlign: "center" }}>
                      Närvaro under avstämningar
                    </h4>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <h5 className='text-center'>Närvarande</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className='text-center'>{present.amount}</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className='text-center'>({present.percentage}%)</h5>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <h5 className='text-center'>Frånvarande</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className='text-center'>{absent.amount}</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className='text-center'>({absent.percentage}%)</h5>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
    </>
  );
};