// Mock location data generator
const locations = [
    "Times Square, New York",
    "Golden Gate Bridge, San Francisco", 
    "Eiffel Tower, Paris",
    "Sydney Opera House",
    "Tokyo Tower"
];

const getLocation = (phone) => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomAccuracy = Math.floor(Math.random() * 500) + 50;
    const randomTimeOffset = Math.floor(Math.random() * 60);
    
    return {
        phone,
        location: randomLocation,
        accuracy: randomAccuracy,
        timestamp: Date.now() - (randomTimeOffset * 60 * 1000)
    };
};

module.exports = { getLocation };
