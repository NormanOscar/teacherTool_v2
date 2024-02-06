import { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { getTimelineData } from "../func";

import Loading from "../Loading";
import TimelineModal from "./TimeLineModal";

export default function Timeline() {
  const [timeLineData, setTimeLineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const getData = () => {
      const storedData = JSON.parse(localStorage.getItem("studentData")).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      );
      let items = getTimelineData(storedData);

      items.sort((a, b) => a.date - b.date);

      setTimeLineData(items);
    };

    if (loading) {
      getData();
      setLoading(false);
    }
  }, []);

  const showTimeLineItem = (e) => {
    let item = timeLineData.find((item) => item.id === parseInt(e.currentTarget.id));
    console.log(item);
    setModalData(item);
    setShowModal(true);
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {showModal && (
            <TimelineModal item={modalData} show={showModal} onClose={closeModal} />
          )}
          <Row className="mb-3">
            <Col xs={12} md={3}></Col>
            <Col xs={12} md={6}>
              <h3 className="text-center m-0">Tidslinje</h3>
            </Col>
            <Col xs={12} md={3} className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#F28800" }}
                />
                <span>&nbsp;Bedömning</span>
              </div>
              <div className="d-flex align-items-center">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#00A8CC" }}
                />
                <span>&nbsp;Aktivitet</span>
              </div>
              <div className="d-flex align-items-center">
                <span
                  className="timeLine-dot"
                  style={{ backgroundColor: "#DC6390" }}
                />
                <span>&nbsp;Avstämning</span>
              </div>
            </Col>
          </Row>
          <Col xs={12} md={12}>
            <Row>
              {timeLineData.map((item, index) => (
                <Col
                  key={index}
                  className="d-flex flex-column align-items-center"
                >
                  <p
                    className={`text-center mb-2 timeLine-text ${hoveredIndex === index ? 'underline' : ''}`}
                    id={item.id}
                    onClick={showTimeLineItem}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.date.toISOString().substring(0, 10)}
                  </p>
                  <span
                    className="timeLine-dot"
                    style={{ backgroundColor: item.color }}
                    onClick={showTimeLineItem}
                    id={item.id}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={handleMouseLeave}
                  />
                </Col>
              ))}
              <div className="timeLine-line"></div>
            </Row>
          </Col>
        </>
      )}
    </>
  );
}
