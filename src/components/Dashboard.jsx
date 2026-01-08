import React, { useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Zap, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import TrendChart from './charts/TrendChart';
import DepartmentChart from './charts/DepartmentChart';


const MetricCard = ({ title, value, change, trend, icon: Icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}
                <span className="text-muted-foreground ml-1">from last month</span>
            </p>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const dashboardRef = useRef(null);




    return (
        <div className="space-y-6" ref={dashboardRef}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">

                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Footprint"
                    value="1,245 tons"
                    change="+2.5%"
                    trend="up"
                    icon={Zap}
                />
                <MetricCard
                    title="Avg Per Student"
                    value="4.2 tons"
                    change="-1.2%"
                    trend="down"
                    icon={Users}
                />
                <MetricCard
                    title="Transport Emissions"
                    value="450 tons"
                    change="-5.0%"
                    trend="down"
                    icon={Car}
                />
                <MetricCard
                    title="Active Users"
                    value="3,450"
                    change="+12%"
                    trend="up"
                    icon={Users}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <TrendChart />
                </div>
                <div className="col-span-3">
                    <DepartmentChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
