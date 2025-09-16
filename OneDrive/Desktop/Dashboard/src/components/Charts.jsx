import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  
} from "recharts";

// ✅ Responsive Line Chart
export const SimpleLineChart = ({ data, xKey, yKey, stroke = "#ff8800" }) => (
  <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 10, fill: "#555" }}
          tickMargin={8}
          interval="preserveStartEnd" // prevents overlap
          angle={-30}
          textAnchor="end"
          height={40}
        />
        <YAxis tick={{ fontSize: 10, fill: "#555" }} width={35} />
        <Tooltip
          contentStyle={{
            fontSize: "12px",
            padding: "6px",
          }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={stroke}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ✅ Responsive Bar Chart
export const SimpleBarChart = ({ data, xKey, yKey, fill = "#ff8800" }) => (
  <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 10, fill: "#555" }}
          tickMargin={8}
          interval="preserveStartEnd"
          angle={-30}
          textAnchor="end"
          height={40}
        />
        <YAxis tick={{ fontSize: 10, fill: "#555" }} width={35} />
        <Tooltip
          contentStyle={{
            fontSize: "12px",
            padding: "6px",
          }}
        />
        <Bar dataKey={yKey} fill={fill} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// ✅ Responsive Pie Chart
export const SimplePieChart = ({
  data,
  dataKey,
  nameKey,
  colors = ["#ff8800", "#46a756", "#f7ce02", "#4bce00"],
}) => (
  <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            fontSize: "12px",
            padding: "6px",
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: "11px",
            paddingTop: "8px",
          }}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="45%"
          innerRadius="30%"
          outerRadius="70%" // ✅ adjusts with container
          paddingAngle={3}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);
