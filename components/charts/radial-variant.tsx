import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
    
      <RadialBarChart
      cx="50%"
      cy="40%"
      barSize={30}
      innerRadius={40}
      outerRadius="80%"
      data={data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length]
      }))}
      >
        <Legend/>
        <RadialBar 
        label={{
          position: "insideStart",
          fill: "#fff",
          fontSize: "12px"
        }}
        background
        dataKey="value"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
