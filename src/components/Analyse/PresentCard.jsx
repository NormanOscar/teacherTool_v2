import { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";

export default function PresentCard({ student, setPerformances }) {
  const [present, setPresent] = useState({ amount: 0, percentage: 0 });
  const [absent, setAbsent] = useState({ amount: 0, percentage: 0 });

  useEffect(() => {
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

          if (update.performance === "good") {
            goodCount++;
          } else if (update.performance === "neutral") {
            neutralCount++;
          } else if (update.performance === "bad") {
            badCount++;
          }
          const totalPerformances = goodCount + neutralCount + badCount;
          setPerformances((prevPerformances) => ({
            ...prevPerformances,
            good: {
              amount: goodCount,
              percentage:
                totalPerformances === 0
                  ? 0
                  : Math.round((goodCount / totalPerformances) * 100, 2),
            },
            neutral: {
              amount: neutralCount,
              percentage:
                totalPerformances === 0
                  ? 0
                  : Math.round((neutralCount / totalPerformances) * 100, 2),
            },
            bad: {
              amount: badCount,
              percentage:
                totalPerformances === 0
                  ? 0
                  : Math.round((badCount / totalPerformances) * 100, 2),
            },
          }));
        });
      });
      const totalUpdates = presentCount + absentCount;
      setPresent((prevPresent) => ({
        ...prevPresent,
        amount: presentCount,
        percentage:
          totalUpdates === 0
            ? 0
            : Math.round((presentCount / totalUpdates) * 100, 2),
      }));
      setAbsent((prevAbsent) => ({
        ...prevAbsent,
        amount: absentCount,
        percentage:
          totalUpdates === 0
            ? 0
            : Math.round((absentCount / totalUpdates) * 100, 2),
      }));
    }
  }, []);

  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Närvaro under avstämningar
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
      </Card>
    </>
  )
}