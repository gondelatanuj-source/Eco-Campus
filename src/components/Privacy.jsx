import React from 'react';
import { ArrowLeft, Lock, Shield, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                        <Lock className="w-8 h-8 text-primary" /> Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">Last updated: December 22, 2024</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account, update your profile, or use our interactive features. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                        <li>Name, email address, and department information.</li>
                        <li>Data related to your carbon footprint activities (transport, energy usage, etc.).</li>
                        <li>Usage data and analytics to improve our services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Generate campus-wide sustainability reports (aggregated and anonymized).</li>
                        <li>Communicate with you about updates, security alerts, and support.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Data Security</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Contact Us</h2>
                    <p className="text-foreground/80 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at support@ecocampus.edu.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
