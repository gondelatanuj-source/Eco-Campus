import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const notifications = [
        { id: 1, title: 'New Achievement!', message: 'You reached the top 10% of sustainable students.', time: '2m ago', unread: true },
        { id: 2, title: 'Department Update', message: 'Computer Science moved up to rank #3.', time: '1h ago', unread: false },
        { id: 3, title: 'Tip of the Day', message: 'Try walking to campus tomorrow to save 0.5kg CO2.', time: '5h ago', unread: false },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between ml-64">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-muted/50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors relative"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                    </button>

                    {showNotifications && (
                        <Card className="absolute right-0 top-full mt-2 w-80 z-50 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <h3 className="font-semibold">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${notif.unread ? 'bg-primary/5' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-medium">{notif.title}</h4>
                                            <span className="text-xs text-muted-foreground">{notif.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-border text-center">
                                <button className="text-xs text-primary hover:underline">Mark all as read</button>
                            </div>
                        </Card>
                    )}
                </div>

                <div className="w-px h-6 bg-border" />
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium">Student User</p>
                        <p className="text-xs text-muted-foreground">Computer Science</p>
                    </div>
                    <Link to="/dashboard/profile" className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors">
                        <User className="w-5 h-5 text-primary" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
