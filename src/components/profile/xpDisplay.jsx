import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../services/graphqlService";
import { GET_XP_DATA } from "../../queries/xpQueries";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "../ui/card";

const XpDisplay = () => {
    const [xpData, setXpData] = useState([]);
    const [totalXP, setTotalXP] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchXP = async () => {
            try {
                const response = await fetchGraphQL(GET_XP_DATA);
                if (response.data) {
                    const formattedData = response.data.transaction
                    .map(t => ({
                        month: new Date(t.createdAt).toLocaleDateString('en-US', { month: 'long' }),
                        xp: Math.round(t.amount / 1000),
                        date: new Date(t.createdAt)
                    }))
                    .sort((a, b) => a.date - b.date)
                    .map(({ month, xp }) => ({ month, xp }));
                    setXpData(formattedData);
                    setTotalXP(response.data.transaction_aggregate.aggregate.sum.amount / 1000);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch XP data');
                setLoading(false);
            }
        };
        fetchXP();
    }, []);

    if (loading) return <div>Loading XP display...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!xpData.length) return <div>No XP data found</div>;

    return (
        <Card className="w-full">
            <div className="p-6">
                <h2 className="text-2xl font-semibold">XP Progress</h2>
                <p className="text-sm text-gray-500">Your learning journey</p>
            </div>
            <div className="p-6 pt-0">
                <div className="h-[300px] w-full">
                    <LineChart
                        data={xpData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        width={1700}
                        height={300}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            hide={true}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}kB`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload?.length) {
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm">{`XP: ${payload[0].value} kB`}</p>
                                            <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="xp"
                            stroke="#4299e1"
                            strokeWidth={2}
                            dot={{ 
                                fill: "#4299e1", 
                                r: 2,
                                strokeWidth: 0
                            }}
                            activeDot={{ 
                                r: 5,
                                fill: "#4299e1",
                                stroke: "#fff",
                                strokeWidth: 1
                            }}
                        />
                    </LineChart>
                </div>
            </div>
            <div className="p-6 border-t">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Total XP: {totalXP.toFixed(1)} kB</span>
                </div>
            </div>
        </Card>
    );
};

export default XpDisplay;