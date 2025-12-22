import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const Support = () => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col items-center">
            <div className="max-w-2xl w-full space-y-8">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline self-start">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl font-bold tracking-tight">How can we help?</h1>
                    <p className="text-muted-foreground text-lg">We're here to help you with any questions or issues.</p>
                </div>

                <div className="grid gap-6">
                    <Card className="hover:shadow-lg transition-shadow border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                Phone Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">Call us directly for immediate assistance.</p>
                            <a href="tel:+919392410318" className="text-2xl font-bold hover:text-primary transition-colors">
                                +91 9392410318
                            </a>
                            <p className="text-xs text-muted-foreground mt-2">Available Mon-Fri, 9am - 6pm IST</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 bg-secondary/10 rounded-full">
                                    <Mail className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                Email Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                            <a href="mailto:support@ecocampus.edu" className="text-lg font-medium hover:text-primary transition-colors">
                                support@ecocampus.edu
                            </a>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 p-6 bg-muted/30 rounded-2xl text-center">
                    <p className="text-muted-foreground">
                        Looking for user guides? <span className="text-primary font-medium cursor-pointer hover:underline">Visit our Help Center</span> under construction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Support;
