import { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';

export default function Timeline() {
  const [timeLineData, setTimeLineData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('studentData')).find((student) => student.id === JSON.parse(localStorage.getItem('studentId')));
    let items = [];

    // Add assessments to timeline
      storedData.assessments.forEach(assessment => {
        items.push({
          title: `Assessment`,
          cardTitle: `Grading Tool: ${assessment.gradingTool}`,
          cardSubtitle: `Area: ${assessment.area} - Criteria: ${assessment.criteria}`,
          cardDetailedText: `Level: ${assessment.level}`,
          cardDetailedTextSubtitle: `Date: ${assessment.date}`,
          cardDetailedTextFooter: `Teacher: ${assessment.teacher}`,
          date: new Date(assessment.date),
          type: 'assessment'
        });
      });

      // Add activities and updates to timeline
      storedData.activities.forEach(activity => {
        items.push({
          title: `${activity.name}`,
          cardTitle: `${activity.name}`,
          cardSubtitle: `${activity.date}`,
          date: new Date(activity.date),
          type: 'activity'
        });

        activity.updates.forEach(update => {
          items.push({
            title: `Update`,
            cardTitle: `Performance: ${update.performance}`,
            cardSubtitle: `Date: ${update.date}`,
            cardDetailedText: `Comment: ${update.comment}`,
            date: new Date(update.date),
            type: 'update'
          });
        });
      });

    items.sort((a, b) => a.date - b.date);
  
    setTimeLineData(items);
  }, []);
  console.log(timeLineData);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {timeLineData === null ? (
        <p>Loading...</p>
      ) : (
        <Chrono items={timeLineData} mode="HORIZONTAL" style={{ width: '100%' }} />
      )}
    </div>
  );
}