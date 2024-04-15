import { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";

import Loading from "../Loading";
import { checkLoginAndData, getTeacher } from "../func";

export default function MyDocument({ id, student }) {
  const [present, setPresent] = useState({ amount: 0, percentage: 0 });
  const [absent, setAbsent] = useState({ amount: 0, percentage: 0 });
  const [finalAssessment, setFinalAssessment] = useState({});
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getData() {
      const currentAssessment = student.finalAssessments.find(
        (assessment) =>
          assessment.id ===
          JSON.parse(localStorage.getItem("finalAssessmentId"))
      );
      setFinalAssessment(currentAssessment);

      const currentTeacher = getTeacher(currentAssessment.teacher);
      setTeacher(currentTeacher);

      let presentCount = 0;
      let absentCount = 0;

      student.assessments.map((assessment) => {
        presentCount++;
      });

      student.activities.map((activity) => {
        activity.updates.map((update) => {
          update.present ? presentCount++ : absentCount++;
        });
      });
      const total = presentCount + absentCount;
      setPresent((prevPresent) => ({
        ...prevPresent,
        amount: presentCount,
        percentage:
          total === 0 ? 0 : Math.round((presentCount / total) * 100, 2),
      }));
      setAbsent((prevAbsent) => ({
        ...prevAbsent,
        amount: absentCount,
        percentage:
          total === 0 ? 0 : Math.round((absentCount / total) * 100, 2),
      }));
    }

    if (loading) {
      checkLoginAndData();
      getData();
      setLoading(false);
    }
  }, [student]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id={id} className="px-4">
          <Row>
            <Col xs={12} md={4}>
              <Card className="p-2 my-2">
                <Card.Body>
                  <h4 className="m-0">{student.name}</h4>
                  <div className="mt-2">
                    <p className="my-1">
                      {student.bornInSweden ? (
                        <strong>Född i Sverige</strong>
                      ) : (
                        <>
                          <strong>Ankomst:</strong> {student.arrivalYear}
                        </>
                      )}
                    </p>
                    <p className="my-1">Födelseår: {student.birthYear}</p>
                    <p className="my-1">Klass: {student.class}</p>
                    <p className="m-0">{student.email}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-2 my-2">
                <Card.Body>
                  <h4 className="text-center text-decoration-underline">
                    Info
                  </h4>
                  <p className="my-1">{finalAssessment.date}</p>
                  <p className="my-1">
                    <strong>Lärare:</strong>{" "}
                    {teacher.firstName === "Admin"
                      ? teacher.firstName
                      : teacher.firstName + " " + teacher.lastName}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-2 my-2">
                <Card.Body>
                  <h4 className="text-center text-decoration-underline">
                    Närvaro
                  </h4>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="text-center">Närvarande</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 className="text-center">{present.amount}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 className="text-center">
                            ({present.percentage}%)
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="text-center">Frånvarande</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 className="text-center">{absent.amount}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 className="text-center">
                            ({absent.percentage}%)
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Card className="p-4 my-2">
                <Card.Body>
                  <h4 className="mb-4 text-center text-decoration-underline">
                    Sammanställning
                  </h4>
                  <Row>
                    <Col>
                      <h5 className="text-center">Vad har gått bra?</h5>
                      <p>{finalAssessment.good}</p>
                    </Col>
                    <Col>
                      <h5 className="text-center">Vad har gått mindre bra?</h5>
                      <p>{finalAssessment.bad}</p>
                    </Col>
                    <Col>
                      <h5 className="text-center">Vad är nästa steg?</h5>
                      <p>{finalAssessment.nextStep}</p>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <h5 className="text-center">Behöver extra anpassning?</h5>
                      <p>{finalAssessment.extra ? "Ja" : "Nej"}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
