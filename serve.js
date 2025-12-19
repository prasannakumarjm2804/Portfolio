// Simple HTTP server to serve the portfolio
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the portfolio directory
app.use(express.static(path.join(__dirname, '..')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🌐 Portfolio website running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`\n📄 Pages available:`);
    console.log(`   http://localhost:${PORT}/index.html`);
    console.log(`   http://localhost:${PORT}/about.html`);
    console.log(`   http://localhost:${PORT}/projects.html`);
    console.log(`   http://localhost:${PORT}/skills.html`);
    console.log(`   http://localhost:${PORT}/experience.html`);
    console.log(`   http://localhost:${PORT}/contact.html`);
    console.log(`\n✅ Backend API running at: http://localhost:5000`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});
