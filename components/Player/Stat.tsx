import React from "react";

interface Props {
  title: string;
  value: any;
  loading: boolean;
}

function Stat({ title, value, loading }: Props) {
  const display = !loading && value !== undefined;

  return (
    <div className="text-center">
      <div className="text-sm uppercase text-gray-700 mb-1 font-bold">
        {title}
      </div>
      {!display && <span className="text-4xl font-bold text-gray-700">-</span>}
      {display && <span className="text-4xl font-bold">{value}</span>}
    </div>
  );
}

export default Stat;
