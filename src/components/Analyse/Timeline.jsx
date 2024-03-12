import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { getTimelineData, getWeekNumber, createWeekDay } from "../func";
import Loading from "../Loading";
import TimelineDot from "./TimelineDot";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [timeLines, setTimeLines] = useState([]);

  useEffect(() => {
    const getData = () => {
      const storedData = JSON.parse(localStorage.getItem("studentData")).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      );
      let items = getTimelineData(storedData);

      items.sort((a, b) => a.date - b.date);

      if (items.length > 0) {
        let startWeek = getWeekNumber(items[0].date);
        let currentWeek = getWeekNumber(new Date());
        let nrOfWeeks = currentWeek - startWeek + 1;

        while (nrOfWeeks % 8 !== 0) {
          nrOfWeeks++;
        }

        let tempTimeLine = []; // Temporary array to hold batches of 8 weeks
        for (let i = 0; i < nrOfWeeks; i++) {
          let days = [];
          for (let j = 0; j < 7; j++) {
            days.push(createWeekDay(j, items, startWeek, i));
          }
          let week = {
            week: startWeek + i,
            days: days,
          };
          tempTimeLine.push(week);

          if (tempTimeLine.length === 8) {
            timeLines.push(tempTimeLine);
            tempTimeLine = []; // Reset tempTimeLine
          }
        }
      }
    };

    if (loading) {
      getData();
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Row className="mb-3">
            <Col xs={12} md={3}></Col>
            <Col xs={12} md={6}>
              <h3 className="text-center m-0">Tidslinje</h3>
            </Col>
            <Col xs={12} md={3} className="d-flex justify-content-end">
              <div className="d-flex align-items-center me-2">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#00A8CC" }}
                />
                <span>&nbsp;Bedömning</span>
              </div>
              <div className="d-flex align-items-center me-2">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#D0BFFF" }}
                />
                <span>&nbsp;Avstämning</span>
              </div>
              <div className="d-flex align-items-center">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#FF3126" }}
                />
                <span>&nbsp;Frånvarande</span>
              </div>
            </Col>
          </Row>
          <Row
            className="overflow-auto custom-scrollbar"
            style={{ maxHeight: "300px", width: "100%" }}
          >
            {timeLines.map(
              (weeks, outerIndex) =>
                weeks.length > 0 && (
                  <Row className="my-3" key={"timeLine" + (outerIndex + 1)}>
                    {weeks.map((week, innerIndex) => (
                      <Col
                        key={"week" + (outerIndex + 1) + "-" + (innerIndex + 1)}
                        className="p-0"
                      >
                        <Col className="d-flex p-0">
                          {week.days.map((day, index) =>
                            day.day === "Måndag" ? (
                              <Col
                                key={
                                  "day" + (outerIndex + 1) + "-" + (index + 1)
                                }
                              >
                                <div className="week-name">
                                  {"v. " + week.week}
                                </div>
                                <div
                                  style={{
                                    height: "60px",
                                    borderLeft: "1px solid black",
                                  }}
                                  className="d-flex flex-column justify-content-end"
                                >
                                  {day.dots.length > 0 &&
                                    day.dots.map((dot, dotIndex) => (
                                      <TimelineDot
                                        dot={dot}
                                        index={dotIndex}
                                        key={
                                          "dot" +
                                          (outerIndex + 1) +
                                          "-" +
                                          (dotIndex + 1)
                                        }
                                      />
                                    ))}
                                </div>
                              </Col>
                            ) : (
                              <Col
                                key={
                                  "day" + (outerIndex + 1) + "-" + (index + 1)
                                }
                                className="d-flex align-items-end"
                              >
                                <div
                                  style={{
                                    height: "50px",
                                    borderLeft: "1px solid black",
                                  }}
                                  className="d-flex flex-column justify-content-end"
                                >
                                  {day.dots.length > 0 &&
                                    day.dots.map((dot, dotIndex) => (
                                      <TimelineDot
                                        dot={dot}
                                        index={dotIndex}
                                        key={
                                          "dot" +
                                          (outerIndex + 1) +
                                          "-" +
                                          (dotIndex + 1)
                                        }
                                      />
                                    ))}
                                </div>
                              </Col>
                            )
                          )}
                        </Col>
                      </Col>
                    ))}
                    <div
                      className="timeLine-line"
                      key={"line" + (outerIndex + 1)}
                    />
                  </Row>
                )
            )}
          </Row>
        </>
      )}
    </>
  );
}
