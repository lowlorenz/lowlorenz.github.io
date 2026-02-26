// Lorenz Attractor Animation
class LorenzAttractor {
    constructor() {
        this.canvas = document.getElementById('lorenz-canvas');

        if (!this.canvas) {
            console.error('Lorenz canvas not found!');
            return;
        }

        this.points = [];
        this.trails = [];
        this.maxTrails = 1000;

        // Lorenz attractor parameters
        this.sigma = 10;
        this.rho = 28;
        this.beta = 8 / 3;
        this.dt = 0.01;

        // Single attractor in rectangular area
        this.attractor = {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            width: 200, // Rectangle width
            height: 150, // Rectangle height
            colorIndex: 0
        };

        this.init();
    }

    init() {
        // Create boundary rectangle
        this.createBoundary();

        // Create single point
        this.points.push({
            x: this.attractor.x,
            y: this.attractor.y,
            z: this.attractor.z,
            element: this.createPoint(0),
            age: 0
        });

        this.animate();
    }

    createBoundary() {
        const boundary = document.createElement('div');
        boundary.className = 'lorenz-boundary';
        this.canvas.appendChild(boundary);
    }

    createPoint(index) {
        const point = document.createElement('div');
        point.className = 'lorenz-point';
        point.style.left = '50%';
        point.style.top = '50%';
        this.canvas.appendChild(point);
        return point;
    }

    createTrail(x, y, colorIndex) {
        const trail = document.createElement('div');
        trail.className = 'lorenz-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';

        // Rainbow colors based on x position
        const rainbowColors = [
            '#FF0000', // Red
            '#FF7F00', // Orange
            '#FFFF00', // Yellow
            '#00FF00', // Green
            '#0000FF', // Blue
            '#4B0082', // Indigo
            '#9400D3'  // Violet
        ];

        // Map x position (0-200) to color index (0-6)
        const rainbowIndex = Math.floor((x / this.attractor.width) * (rainbowColors.length - 1));
        const clampedIndex = Math.max(0, Math.min(rainbowColors.length - 1, rainbowIndex));
        trail.style.background = rainbowColors[clampedIndex];

        this.canvas.appendChild(trail);

        this.trails.push({
            element: trail,
            age: 0
        });
    }

    updatePoint(point, index) {
        // Increment point age
        point.age++;

        // Lorenz attractor equations
        const dx = this.sigma * (point.y - point.x);
        const dy = point.x * (this.rho - point.z) - point.y;
        const dz = point.x * point.y - this.beta * point.z;

        point.x += dx * this.dt;
        point.y += dy * this.dt;
        point.z += dz * this.dt;

        // Constrain to rectangular area
        const scale = .2;
        const centerX = this.attractor.width / 2;
        const centerY = this.attractor.height / 2;
        const screenX = centerX + point.x * scale * 25;
        const screenY = centerY + point.y * scale * 15;

        // Clamp to rectangle boundaries
        const clampedX = Math.max(0, Math.min(this.attractor.width, screenX));
        const clampedY = Math.max(0, Math.min(this.attractor.height, screenY));

        // Update point position
        point.element.style.left = clampedX + 'px';
        point.element.style.top = clampedY + 'px';

        // Update point color based on x position
        const rainbowColors = [
            '#FF0000', // Red
            '#FF7F00', // Orange
            '#FFFF00', // Yellow
            '#00FF00', // Green
            '#0000FF', // Blue
            '#4B0082', // Indigo
            '#9400D3'  // Violet
        ];

        // Map x position (0-200) to color index (0-6)
        const rainbowIndex = Math.floor((clampedX / this.attractor.width) * (rainbowColors.length - 1));
        const clampedIndex = Math.max(0, Math.min(rainbowColors.length - 1, rainbowIndex));
        point.element.style.background = rainbowColors[clampedIndex];
        point.element.style.boxShadow = `0 0 20px ${rainbowColors[clampedIndex]}80`;

        // Create trail only every other frame (plot half the points)
        if (this.points[0].age % 2 === 0) {
            this.createTrail(clampedX, clampedY, this.attractor.colorIndex);
        }
    }

    updateTrails() {
        // Make trails fade out over time
        this.trails.forEach((trail, index) => {
            trail.age += 1;

            // Calculate opacity using exponential decay
            const maxAge = 300;
            const decayRate = 0.02; // Controls how fast the decay happens
            const opacity = Math.max(0, Math.exp(-decayRate * trail.age));
            trail.element.style.opacity = opacity;

            // Remove very old trails to prevent memory issues
            if (trail.age > maxAge) {
                if (trail.element && trail.element.parentNode) {
                    trail.element.parentNode.removeChild(trail.element);
                }
                this.trails.splice(index, 1);
            }
        });
    }

    animate() {
        // Update all points
        this.points.forEach((point, index) => {
            this.updatePoint(point, index);
        });

        // Update trails
        this.updateTrails();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Lorenz attractor when page loads
document.addEventListener('DOMContentLoaded', function () {
    try {
        new LorenzAttractor();
    } catch (error) {
        console.error('Error initializing Lorenz attractor:', error);
    }
});

// Tab functionality
function openTab(evt, tabName) {
    // Get all tab content elements and hide them
    const tabcontents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active");
    }

    // Get all tab button elements and remove active class
    const tablinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");

    // If opening blog tab, ensure the first blog post is shown
    if (tabName === 'blog') {
        const firstBlogBtn = document.querySelector('.blog-nav-btn');
        if (firstBlogBtn && !document.querySelector('.blog-nav-btn.active')) {
            firstBlogBtn.click();
        }
    }
}

// Blog post switching functionality
function showBlog(blogId) {
    // Hide all blog posts
    const blogPosts = document.getElementsByClassName("blog-post");
    for (let i = 0; i < blogPosts.length; i++) {
        blogPosts[i].classList.remove("active");
    }

    // Remove active class from all blog navigation buttons
    const blogNavBtns = document.getElementsByClassName("blog-nav-btn");
    for (let i = 0; i < blogNavBtns.length; i++) {
        blogNavBtns[i].classList.remove("active");
    }

    // Show the selected blog post
    const selectedBlog = document.getElementById(blogId);
    if (selectedBlog) {
        selectedBlog.classList.add("active");
    }

    // Add active class to the corresponding navigation button
    const activeBtn = event.target;
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
}

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all links with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize first blog post as active when page loads
    const firstBlogPost = document.getElementById('blog1');
    const firstBlogBtn = document.querySelector('.blog-nav-btn');

    if (firstBlogPost && firstBlogBtn) {
        firstBlogPost.classList.add('active');
        firstBlogBtn.classList.add('active');
    }

    // Add loading animation for profile image
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        // Handle image error (fallback)
        profileImg.addEventListener('error', function () {
            this.src = 'https://via.placeholder.com/200x200/667eea/ffffff?text=Photo';
            this.alt = 'Profile placeholder';
        });
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations (excluding publications section for immediate visibility)
    const allSections = document.querySelectorAll('.section, .interest-item');
    allSections.forEach(section => {
        // Skip the publications section
        if (section.querySelector('.publications')) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            return;
        }
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add copy to clipboard functionality for publication links
    const pubLinks = document.querySelectorAll('.pub-link');
    pubLinks.forEach(link => {
        if (link.textContent.includes('BibTeX')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                // Example BibTeX - replace with actual citation
                const bibtex = `@article{yourname2024title,
  title={Your Paper Title},
  author={Your Name and Co-Author},
  journal={Conference/Journal Name},
  year={2024}
}`;

                navigator.clipboard.writeText(bibtex).then(() => {
                    // Show temporary success message
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.background = '#48bb78';

                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                    }, 2000);
                }).catch(() => {
                    alert('BibTeX citation copied to clipboard!');
                });
            });
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Alt + 1 for Home tab
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            document.querySelector('.tab-button').click();
        }

        // Alt + 2 for Blog tab
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            document.querySelectorAll('.tab-button')[1].click();
        }
    });

    // Add search functionality (basic)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search publications...';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
    `;

    // Add search input to body
    document.body.appendChild(searchInput);

    // Toggle search with Ctrl+F or Cmd+F
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
            if (searchInput.style.display === 'block') {
                searchInput.focus();
            }
        }

        if (e.key === 'Escape') {
            searchInput.style.display = 'none';
            searchInput.value = '';
            // Reset publication visibility
            const publications = document.querySelectorAll('.publication');
            publications.forEach(pub => pub.style.display = '');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const publications = document.querySelectorAll('.publication');

        publications.forEach(publication => {
            const text = publication.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                publication.style.display = '';
            } else {
                publication.style.display = 'none';
            }
        });
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Export functionality (basic)
function exportData() {
    const data = {
        name: document.querySelector('.name').textContent,
        title: document.querySelector('.title').textContent,
        publications: Array.from(document.querySelectorAll('.publication')).map(pub => ({
            title: pub.querySelector('h3').textContent,
            authors: pub.querySelector('.authors').textContent,
            venue: pub.querySelector('.venue').textContent,
            description: pub.querySelector('.description').textContent
        }))
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'academic_profile.json';
    link.click();

    URL.revokeObjectURL(url);
}

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function () {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
    }
}); 