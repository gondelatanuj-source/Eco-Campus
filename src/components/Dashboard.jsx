import React, { useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Zap, Car, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import TrendChart from './charts/TrendChart';
import DepartmentChart from './charts/DepartmentChart';
import ComparisonChart from './charts/ComparisonChart';
import MonthlyBreakdownChart from './charts/MonthlyBreakdownChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!dashboardRef.current) return;

        setDownloading(true);
        try {
            const canvas = await html2canvas(dashboardRef.current, {
                scale: 2,
                backgroundColor: '#020817', // Match background color
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('campus-carbon-report.pdf');
        } catch (error) {
            console.error("Download failed", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-6" ref={dashboardRef}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {downloading ? 'Generating...' : 'Download Report'}
                    </button>
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <ComparisonChart />
                <MonthlyBreakdownChart />
            </div>
        </div>
    );
};

export default Dashboard;
