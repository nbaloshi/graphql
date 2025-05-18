import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../services/graphqlService";
import { GET_AUDIT_DATA } from "../../queries/auditQueries";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "../ui/card";
import "../../css/auditRatio.css";

const formatFileSize = (bytes) => {
    if (bytes >= 1000000) {
        return `${(bytes / 1000000).toFixed(2)} MB`;
    }
    return `${Math.round(bytes / 1000)} KB`;
};

const AuditRatio = () => {
    const [auditData, setAuditData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                const response = await fetchGraphQL(GET_AUDIT_DATA);
                if (response.data && response.data.user && response.data.user[0]) {
                    setAuditData(response.data.user[0]);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch audit data');
                setLoading(false);
            }
        };
        fetchAuditData();
    }, []);

    if (loading) return (
        <div className="loading-container">
            <div className="loading-text">Loading audit data...</div>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <div className="error-text">Error: {error}</div>
        </div>
    );

    if (!auditData) return (
        <div className="error-container">
            <div className="error-text">No audit data found</div>
        </div>
    );

    const roundedRatio = auditData.auditRatio 
        ? Math.round(auditData.auditRatio * 100) / 100 
        : 0;

    const formattedDone = formatFileSize(auditData.totalUp);
    const formattedReceived = formatFileSize(auditData.totalDown);

    const chartData = [
        {
            category: "AUDITS DONE",
            value: auditData.totalUp,
            formatted: formattedDone,
            fill: "#4299e1"
        },
        {
            category: "AUDITS RECEIVED",
            value: auditData.totalDown,
            formatted: formattedReceived,
            fill: "#48bb78"
        }
    ];

    return (
        <Card className="w-full">
            <div className="p-6">
                <h2 className="text-2xl font-semibold">Audits Ratio</h2>
                <div className="space-y-2 text-center" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                        fontSize: '250px',
                        fontWeight: 'bold',
                        color: '#2563eb',
                        lineHeight: '0.8',
                        transform: 'scale(1)',
                        transformOrigin: 'center'
                    }}>
                        {roundedRatio}
                    </div>
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="h-[200px]">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        width={600}
                        height={179}
                        barGap={0}
                        barCategoryGap={0}
                    >
                        <XAxis type="number"
                                hide={true}
                        />
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload?.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-2 border rounded shadow">
                                            <p className="text-sm">{`${data.category}: ${data.formatted}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill={(d) => d.fill}
                            radius={[0, 4, 4, 0]}
                            barSize={30}
                            minPointSize={2}
                        />
                    </BarChart>
                </div>
            </div>
            <div className="p-6 border-t">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Audit Overview</span>
                </div>
            </div>
        </Card>
    );
};

export default AuditRatio;