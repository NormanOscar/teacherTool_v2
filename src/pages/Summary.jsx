import React, { useState, useEffect } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFilePdf);

import MyDocument from "../components/Summary/MyDocument";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Summary() {
  const [loader, setLoader] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      !localStorage.getItem("userId") ||
      !localStorage.getItem("studentData")
    ) {
      window.location.href = "/login";
    }

    setStudent(
      JSON.parse(localStorage.getItem("studentData")).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      )
    );
  }, []);

  const handlePrint = () => {
    const documentToPrint = document.querySelector("#document-to-print");
    console.log(documentToPrint);
    setLoader(true);
    html2canvas(documentToPrint).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      setLoader(false);
      const documentName = `Sammanställning_${
        student.name
      }_${new Date().toLocaleDateString()}`;
      pdf.save(`${documentName}.pdf`);
    });
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col
            xs={12}
            md={2}
            className="d-flex justify-content-start align-items-center"
          >
            <button
              className="btn btn-primary py-3 px-4"
              onClick={() => (window.location.href = "/analyse")}
            >
              Tillbaka till analys
            </button>
          </Col>
          <Col
            xs={12}
            md={8}
            className="d-flex justify-content-center align-items-center"
          >
            <Container className="text-center d-flex justify-content-center">
              <h3 className="student-name d-inline-block">Sammanställning</h3>
            </Container>
          </Col>
          <Col
            xs={12}
            md={2}
            className="d-flex justify-content-end align-items-center"
          >
            <Dropdown>
              <Dropdown.Toggle className="btn btn-primary py-3 px-4">
                <span className="mx-2">Exportera till PDF</span>
                <FontAwesomeIcon size="xl" icon="fas fa-file-pdf" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="text-center" style={{ width: "100%" }}>
                <Dropdown.Item
                  onClick={() => {
                    console.log("Förhandsgranska");
                  }}
                >
                  Förhandsgranska
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handlePrint("l")}>
                  <span className="mx-2">Exportera</span>
                  <FontAwesomeIcon size="xl" icon="fas fa-file-pdf" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={10} className="text-center">
            <MyDocument id="document-to-print" student={student} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
