// Add this to server.js to add more logging
// It will help debug the MongoDB connection issue

// After mongoose.connect, add this:
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    // Log request body for debugging
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Request body:', req.body);
    }
    next();
});

// Also add error handling middleware at the end:
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error!", error: err.message });
});
