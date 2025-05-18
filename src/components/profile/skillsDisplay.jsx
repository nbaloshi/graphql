import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../services/graphqlService";
import { GET_SKILLS } from "../../queries/skillQueries";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
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

    if (loading) return <div>Loading skills...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!skills) return <div>No skills found</div>;

    // Transform skills data for RadarChart
    const chartData = Object.entries(skills).map(([name, value]) => ({
        skill: name.toUpperCase(),
        value: value
    }));

    return (
        <Card className="w-full">
            <div className="p-6">
                <h2 className="text-2xl font-semibold">Skills Radar</h2>
                <p className="text-sm text-gray-500">Your skill distribution</p>
            </div>
            <div className="p-6 pt-0">
                <div className="mx-auto aspect-square max-h-[350px]">
                    <RadarChart 
                        outerRadius={230} 
                        width={700} 
                        height={700} 
                        data={chartData}
                    >
                        <PolarGrid />
                        <PolarAngleAxis 
                            dataKey="skill"
                            tick={{ 
                                fontSize: 14,  // Increased font size
                                fill: "#4b5563",
                                dy: 5 
                            }}
                            tickLine={{ display: 'none' }}  // Add this to remove tick lines
                            cx={350}  // Add center x coordinate
                            cy={350} 
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}  // Set fixed domain from 0 to 100
                            tickCount={5}
                            tick={false}
                        />
                        <Radar
                            name="Skills"
                            dataKey="value"
                            stroke="#4299e1"
                            fill="#4299e1"
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </div>
            </div>
            <div className="p-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Skills Overview</span>
                </div>
            </div>
        </Card>
    );
};

export default SkillsList;