import React, { useState } from 'react';
import { Car, Zap, Utensils, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { calculateFootprint } from '../lib/calculator';

const InputGroup = ({ icon: Icon, title, children }) => (
    <div className="space-y-4 p-4 border border-border rounded-xl bg-muted/20">
        <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium">{title}</h3>
        </div>
        {children}
    </div>
);

const CarbonInputForm = () => {
    const [formData, setFormData] = useState({
        transportType: 'bus',
        transportDistance: 0,
        energyUsage: 0,
        dietType: 'vegetarian',
        wasteAmount: 0,
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculation = calculateFootprint(formData);
        setResult(calculation);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Log Your Impact</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Daily Activity Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputGroup icon={Car} title="Transportation">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-1 block">Mode</label>
                                        <select
                                            name="transportType"
                                            value={formData.transportType}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-border bg-background"
                                        >
                                            <option value="bus">Bus</option>
                                            <option value="car">Car</option>
                                            <option value="bike">Bike</option>
                                            <option value="walk">Walk</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-1 block">Distance (km)</label>
                                        <input
                                            type="number"
                                            name="transportDistance"
                                            value={formData.transportDistance}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-border bg-background"
                                        />
                                    </div>
                                </div>
                            </InputGroup>

                            <InputGroup icon={Zap} title="Energy">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-1 block">Daily Usage (kWh)</label>
                                    <input
                                        type="number"
                                        name="energyUsage"
                                        value={formData.energyUsage}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded-md border border-border bg-background"
                                    />
                                </div>
                            </InputGroup>

                            <InputGroup icon={Utensils} title="Food">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-1 block">Diet Type</label>
                                    <select
                                        name="dietType"
                                        value={formData.dietType}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded-md border border-border bg-background"
                                    >
                                        <option value="meat">Meat Lover</option>
                                        <option value="vegetarian">Vegetarian</option>
                                        <option value="vegan">Vegan</option>
                                    </select>
                                </div>
                            </InputGroup>

                            <InputGroup icon={Trash2} title="Waste">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-1 block">Waste Generated (kg)</label>
                                    <input
                                        type="number"
                                        name="wasteAmount"
                                        value={formData.wasteAmount}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded-md border border-border bg-background"
                                    />
                                </div>
                            </InputGroup>

                            <button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                Calculate Impact <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result && (
                        <Card className="bg-primary text-primary-foreground border-none">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-medium opacity-90">Estimated Daily Footprint</h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">{result.total.toFixed(2)}</span>
                                    <span className="text-xl opacity-80">kg CO2e</span>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-sm opacity-80">
                                        <span>Transport</span>
                                        <span>{result.breakdown.transport.toFixed(2)} kg</span>
                                    </div>
                                    <div className="flex justify-between text-sm opacity-80">
                                        <span>Energy</span>
                                        <span>{result.breakdown.energy.toFixed(2)} kg</span>
                                    </div>
                                    <div className="flex justify-between text-sm opacity-80">
                                        <span>Food</span>
                                        <span>{result.breakdown.food.toFixed(2)} kg</span>
                                    </div>
                                    <div className="flex justify-between text-sm opacity-80">
                                        <span>Waste</span>
                                        <span>{result.breakdown.waste.toFixed(2)} kg</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-green-500/10 text-green-600 rounded-lg text-sm">
                                    💡 <strong>Tip:</strong> Switching to a vegetarian diet for 2 days a week could save 15kg of CO2 per month.
                                </div>
                                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-lg text-sm">
                                    🚲 <strong>Suggestion:</strong> You live 2km from campus. Biking could reduce your transport emissions by 100%.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CarbonInputForm;
