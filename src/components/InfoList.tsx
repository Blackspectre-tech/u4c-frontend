import React from "react";

interface InfoListProps {
  data?: any[];
  className?: string;
}

const InfoList: React.FC<InfoListProps> = ({ data = [], className = "" }) => {
  return (
    <ul className={className}>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default InfoList;
