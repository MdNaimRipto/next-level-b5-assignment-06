import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useGetEarningHistoryQuery } from "@/redux/features/ridesApis";
import Loader from "@/components/Loader";
import { EarningDashboard } from "@/types/rides.types";

type EarningFilter = "daily" | "weekly" | "monthly";

const EarningsDashboard = () => {
  const [filter, setFilter] = useState<EarningFilter>("daily");

  const { data, isLoading } = useGetEarningHistoryQuery(filter);

  if (isLoading) {
    return <Loader />;
  }

  const cards = data.data as EarningDashboard;

  const chartData = [
    {
      name: "Earnings",
      total: cards.totalEarning, // total earning
      filtered: cards.filteredEarning, // filtered earning (e.g., last 1 day)
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Earnings Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h2 className="font-medium text-gray-500">Total Earning</h2>
          <p className="text-xl font-bold">{cards.totalEarning} BDT</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h2 className="font-medium text-gray-500">Completed Rides</h2>
          <p className="text-xl font-bold">{cards.totalCompletedRides}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h2 className="font-medium text-gray-500">Active Rides</h2>
          <p className="text-xl font-bold">{cards.currentActiveRides}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h2 className="font-medium text-gray-500">Canceled Rides</h2>
          <p className="text-xl font-bold">{cards.totalCanceledRides}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4">
        {(["daily", "weekly", "monthly"] as EarningFilter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Earnings Chart ({filter})</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="30%" // optional: controls space between bar groups
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value: number) => `${value} BDT`} />

              <Bar
                dataKey="total"
                fill="#000000"
                name="Total Earning"
                barSize={60}
              />
              <Bar
                dataKey="filtered"
                fill="#00000080"
                name="Filtered Earning"
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EarningsDashboard;
