import React from 'react';
import useUmamiData from '../hooks/useUmamiData'; // Ensure the path is correct
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsDashboard: React.FC = () => {
  const { data, loading, error } = useUmamiData();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  // Prepare data for the chart
  const labels = data?.pageViews.map((pv: any) => pv.date) || [];
  const pageViewsData = data?.pageViews.map((pv: any) => pv.views) || [];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Page Views',
        data: pageViewsData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AnalyticsDashboard;
