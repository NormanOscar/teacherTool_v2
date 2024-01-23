import { Row, Col, Card } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen);

export default function ActivityList({ showModal, setObject, setEditType }) {
  let activities = JSON.parse(localStorage.getItem("activityData"));

  const removeActivity = (e) => {
    let activityId = e.currentTarget.id;
    let activityIndex = activities.findIndex((activity) => activity.id === activityId);
    activities.splice(activityIndex, 1);

    localStorage.setItem("activityData", JSON.stringify(activities));

    window.location.reload(false);
  };

  const handleEditClick = (e) => {
    let activityId = Number(e.currentTarget.id);
    let selectedActivity = activities.find((activity) => activity.id === activityId);
    setObject(selectedActivity);
    setEditType("activity");
    showModal();
  }

  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Aktiviteter
        </h4>
        <ul
          className="list-group list-group-flush overflow-auto custom-scrollbar"
          style={{ maxHeight: "400px" }}
        >
          {activities.map((activity, index) => {
            return (
              <li key={index} className="list-group-item">
                <Row>
                  <Col>
                    <p className="mb-0 d-flex justify-content-between">
                      {activity.name}
                    </p>
                    <p className="mb-0">{activity.description}</p>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <div className="mx-1">
                      <FontAwesomeIcon
                        icon={faPen}
                        size="lg"
                        className="icons"
                        id={activity.id}
                        onClick={handleEditClick}
                      />
                    </div>
                    <div className="mx-1">
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="lg"
                        color="red"
                        className="icons"
                        id={activity.id}
                        onClick={removeActivity}
                      />
                    </div>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
