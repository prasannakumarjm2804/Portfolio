// data.js

const API_URL = 'https://skxy76zple.execute-api.eu-north-1.amazonaws.com/dev';
const DATA_KEY = 'portfolio_data';
const AUTH_KEY = 'admin_session';

const defaultData = {
    hero: {
        title: "Building Digital Experiences That Matter.",
        subtitle: "Frontend Developer & UI/UX Designer",
        tagline: "I craft accessible, pixel-perfect, and performant web experiences.",
        ctaText: "View Projects"
    },
    about: {
        title: "About Me",
        image: null,
        intro: "Hello! I'm John, a passionate Frontend Developer based in San Francisco.",
        bio: "I started my journey 5 years ago. My main focus these days is building accessible, inclusive products.",
        philosophy: "I solve problems by blending technical skills with a keen eye for design.",
        focus: ["Advanced JavaScript", "Web Accessibility", "Performance Optimization"]
    },
    skills: [
        { name: "HTML5", percentage: 95, icon: "fab fa-html5" },
        { name: "CSS3", percentage: 90, icon: "fab fa-css3-alt" },
        { name: "JavaScript", percentage: 85, icon: "fab fa-js" },
        { name: "React", percentage: 80, icon: "fab fa-react" },
        { name: "Git", percentage: 85, icon: "fab fa-git-alt" },
        { name: "UI Design", percentage: 95, icon: "fas fa-laptop-code" }
    ],
    projects: [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            desc: "A comprehensive admin dashboard for managing products and orders.",
            tech: ["React", "Chart.js"],
            category: "react",
            icon: "fas fa-laptop-code"
        },
        {
            id: 2,
            title: "Weather App",
            desc: "Clean, minimal weather application providing real-time forecasts.",
            tech: ["Vanilla JS", "API"],
            category: "javascript",
            icon: "fas fa-cloud-sun"
        },
        {
            id: 3,
            title: "Design System Kit",
            desc: "A documented library of reusable UI components.",
            tech: ["Figma", "CSS"],
            category: "uiux",
            icon: "fas fa-pencil-ruler"
        }
    ],
    experience: [
        {
            id: 1,
            date: "2022 - Present",
            role: "Senior Frontend Developer",
            company: "Tech Solutions Inc.",
            desc: ["Led the migration to React.", "Improved site performance by 40%."]
        },
        {
            id: 2,
            date: "2020 - 2022",
            role: "Mid-Level Web Developer",
            company: "Creative Agency Studio",
            desc: ["Developed 15+ custom websites.", "Implemented WCAG 2.1 standards."]
        }
    ],
    messages: []
};

// --- Data Access Layer ---

/**
 * Fetches data from AWS or falls back to local storage/defaults.
 * Returns a Promise.
 */
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        const text = await response.text();
        if (!text || text === '{}' || text === 'null') {
            console.warn('API returned empty, falling back to local');
            // If API empty, try local or default
            return getLocalData();
        }

        const data = JSON.parse(text);
        localStorage.setItem(DATA_KEY, JSON.stringify(data)); // Sync to local
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return getLocalData();
    }
}

function getLocalData() {
    const local = localStorage.getItem(DATA_KEY);
    return local ? JSON.parse(local) : defaultData;
}

/**
 * Saves data to AWS and updates local storage.
 */
async function saveData(data) {
    // 1. Update Local (Optimistic)
    localStorage.setItem(DATA_KEY, JSON.stringify(data));

    // 2. Update Cloud
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Save failed');
        const res = await response.json();
        console.log('Saved to cloud:', res);
        return true;
    } catch (error) {
        console.error('Save error:', error);
        alert('Saved locally, but Cloud sync failed: ' + error.message);
        return false;
    }
}

function resetData() {
    // Resets to default and pushes to cloud
    saveData(defaultData).then(() => {
        location.reload();
    });
}

// --- Auth Layer ---

function login(email, password) {
    if (email === 'admin@example.com' && password === 'admin123') {
        const session = {
            user: 'Admin User',
            email: email,
            token: 'mock-jwt-token-' + Date.now()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'admin-login.html';
}

function isAuthenticated() {
    return !!localStorage.getItem(AUTH_KEY);
}

function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'admin-login.html';
    }
}
