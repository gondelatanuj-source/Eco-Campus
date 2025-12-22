import React from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" /> Terms of Service
                    </h1>
                    <p className="text-muted-foreground">Effective Date: December 22, 2024</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        By accessing or using EcoCampus, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. User Responsibilities</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        You are responsible for your use of the Service and for any content you provide, including compliance with applicable laws, rules, and regulations.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                        <li>You must provide accurate and complete information during registration.</li>
                        <li>You are responsible for maintaining the security of your account credentials.</li>
                        <li>You must not use the Service for any illegal or unauthorized purpose.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        The Service and its original content, features, and functionality are and will remain the exclusive property of EcoCampus and its licensors.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Termination</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
