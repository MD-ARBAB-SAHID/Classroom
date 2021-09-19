import React, { useContext } from "react";
import styles from "./Chart.module.css";
import CanvasJSReact from "../../assets/canvasjs.react";
import AuthContext from '../../store/auth-context';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = (props) => {
  const authCtx = useContext(AuthContext);
  const subjects = authCtx.subjects;
  // console.log(subjects);
  let dataArray = [];
  for (var i = 0; i < subjects.length; i++) {
    const dataObj = {
      id: subjects[i]._id,
      label: subjects[i].subjectName,
      y: subjects[i].attendancePercentage,
    };
    // console.log(subjects[i].attendancePercentage.toFixed());
    dataArray.push(dataObj);
  }
  // console.log(dataArray);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Attendance Chart",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points #5A5757
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        dataPoints: dataArray,
      },
    ],
  };
  // console.log('render');
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

export default BarChart;
