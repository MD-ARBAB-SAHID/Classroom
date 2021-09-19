import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import styles from "./Chart.module.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {
  const { subject } = props;
  let dataArray = [];

  if (subject.attendedClasses > 0) {
    const attendedObj = { name: "Attended", y: subject.attendedClasses };
    dataArray.push(attendedObj);
  }
  if (subject.unattendedClasses > 0) {
    const unattendedObj = { name: "Unattended", y: subject.unattendedClasses };
    dataArray.push(unattendedObj);
  }
  if (subject.classesCanceled > 0) {
    const cancelObj = { name: "Cancelled", y: subject.classesCanceled };
    dataArray.push(cancelObj);
  }

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: subject.subjectName,
      
    },
    subtitles: [
      {
        text: `${subject.attendancePercentage.toFixed()}% Attendance`,
        verticalAlign: "center",
        fontSize: 24,
        fontColor:'rgb(10, 28, 67)',
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,### ",
        dataPoints: dataArray,
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default PieChart;
