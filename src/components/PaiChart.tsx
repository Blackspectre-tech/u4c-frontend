import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PaiChart = ({ percentage }: { percentage: any }) => {
  return (
    <div style={{ width: 130, height: 130 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // Colors
          pathColor: `#33b2ba`,
          textColor: "#f3f4f6 ",
          trailColor: "#d6d6d6",
          backgroundColor: "#ffffff",

          // Customization
          strokeLinecap: "round", // Can be 'butt' or 'round'
          textSize: "16px",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
};

export default PaiChart;
