import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function FlaggedStudents() {
  const [flaggedStudents, setFlaggedStudents] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentData"));
    const flagged = storedData.filter((student) => student.flag);

    flagged.sort((a, b) => {
      const order = ["danger", "indicate", "ok"];
      return order.indexOf(a.flag) - order.indexOf(b.flag);
    });

    setFlaggedStudents(flagged);
  }, []);

  const handleClick = (e) => {
    localStorage.setItem("studentId", JSON.stringify(e.currentTarget.value));
    window.location.href = "/student";
  };

  const getFilterButtonStyle = (option) => {
    const activeColorMap = {
      all: { background: "#0A5ED7", text: "white" },
      ok: { background: "#20b26b", text: "black" },
      indicate: { background: "#ffe207", text: "black" },
      danger: { background: "#ff3d4d", text: "white" },
    };

    const defaultColor = "#ededed";

    return {
      backgroundColor:
        filterOption === option
          ? activeColorMap[option].background
          : defaultColor,
      color: filterOption === option ? activeColorMap[option].text : "black",
      border: "none",
    };
  };

  const handleFilter = (e) => {
    setFilterOption(e.currentTarget.id);

    let filteredStudents = [];

    switch (e.currentTarget.id) {
      case "all":
        filteredStudents = JSON.parse(
          localStorage.getItem("studentData")
        ).filter((student) => student.flag);
        break;
      case "ok":
        filteredStudents = JSON.parse(
          localStorage.getItem("studentData")
        ).filter((student) => student.flag === "ok");
        break;
      case "indicate":
        filteredStudents = JSON.parse(
          localStorage.getItem("studentData")
        ).filter((student) => student.flag === "indicate");
        break;
      case "danger":
        filteredStudents = JSON.parse(
          localStorage.getItem("studentData")
        ).filter((student) => student.flag === "danger");
        break;
      default:
        break;
    }

    // Sort flagged students based on the order "danger, indicate, ok"
    filteredStudents.sort((a, b) => {
      const order = ["danger", "indicate", "ok"];
      return order.indexOf(a.flag) - order.indexOf(b.flag);
    });

    setFlaggedStudents(filteredStudents);
  };

  return (
    <>
      <Card className="p-3 my-2">
        <h3 className="mb-4" style={{ textAlign: "center" }}>
          Flaggade elever
        </h3>
        <Col>
          <Row className="mb-3 d-flex justify-content-center">
            <div className="btn-group w-50 flex-wrap">
              <input
                type="radio"
                className="btn-check"
                name="filter-options"
                id="all"
                defaultChecked
                onChange={handleFilter}
              />
              <label
                className="btn"
                htmlFor="all"
                style={getFilterButtonStyle("all")}
              >
                Alla
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter-options"
                id="ok"
                onChange={handleFilter}
              />
              <label
                className="btn"
                htmlFor="ok"
                style={getFilterButtonStyle("ok")}
              >
                OK
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter-options"
                id="indicate"
                onChange={handleFilter}
              />
              <label
                className="btn"
                htmlFor="indicate"
                style={getFilterButtonStyle("indicate")}
              >
                Indikera
              </label>
              <input
                type="radio"
                className="btn-check"
                name="filter-options"
                id="danger"
                onChange={handleFilter}
              />
              <label
                className="btn"
                htmlFor="danger"
                style={getFilterButtonStyle("danger")}
              >
                Befara
              </label>
            </div>
          </Row>
          <Row className="d-flex justify-content-center">
            <ul
              className="list-group overflow-auto custom-scrollbar"
              style={{ maxHeight: "300px", width: "90%" }}
              id="current-activities"
            >
              {flaggedStudents.length != 0 ? (
                flaggedStudents.map((student) => (
                  <li
                    className="list-group-item list-group-item-action flex-column align-items-center"
                    value={student.id}
                    key={student.id}
                    style={{ cursor: "pointer" }}
                    onClick={handleClick}
                  >
                    <div className="d-flex w-150 justify-content-between">
                      <h5 className="mb-0 py-1">
                        {student.name + " (" + student.class + ")"}
                      </h5>
                      <span
                        className="px-2 py-1"
                        style={{
                          backgroundColor: getFlagColor(student.flag)
                            .background,
                          color: getFlagColor(student.flag).text,
                          borderRadius: "5px",
                        }}
                      >
                        {getFlagText(student.flag)}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center m-0">Inga flaggade elever</p>
              )}
            </ul>
          </Row>
        </Col>
      </Card>
    </>
  );
}

function getFlagColor(flag) {
  if (flag === "ok") {
    return { background: "#20b26b", text: "black" };
  } else if (flag === "indicate") {
    return { background: "#ffe207", text: "black" };
  } else if (flag === "danger") {
    return { background: "#ff3d4d", text: "white" };
  }
}

function getFlagText(flag) {
  if (flag === "ok") {
    return "OK";
  } else if (flag === "indicate") {
    return "Indikera";
  } else if (flag === "danger") {
    return "Befara";
  }
}
