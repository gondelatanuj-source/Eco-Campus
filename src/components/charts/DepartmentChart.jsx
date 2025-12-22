import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const data = [
    { name: 'Transport', value: 400 },
    { name: 'Energy', value: 300 },
    { name: 'Food', value: 300 },
    { name: 'Waste', value: 200 },
];

const COLORS = ['hsl(var(--primary))', '#10b981', '#f59e0b', '#ef4444'];

const DepartmentChart = () => {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Emission Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--card-foreground))'
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '12px', marginRight: '10px' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DepartmentChart;
