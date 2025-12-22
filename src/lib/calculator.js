export const calculateFootprint = (data) => {
    let total = 0;
    const breakdown = {};

    // Transport
    if (data.transportType === 'car') {
        breakdown.transport = data.transportDistance * 0.2; // 0.2 kg/km
    } else if (data.transportType === 'bus') {
        breakdown.transport = data.transportDistance * 0.05; // 0.05 kg/km
    } else {
        breakdown.transport = 0;
    }

    // Energy
    breakdown.energy = data.energyUsage * 0.5; // 0.5 kg/kWh

    // Food
    if (data.dietType === 'meat') {
        breakdown.food = 2.5; // Daily avg
    } else if (data.dietType === 'vegetarian') {
        breakdown.food = 1.5;
    } else {
        breakdown.food = 1.0; // Vegan
    }

    // Waste
    breakdown.waste = data.wasteAmount * 1.2; // 1.2 kg/kg

    total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return { total, breakdown };
};
