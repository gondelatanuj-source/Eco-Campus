import React, { useState, useEffect } from 'react';
import { User, Mail, Award, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Leaf, Car, Zap } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
    const { user, setUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState(user);

    useEffect(() => {
        if (user) setTempUser(user);
    }, [user]);

    if (!user) return <div className="p-8 text-center">Loading profile...</div>;

    const handleEdit = () => {
        setTempUser(user);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(tempUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors flex items-center gap-2"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-4 border-background shadow-xl mb-4">
                            <User className="w-16 h-16 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-muted-foreground text-sm">{user.department}</p>
                        <div className="mt-4 flex gap-2">
                            <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium border border-green-500/20">
                                Eco Warrior
                            </span>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-medium border border-blue-500/20">
                                Top 10%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempUser.name}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-muted/50 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 font-medium h-10">
                                        <User className="w-4 h-4 text-muted-foreground" /> {user.name}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={tempUser.email}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-muted/50 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 font-medium h-10">
                                        <Mail className="w-4 h-4 text-muted-foreground" /> {user.email}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Department</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="department"
                                        value={tempUser.department}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-muted/50 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 font-medium h-10">
                                        <Award className="w-4 h-4 text-muted-foreground" /> {user.department}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Campus Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={tempUser.location}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-muted/50 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 font-medium h-10">
                                        <MapPin className="w-4 h-4 text-muted-foreground" /> {user.location}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Joined</label>
                                <div className="flex items-center gap-2 font-medium h-10">
                                    <Calendar className="w-4 h-4 text-muted-foreground" /> {user.joined}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Sustainability Badges</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col items-center text-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-sm">Early Adopter</h4>
                            <p className="text-xs text-muted-foreground">Joined the initiative in the first month</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col items-center text-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-sm">Zero Waste</h4>
                            <p className="text-xs text-muted-foreground">Logged 0kg waste for 7 consecutive days</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col items-center text-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer opacity-50 grayscale">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600">
                                <Car className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-sm">Bike Commuter</h4>
                            <p className="text-xs text-muted-foreground">Log 50km of biking distance</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col items-center text-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer opacity-50 grayscale">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-sm">Energy Saver</h4>
                            <p className="text-xs text-muted-foreground">Reduce energy consumption by 10%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
