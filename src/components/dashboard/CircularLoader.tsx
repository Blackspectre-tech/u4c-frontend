interface PercentageCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
}

export default function PercentageCircle({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "#812880",
  backgroundColor = "#fff",
  outerBorderColor = "#fff",
  outerBorderWidth = 3,
  innerBorderColor = "#fff",
  innerBorderWidth = 4,
}: PercentageCircleProps) {
  const radius = size / 2;
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const dash = (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`-${outerBorderWidth} -${outerBorderWidth} ${
          size + outerBorderWidth * 2
        } ${size + outerBorderWidth * 2}`}
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background ring (thick to fill gap) */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius + outerBorderWidth / 2}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth + outerBorderWidth}
        />

        {/* Progress ring */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />

        {/* Outer border */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius + strokeWidth / 2}
          fill="none"
          stroke={outerBorderColor}
          strokeWidth={outerBorderWidth}
        />

        {/* Inner border (blend inward) */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius - strokeWidth / 2}
          fill="none"
          stroke={innerBorderColor}
          strokeWidth={innerBorderWidth}
        />
      </svg>
    </div>
  );
}
