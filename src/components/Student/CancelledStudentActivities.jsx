import { Row } from "react-bootstrap";

export default function CancelledStudentActivities({ student, page }) {
  return (
    <>
      <div className="flex-column align-items-center">
        {student.cancelledActivities > 0 ? (
          <div className="d-flex justify-content-center">

            <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "300px", width: "90%" }}>
              {student.activities.filter((activity) => activity.cancelled).map((activity) => (
                <li
                  className="list-group-item"
                  key={activity.id}
                  value={activity.id}
                  style={{ backgroundColor: page === 'student' ? "#ffffff" : "transparent", marginBottom: "0.5em", borderRadius: "5px" }}
                >
                  <p className="mb-0 d-flex justify-content-between">
                    <span
                      className="align-middle"
                      style={{ fontWeight: "bold" }}
                    >
                      {activity.name}
                    </span>
                    <small className="align-middle" style={{ color: "grey" }}>
                     {activity.date} - {activity.cancelDate}
                    </small>
                  </p>
                  <div>
                    <p className="mb-0">{activity.cancelComment}</p>
                  </div>
                  <hr />
                  <div>
                    <p>Avstämningar:</p>
                    {activity.updates.length > 0 ? (
                      <ul className="mx-2">
                        {activity.updates.sort((a, b) => new Date(b.date) - new Date(a.date)).map((update, index) => (
                          <li key={index}>
                            <Row className="d-flex justify-content-between">
                              <span style={{ color: "grey", width: 'fit-content' }}>{update.date}</span>
                              <span style={{ color: update.present ? "green" : "red", width: 'fit-content' }}>
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
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">Inga avslutade aktiviteter</p>
        )}
      </div>
    </>
  );
}