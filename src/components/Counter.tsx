import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end?: number;
  decimals?: number;
}

const Counter: React.FC<CounterProps> = ({ end = 100, decimals = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <span className="count" data-to={end} ref={ref}>
      {inView ? <CountUp end={end} duration={1} decimals={decimals} /> : 0}
    </span>
  );
};

export default Counter;
