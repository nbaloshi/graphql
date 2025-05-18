import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../services/graphqlService";
import { GET_SKILLS } from "../../queries/skillQueries";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "../ui/card";
import "../../css/skillsList.css";

const SkillsList = () => {
    const [skills, setSkills] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetchGraphQL(GET_SKILLS);
                if (response.data.transaction) {
                    const maxSkills = response.data.transaction.reduce((acc, curr) => {
                        const skillName = curr.type.replace('skill_', '');
                        const currentMax = acc[skillName] || 0;
                        acc[skillName] = Math.max(currentMax, curr.amount);
                        return acc;
                    }, {});
                    setSkills(maxSkills);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch skills');
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return (
        <div className="loading-container">
            <div className="loading-text">Loading skills...</div>
        </div>
    );
    if (error) return (
        <div className="error-container">
            <div className="error-text">Error: {error}</div>
        </div>
    );
    if (!Object.keys(skills).length) return (
        <div className="no-data-container">
            <div className="no-data-text">No skills found</div>
        </div>
    );

    // Transform skills data for BarChart
    const chartData = Object.entries(skills)
        .map(([name, value]) => ({
            skill: name.toUpperCase(),
            value: value
        }))
        .sort((a, b) => b.value - a.value);

    return (
        <Card className="w-full">
            <div className="p-6">
                <h2 className="text-2xl font-semibold">Skills Progress</h2>
                <p className="text-sm text-gray-500">Your skill distribution</p>
            </div>
            <div className="p-6 pt-0">
                <div className="h-[350px]">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                        width={600}
                        height={350}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="skill"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload?.length) {
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm">{`${payload[0].payload.skill}: ${payload[0].value.toFixed(1)} XP`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#4299e1"
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </div>
            </div>
            <div className="p-6 border-t">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Skills Overview</span>
                </div>
            </div>
        </Card>
    );
};

export default SkillsList;