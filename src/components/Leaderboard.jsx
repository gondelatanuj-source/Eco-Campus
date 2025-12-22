import React, { useRef, useState } from 'react';
import { Trophy, Medal, ArrowDown, ArrowUp, Building2, GraduationCap, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const departments = [
    { rank: 1, name: 'Computer Science', score: 85, trend: 'up', change: 12 },
    { rank: 2, name: 'Mechanical Eng', score: 82, trend: 'up', change: 8 },
    { rank: 3, name: 'Business School', score: 78, trend: 'down', change: 2 },
    { rank: 4, name: 'Arts & Design', score: 75, trend: 'up', change: 5 },
    { rank: 5, name: 'Medical School', score: 70, trend: 'down', change: 4 },
];

const students = [
    { rank: 1, name: 'Alex Johnson', major: 'Environmental Sci', score: 98, avatar: 'AJ' },
    { rank: 2, name: 'Sarah Lee', major: 'Architecture', score: 95, avatar: 'SL' },
    { rank: 3, name: 'Mike Chen', major: 'Computer Sci', score: 92, avatar: 'MC' },
    { rank: 4, name: 'Emma Davis', major: 'Biology', score: 89, avatar: 'ED' },
    { rank: 5, name: 'James Wilson', major: 'Economics', score: 87, avatar: 'JW' },
];

const Leaderboard = () => {
    const leaderboardRef = useRef(null);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!leaderboardRef.current) return;

        setDownloading(true);
        try {
            const canvas = await html2canvas(leaderboardRef.current, {
                scale: 2,
                backgroundColor: '#020817', // Match dark theme background if needed, or white
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('campus-leaderboard.pdf');
        } catch (error) {
            console.error("Download failed", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-6" ref={leaderboardRef}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Community Leaderboard</h2>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden md:inline">Last updated: Just now</span>
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {downloading ? 'Downloading...' : 'Export PDF'}
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Department Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            Top Departments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {departments.map((dept) => (
                                <div key={dept.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${dept.rank === 1 ? 'bg-yellow-500/10 text-yellow-600' :
                                            dept.rank === 2 ? 'bg-gray-400/10 text-gray-600' :
                                                dept.rank === 3 ? 'bg-orange-500/10 text-orange-600' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {dept.rank}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">{dept.name}</h3>
                                            <div className={`flex items-center text-xs ${dept.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                                {dept.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                                {dept.change}%
                                            </div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg">{dept.score}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Student Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            Top Students
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {students.map((student) => (
                                <div key={student.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${student.rank === 1 ? 'bg-yellow-500/10 text-yellow-600' :
                                            student.rank === 2 ? 'bg-gray-400/10 text-gray-600' :
                                                student.rank === 3 ? 'bg-orange-500/10 text-orange-600' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {student.rank}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-background">
                                            {student.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">{student.name}</h3>
                                            <p className="text-xs text-muted-foreground">{student.major}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg">{student.score}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Highlights Row */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none md:col-span-1">
                    <CardContent className="pt-6 text-center">
                        <Medal className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h3 className="text-xl font-bold mb-2">Green Champion</h3>
                        <p className="opacity-90 mb-4">Computer Science Dept</p>
                        <div className="text-sm opacity-75">
                            Reduced emissions by 12% this month.
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Your Standing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary">#42</div>
                                <p className="text-muted-foreground text-xs">Global Rank</p>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Top 5%</span>
                                    <span className="text-muted-foreground">1250 pts</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                    <div className="bg-primary h-full rounded-full" style={{ width: '85%' }} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">You need 50 more points to reach #41!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Leaderboard;
