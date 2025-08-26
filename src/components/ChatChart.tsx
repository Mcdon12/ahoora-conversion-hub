import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartDataPoint {
  [key: string]: any;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChatChartProps {
  type: "line" | "area" | "bar" | "pie";
  data: ChartDataPoint[];
  config: ChartConfig;
  title?: string;
  height?: number;
  xAxisKey?: string;
  yAxisKey?: string;
}

export function ChatChart({ 
  type, 
  data, 
  config, 
  title,
  height = 300,
  xAxisKey = "date",
  yAxisKey 
}: ChatChartProps) {
  const colors = ["hsl(var(--primary))", "#9b87f5", "#6E59A5", "#0EA5E9", "#10b981", "#f59e0b"];

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xAxisKey} 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(config).map(([key, value], index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={value.color || colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: value.color || colors[index % colors.length], strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xAxisKey} 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(config).map(([key, value], index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={value.color || colors[index % colors.length]}
                fill={`${value.color || colors[index % colors.length]}20`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={xAxisKey} 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(config).map(([key, value], index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={value.color || colors[index % colors.length]}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case "pie":
        const pieData = data.map((item, index) => ({
          ...item,
          fill: colors[index % colors.length]
        }));
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey={yAxisKey || "value"}
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-medium mb-3 text-foreground">{title}</h4>
      )}
      <ChartContainer config={config} className="w-full">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}