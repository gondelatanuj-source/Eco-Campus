import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, BarChart3, Users, Zap, Bus, Utensils, Lightbulb, Newspaper, ExternalLink, Clock } from 'lucide-react';
import { animate, stagger } from 'animejs';
import GridBackground from './ui/GridBackground';
import Globe3D from './ui/Globe3D';

const LandingPage = () => {
    const [carbonCount, setCarbonCount] = useState(1243.5);
    const [news, setNews] = useState([
        { title: "Global CO2 hits record high in 2024", time: "2h ago", source: "EcoWatch" },
        { title: "Campus Solar Initiative Approved", time: "5h ago", source: "CampusNews" },
        { title: "Electric Bus Fleet Expansion", time: "1d ago", source: "CityTransport" },
        { title: "New Recycling Protocols in Effect", time: "2d ago", source: "GreenTeam" }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) return;

            setLoading(true);
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

                const prompt = `Generate 4 realistic and diverse news headlines about current environmental topics (carbon footprint, climate change, renewable energy) as if they were real breaking news. Return strict JSON array with NO markdown formatting, just raw JSON. Each object must have: 'title', 'time' (e.g. '2h ago', '5m ago'), 'source' (e.g. 'EcoWatch', 'Reuters'), and 'url' (use placeholder 'https://example.com').`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                let text = response.text();

                // Clean up markdown code blocks if present
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();

                const data = JSON.parse(text);

                if (Array.isArray(data) && data.length > 0) {
                    setNews(data);
                }
            } catch (error) {
                console.error("Failed to fetch carbon news from Gemini:", error);
                // Keep default news on error
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // Auto-refresh every 2 minutes (120,000 ms)
        const intervalId = setInterval(fetchNews, 120000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Hero Text Entrance
        animate('.hero-text', {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(200),
            duration: 1000,
            easing: 'outExpo'
        });

        // Carbon Counter Animation loop
        const interval = setInterval(() => {
            setCarbonCount(prev => prev + 0.01);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Features Section Animation (Staggered Grid)
        animate('.feature-card', {
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: stagger(100, { start: 1000 }), // Starts after hero animation
            duration: 600,
            ease: 'outBack'
        });

        // Lifestyle Item Stagger
        animate('.lifestyle-item', {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: stagger(100, { start: 500 }),
            duration: 800,
            easing: 'outQuart'
        });

    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Leaf className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary">EcoCampus</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
                        <Link to="/register" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* SECTION 1: HERO */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="z-10 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 hero-text opacity-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Active Monitoring System
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-tight mb-6 hero-text opacity-0">
                            Track Your <br />
                            <span className="text-accent">Carbon Footprint.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-lg hero-text opacity-0 leading-relaxed">
                            Measure, visualize, and reduce carbon emissions — per student, per department, per campus. Transform tomorrow through data.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 hero-text opacity-0">
                            <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
                                Calculate My Footprint <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-full border border-border/50 shadow-sm">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campus CO₂ Level</div>
                                <div className="text-xl font-mono font-bold text-destructive">
                                    {carbonCount.toFixed(2)} <span className="text-sm font-sans text-muted-foreground">tons</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Animation Content (Globe) */}
                    <div className="relative order-1 lg:order-2 flex justify-center items-center h-[400px] hero-text opacity-0">
                        {/* Blob Background */}
                        <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full scale-75 animate-pulse"></div>

                        <div className="relative z-10 w-full h-full max-w-lg flex items-center justify-center">
                            <Globe3D />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: LIFESTYLE IMPACT */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">Your Lifestyle Has a <span className="text-destructive">Carbon Cost</span></h2>
                    <p className="text-muted-foreground">See how daily choices add up to your total footprint.</p>
                </div>

                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10"></div>

                        {[
                            { icon: Users, label: "You", val: "Start", color: "text-primary" },
                            { icon: Bus, label: "Transport", val: "+2.4 kg", color: "text-orange-500" },
                            { icon: Utensils, label: "Food", val: "+1.8 kg", color: "text-yellow-500" },
                            { icon: Lightbulb, label: "Energy", val: "+3.2 kg", color: "text-destructive" },
                            { icon: Leaf, label: "Total", val: "7.4 kg CO₂", color: "text-accent" }
                        ].map((item, index) => (
                            <div key={index} className="lifestyle-item bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 z-10 w-full md:w-auto flex flex-col items-center opacity-0">
                                <div className={`w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 ${item.color} shadow-inner`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <span className="font-semibold text-foreground mb-1">{item.label}</span>
                                <span className={`text-sm font-mono font-bold ${item.color}`}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 & 4: CAMPUS IMPACT & DASHBOARD */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                                Campus-Wide Analytics
                            </div>
                            <h2 className="text-4xl font-bold mb-6">From Individuals to <br /> Institutions.</h2>
                            <p className="text-lg text-muted-foreground mb-8 text-pretty">
                                Visualize carbon emissions at every level. Our dashboard aggregates student data to provide precise department and campus-wide insights.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Avg. Student Footprint</div>
                                        <div className="text-2xl font-bold">4.2 <span className="text-sm font-normal text-muted-foreground">tons/year</span></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Total Campus Emissions</div>
                                        <div className="text-2xl font-bold">12,450 <span className="text-sm font-normal text-muted-foreground">tons/year</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Dashboard Visual */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-border">
                                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                                    <div className="flex items-center gap-2">
                                        <Newspaper className="w-5 h-5 text-primary" />
                                        <span className="font-bold text-lg">Daily Carbon News</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Live Updates</span>
                                </div>

                                {/* News Items */}
                                <div className="space-y-4">
                                    {news.map((item, i) => (
                                        <div key={i} className="group p-3 rounded-xl bg-muted/30 hover:bg-muted/80 transition-all border border-transparent hover:border-border cursor-pointer" onClick={() => item.url && window.open(item.url, '_blank')}>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                                                <div className="flex items-center text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {item.time}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.source}</span>
                                                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))}
                                    {loading && <div className="text-center text-sm text-muted-foreground">Updating news...</div>}
                                </div>
                                <div className="mt-4 pt-4 border-t border-border flex justify-center">
                                    <button className="text-xs font-semibold text-primary hover:underline">View All News</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: RESTORATION (Scroll Transition) */}
            <section className="py-32 relative overflow-hidden bg-gradient-to-b from-muted to-background">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611273426721-dfddadd60f71?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-fixed opacity-10"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Transformation</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        Reduce Emissions. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Build a Sustainable Campus.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        Turn data into action. Watch your campus transform as you implement sustainable practices effectively monitoring and reducing your carbon footprint.
                    </p>

                    {/* Visual representation of growth */}
                    <div className="flex justify-center gap-8 mb-12">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 hover:scale-110">
                                <Leaf className="w-10 h-10" />
                            </div>
                            <span className="font-semibold text-sm">Plant Trees</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-muted-foreground group-hover:bg-yellow-400 group-hover:text-white transition-all duration-500 hover:scale-110">
                                <Zap className="w-10 h-10" />
                            </div>
                            <span className="font-semibold text-sm">Solar Power</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-muted-foreground group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 hover:scale-110">
                                <Bus className="w-10 h-10" />
                            </div>
                            <span className="font-semibold text-sm">Eco Transport</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: FEATURES GRID */}
            <section id="features" className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-muted-foreground">Everything you need to track and reduce impact.</p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { title: "Carbon Calculator", icon: BarChart3, desc: "Measure individual & campus impact." },
                            { title: "Dept Comparison", icon: Users, desc: "Compare emissions across faculties." },
                            { title: "AI Estimation", icon: Zap, desc: "Predict future trends with AI." },
                            { title: "Live Dashboards", icon: Lightbulb, desc: "Real-time energy monitoring." },
                            { title: "Action Plan", icon: Leaf, desc: "Get tailored reduction steps." }
                        ].map((feature, i) => (
                            <div key={i} className="feature-card opacity-0 group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg cursor-default">
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <footer className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Start Measuring Your Impact Today</h2>
                    <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                        Join the community of conscious campuses creating a sustainable future.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Calculate Carbon Footprint <ArrowRight className="w-5 h-5" />
                    </Link>

                    <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <Leaf className="w-4 h-4" />
                            <span>EcoCampus © 2024</span>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link to="/support" className="hover:text-white transition-colors">Contact Support</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
