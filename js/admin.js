// admin.js

document.addEventListener('DOMContentLoaded', () => {
    requireAuth();

    // Initial Load
    refreshDashboard();

    // Tab Switching
    const tabs = document.querySelectorAll('.admin-nav-item');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById('tab-' + target).classList.add('active');
        });
    });
});

async function refreshDashboard() {
    const data = await fetchData();

    // Stats
    document.getElementById('stat-projects').innerText = data.projects.length;
    document.getElementById('stat-skills').innerText = data.skills.length;

    // Form Fills
    // Hero
    document.getElementById('hero-title-input').value = data.hero.title;
    document.getElementById('hero-subtitle-input').value = data.hero.subtitle;
    document.getElementById('hero-tagline-input').value = data.hero.tagline;
    document.getElementById('hero-cta-input').value = data.hero.ctaText;

    // About
    document.getElementById('about-intro-input').value = data.about.intro;
    document.getElementById('about-bio-input').value = data.about.bio;
    document.getElementById('about-philosophy-input').value = data.about.philosophy;

    // Tables
    renderProjectsTable(data.projects);
    renderSkillsTable(data.skills);
    renderExperienceTable(data.experience);
}

// --- CRUD Operations ---

// HERO
async function saveHero() {
    const data = await fetchData(); // Get latest
    data.hero.title = document.getElementById('hero-title-input').value;
    data.hero.subtitle = document.getElementById('hero-subtitle-input').value;
    data.hero.tagline = document.getElementById('hero-tagline-input').value;
    data.hero.ctaText = document.getElementById('hero-cta-input').value;
    await saveData(data);
    alert('Hero section updated!');
}

// ABOUT
async function saveAbout() {
    const data = await fetchData();
    data.about.intro = document.getElementById('about-intro-input').value;
    data.about.bio = document.getElementById('about-bio-input').value;
    data.about.philosophy = document.getElementById('about-philosophy-input').value;
    await saveData(data);
    alert('About section updated!');
}

// PROJECTS
function renderProjectsTable(projects) {
    const tbody = document.getElementById('projects-table-body');
    tbody.innerHTML = '';
    projects.forEach((p, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.title}</td>
            <td>${p.category}</td>
            <td>
                <button class="admin-action-btn btn-delete" onclick="deleteProject(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function openProjectModal() {
    const title = prompt("Project Title:");
    if (!title) return;
    const desc = prompt("Description:");
    const category = prompt("Category (react, javascript, uiux):");

    const data = await fetchData();
    const newId = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.id)) + 1 : 1;

    data.projects.push({
        id: newId,
        title: title,
        desc: desc || "No description",
        category: category || "javascript",
        tech: ["New"],
        icon: "fas fa-code"
    });

    await saveData(data);
    refreshDashboard();
}

async function deleteProject(index) {
    if (confirm('Are you sure?')) {
        const data = await fetchData();
        data.projects.splice(index, 1);
        await saveData(data);
        refreshDashboard();
    }
}

// SKILLS
function renderSkillsTable(skills) {
    const tbody = document.getElementById('skills-table-body');
    tbody.innerHTML = '';
    skills.forEach((s, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.percentage}%</td>
            <td>
                <button class="admin-action-btn btn-delete" onclick="deleteSkill(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function openSkillModal() {
    const name = prompt("Skill Name:");
    if (!name) return;
    const items = prompt("Proficiency (0-100):");

    const data = await fetchData();
    data.skills.push({
        name: name,
        percentage: parseInt(items) || 50,
        icon: "fas fa-check"
    });

    await saveData(data);
    refreshDashboard();
}

async function deleteSkill(index) {
    if (confirm('Delete skill?')) {
        const data = await fetchData();
        data.skills.splice(index, 1);
        await saveData(data);
        refreshDashboard();
    }
}

// EXPERIENCE
function renderExperienceTable(exp) {
    const tbody = document.getElementById('exp-table-body');
    tbody.innerHTML = '';
    exp.forEach((e, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.date}</td>
            <td>${e.role}</td>
            <td>${e.company}</td>
            <td>
                 <button class="admin-action-btn btn-delete" onclick="deleteExp(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function openExpModal() {
    const role = prompt("Role:");
    if (!role) return;
    const company = prompt("Company:");
    const date = prompt("Date Range:");

    const data = await fetchData();
    data.experience.push({
        id: Date.now(),
        role: role,
        company: company || "",
        date: date || "",
        desc: ["New role added"]
    });

    await saveData(data);
    refreshDashboard();
}

async function deleteExp(index) {
    if (confirm('Delete experience?')) {
        const data = await fetchData();
        data.experience.splice(index, 1);
        await saveData(data);
        refreshDashboard();
    }
}
