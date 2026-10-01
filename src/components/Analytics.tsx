"use client";

import { useGetStatsQuery } from "@/redux/api/main";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  desc: string;
};

function useCountUp(target: number, duration = 1800, triggered: boolean) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!triggered || target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration, isDecimal]);

  return count;
}

function StatCard({
  stat,
  triggered,
  index,
}: {
  stat: Stat;
  triggered: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 1600 + index * 100, triggered);

  return (
    <div className="bg-gray-500 border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-2 text-white backdrop-blur-sm">
      <p className="text-4xl sm:text-5xl font-bold tracking-tight">
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="text-lg font-semibold mt-1">{stat.label}</p>
      <p className="text-sm text-white/70">{stat.desc}</p>
    </div>
  );
}

function Analytics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const { data } = useGetStatsQuery({ params: {} });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats: Stat[] = [
    {
      value: data?.total_members ?? 0,
      prefix: "",
      suffix: "",
      label: "Total Members",
      desc: "Donors and NGOs on the platform",
    },
    {
      value: data?.total_donations ?? 0,
      prefix: "$",
      suffix: "",
      label: "Total Funds Raised",
      desc: "In transparent, on-chain donations",
    },
    {
      value: data?.live_campaigns ?? 0,
      prefix: "",
      suffix: "",
      label: "Live Campaigns",
      desc: "Actively raising funds right now",
    },
    {
      value: data?.completed_campaigns ?? 0,
      prefix: "",
      suffix: "",
      label: "Completed Campaigns",
      desc: "Projects fully funded and delivered",
    },
    {
      value: data?.["Beneficiaries Reached"] ?? 0,
      prefix: "",
      suffix: "",
      label: "Beneficiaries Reached",
      desc: "Lives impacted through funded projects",
    },
  ];

  return (
    <div ref={sectionRef} className="relative bg-[#fee4d8]/50 p-5 sm:py-20">
      <Image
        src="https://lifeseasons.com/cdn/shop/files/Brand_Header.svg?v=1772833356&width=2000"
        className="absolute inset-0 w-full h-full object-cover grayscale-100 opacity-10"
        alt=""
        fill
      />

      <div className="flex flex-col items-center gap-3 mb-12 text-center">
        <h1 className="font-semibold text-3xl">Impact by the Numbers</h1>
        <p className="max-w-lg">
          Real numbers. Real people. Building a more transparent and accountable
          world together.
        </p>
      </div>

      <div className="md:px-20 lg:px-0 xl:px-30">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              triggered={triggered}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
