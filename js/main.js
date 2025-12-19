// main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            let newTheme = 'light';

            if (currentTheme === 'light') {
                newTheme = 'dark';
            } else if (currentTheme === 'dark') {
                newTheme = 'gradient';
            } else {
                newTheme = 'light'; // Cycle back to light from gradient
            }

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        // Assuming using FontAwesome or similar, simpler text for now if no icon lib
        // You can swap classes here.
        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun';
        } else if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-palette';
        }
    }

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon if needed
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // --- Sticky Navbar Shadow on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-soft)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // --- Inject Footer (Site-wide) ---
    const footer = document.createElement('footer');
    footer.className = 'section';
    footer.style.backgroundColor = 'var(--bg-card)';
    footer.style.padding = '2rem 0';
    footer.style.marginTop = 'auto'; // Push to bottom if flex column
    footer.style.borderTop = '1px solid var(--border-color)';

    // Check auth safely
    const isAuth = typeof isAuthenticated === 'function' ? isAuthenticated() : false;
    const adminLink = isAuth ? 'admin-dashboard.html' : 'admin-login.html';
    const adminText = isAuth ? 'Admin Dashboard' : 'Admin Login';

    footer.innerHTML = `
        <div class="container" style="text-align: center; color: var(--text-secondary);">
            <p>&copy; 2024 John Doe | Built with Pure Frontend.</p>
            <div style="margin-top: 1rem;">
                <a href="${adminLink}" style="font-size: 0.9rem; color: var(--text-accent); text-decoration: none;">
                    <i class="fas fa-lock"></i> ${adminText}
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(footer); // Appends to end of body
});
