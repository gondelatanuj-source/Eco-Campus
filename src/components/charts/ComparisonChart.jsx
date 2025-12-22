import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const data = [
    {
        name: 'Carbon Footprint',
        User: 4.2,
        CampusAvg: 3.8,
        NationalAvg: 5.5,
    },
];

const ComparisonChart = () => {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Benchmark Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'Tons CO2', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--card-foreground))'
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Bar dataKey="User" fill="#10b981" radius={[4, 4, 0, 0]} name="You" />
                        <Bar dataKey="CampusAvg" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Campus Avg" />
                        <Bar dataKey="NationalAvg" fill="#f59e0b" radius={[4, 4, 0, 0]} name="National Avg" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ComparisonChart;
