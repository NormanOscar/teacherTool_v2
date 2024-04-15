import React, { useState, useEffect } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFilePdf);

import MyDocument from "../components/Summary/MyDocument";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loading from "../components/Loading";
import { checkLoginAndData } from "../components/func";

export default function Summary() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginAndData();

    function getData() {
      setStudent(
        JSON.parse(localStorage.getItem("studentData")).find(
          (student) =>
            student.id === JSON.parse(localStorage.getItem("studentId"))
        )
      );
    }

    if (loading) {
      getData();
      setLoading(false);
    }
  }, [loading]);

  const handlePrint = () => {
    const documentToPrint = document.querySelector("#document-to-print");
    html2canvas(documentToPrint).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const documentName = `Sammanställning_${
        student.name
      }_${new Date().toLocaleDateString()}`;
      pdf.save(`${documentName}.pdf`);
    });
  };

  return (
    <>
      <Container fluid>
        {loading ? (
          <Loading />
        ) : (
          <>
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
                  <h3 className="student-name d-inline-block">
                    {student.name + " (" + student.class + ")"} - Sammanställning
                  </h3>
                </Container>
              </Col>
              <Col
                xs={12}
                md={2}
                className="d-flex justify-content-end align-items-center"
              >
                <button
                  className="btn btn-primary py-3 px-4"
                  onClick={() => handlePrint("l")}
                >
                  <span className="mx-1">Exportera till PDF</span>
                  <FontAwesomeIcon
                    size="xl"
                    icon="fas fa-file-pdf"
                    className="mx-1"
                  />
                </button>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={12} md={10} className="text-center">
                {Object.keys(student).length !== 0 && (
                  <MyDocument id="document-to-print" student={student} />
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
