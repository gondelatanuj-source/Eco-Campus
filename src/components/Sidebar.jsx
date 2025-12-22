import React from 'react';
import { LayoutDashboard, PenTool, Trophy, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: PenTool, label: 'Input Data', path: '/dashboard/input' },
        { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6 flex items-center gap-3 border-b border-border">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-bold text-xl tracking-tight">EcoCampus</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-2">Your Impact</p>
                    <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold text-primary">12.5</span>
                        <span className="text-xs text-muted-foreground mb-1">kg CO2</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '45%' }} />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
