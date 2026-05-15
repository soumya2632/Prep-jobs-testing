// State Management
const state = {
    theme: localStorage.getItem('theme') || 'dark',
    currentView: 'home',
    jobs: [
        { id: 1, title: "Frontend Developer", company: "Google", location: "Mountain View, CA", salary: "$120k - $180k", type: "Full-time", tags: ["React", "TypeScript", "CSS"] },
        { id: 2, title: "Backend Engineer", company: "Meta", location: "Remote", salary: "$140k - $200k", type: "Full-time", tags: ["Go", "Distributed Systems"] },
        { id: 3, title: "Data Scientist", company: "Amazon", location: "Seattle, WA", salary: "$130k - $190k", type: "Full-time", tags: ["Python", "PyTorch", "AWS"] },
        { id: 4, title: "Product Designer", company: "Airbnb", location: "San Francisco, CA", salary: "$110k - $160k", type: "Contract", tags: ["Figma", "UI/UX"] },
    ],
    dsaTopics: [
        { 
            name: "Arrays & Hashing", 
            problems: [
                { title: "Two Sum", difficulty: "Easy", link: "#" },
                { title: "Contains Duplicate", difficulty: "Easy", link: "#" },
                { title: "Valid Anagram", difficulty: "Easy", link: "#" },
                { title: "Group Anagrams", difficulty: "Medium", link: "#" },
            ]
        },
        { 
            name: "Linked Lists", 
            problems: [
                { title: "Reverse Linked List", difficulty: "Easy", link: "#" },
                { title: "Merge Two Sorted Lists", difficulty: "Easy", link: "#" },
                { title: "Linked List Cycle", difficulty: "Easy", link: "#" },
                { title: "Remove Nth Node From End", difficulty: "Medium", link: "#" },
            ]
        },
        { 
            name: "Trees", 
            problems: [
                { title: "Invert Binary Tree", difficulty: "Easy", link: "#" },
                { title: "Maximum Depth of Binary Tree", difficulty: "Easy", link: "#" },
                { title: "Binary Tree Level Order Traversal", difficulty: "Medium", link: "#" },
            ]
        }
    ],
    companies: [
        { name: "TCS", pattern: "Aptitude (Numeric, Verbal) + Coding + Interview", eligibility: "60% throughout", syllabus: "C/C++, Java, DS, OS, DBMS" },
        { name: "Infosys", pattern: "Online Test (Reasoning, Verbal, Pseudo Code) + Interview", eligibility: "65% throughout", syllabus: "Python, Java, Aptitude" },
        { name: "Amazon", pattern: "OA (2 Coding) + 3 Technical Rounds + BR Round", eligibility: "No active backlogs", syllabus: "High-level DSA, System Design" }
    ],
    prepModules: [
        { id: 'aptitude', title: 'Aptitude Prep', icon: 'ph-calculator', description: 'Master Quantitative, Logical Reasoning, and Verbal Ability.' },
        { id: 'dsa', title: 'DSA Mastery', icon: 'ph-code', description: 'From Basics to Advanced Algorithms with topic-wise sheets.' },
        { id: 'technical', title: 'Technical Notes', icon: 'ph-database', description: 'Core CS subjects: OS, DBMS, Computer Networks, and OOPS.' },
        { id: 'hr', title: 'HR Prep', icon: 'ph-users', description: 'Common HR questions, behavioral tips, and mock interviews.' }
    ]
};

// UI Components
const Components = {
    Home: () => `
        <section class="hero">
            <h1>Your Future <br> Starts Here.</h1>
            <p>The all-in-one platform to land your dream job. Search jobs, practice DSA, and master interview patterns.</p>
            <div class="search-container">
                <i class="ph ph-magnifying-glass" style="margin-left: 1rem; color: var(--text-muted); font-size: 1.2rem;"></i>
                <input type="text" placeholder="Search for jobs or topics...">
                <button class="btn btn-primary">Search</button>
            </div>
        </section>
        
        <section class="section-container">
            <h2 style="font-size: 2rem; margin-bottom: 2rem;">Preparation Tracks</h2>
            <div class="grid-layout">
                ${state.prepModules.map(module => `
                    <div class="card" onclick="setView('${module.id === 'dsa' ? 'dsa' : 'prep'}')">
                        <i class="ph ${module.icon}" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1.5rem;"></i>
                        <h3 style="margin-bottom: 0.5rem;">${module.title}</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">${module.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    Jobs: () => `
        <section class="section-container">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
                <div>
                    <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Job Portal</h1>
                    <p style="color: var(--text-muted);">Discover curated opportunities from top tech companies.</p>
                </div>
                <div class="search-container" style="max-width: 400px; margin: 0;">
                    <input type="text" placeholder="Filter jobs...">
                </div>
            </div>

            <div class="grid-layout">
                ${state.jobs.map(job => `
                    <div class="card">
                        <span class="job-badge">${job.type}</span>
                        <h3 style="margin-bottom: 0.5rem;">${job.title}</h3>
                        <p style="font-weight: 600; color: var(--primary); margin-bottom: 1rem;">${job.company}</p>
                        <div style="display: flex; gap: 1rem; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">
                            <span><i class="ph ph-map-pin"></i> ${job.location}</span>
                            <span><i class="ph ph-currency-circle-dollar"></i> ${job.salary}</span>
                        </div>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                            ${job.tags.map(tag => `<span style="background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">${tag}</span>`).join('')}
                        </div>
                        <button class="btn btn-primary" style="width: 100%;">Apply Now</button>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    Prep: () => `
        <section class="section-container">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">Preparation Hub</h1>
            <p style="color: var(--text-muted); margin-bottom: 3rem;">Complete resources for technical and behavioral rounds.</p>
            
            <div class="grid-layout">
                <div class="card">
                    <h3 style="margin-bottom: 1rem;"><i class="ph ph-brain"></i> Aptitude</h3>
                    <ul style="list-style: none; color: var(--text-muted);">
                        <li style="margin-bottom: 0.5rem;">- Quantitative Aptitude Notes</li>
                        <li style="margin-bottom: 0.5rem;">- Logical Reasoning Practice</li>
                        <li style="margin-bottom: 0.5rem;">- Verbal Ability Sheets</li>
                    </ul>
                    <button class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%;">View Notes</button>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 1rem;"><i class="ph ph-gear"></i> Technical</h3>
                    <ul style="list-style: none; color: var(--text-muted);">
                        <li style="margin-bottom: 0.5rem;">- Database Management Systems</li>
                        <li style="margin-bottom: 0.5rem;">- Operating Systems Core</li>
                        <li style="margin-bottom: 0.5rem;">- Computer Networks Basics</li>
                    </ul>
                    <button class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%;">Practice Problems</button>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 1rem;"><i class="ph ph-user-circle"></i> HR Preparation</h3>
                    <ul style="list-style: none; color: var(--text-muted);">
                        <li style="margin-bottom: 0.5rem;">- Common HR Questions</li>
                        <li style="margin-bottom: 0.5rem;">- Behavioral Round Tips</li>
                        <li style="margin-bottom: 0.5rem;">- Mock Interview Guide</li>
                    </ul>
                    <button class="btn btn-secondary" style="margin-top: 1.5rem; width: 100%;">Read Guide</button>
                </div>
            </div>
        </section>
    `,

    DSA: () => `
        <section class="section-container">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">DSA Topic-wise Sheet</h1>
            <p style="color: var(--text-muted); margin-bottom: 3rem;">Master Data Structures and Algorithms with our curated problem sets.</p>

            <div style="display: flex; flex-direction: column; gap: 2rem;">
                ${state.dsaTopics.map(topic => `
                    <div class="topic-sheet">
                        <div class="topic-header">
                            <h3 style="display: flex; align-items: center; gap: 1rem;">
                                <i class="ph-fill ph-check-circle" style="color: #10b981;"></i>
                                ${topic.name}
                            </h3>
                            <span style="color: var(--text-muted); font-size: 0.9rem;">${topic.problems.length} Problems</span>
                        </div>
                        <ul class="problem-list">
                            ${topic.problems.map(problem => `
                                <li class="problem-item">
                                    <span>${problem.title}</span>
                                    <div style="display: flex; align-items: center; gap: 2rem;">
                                        <span class="diff-${problem.difficulty.toLowerCase()}" style="font-size: 0.8rem; font-weight: 600;">${problem.difficulty}</span>
                                        <a href="${problem.link}" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Solve <i class="ph ph-arrow-square-out"></i></a>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    Companies: () => `
        <section class="section-container">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">Hiring Processes</h1>
            <p style="color: var(--text-muted); margin-bottom: 3rem;">Understand how top companies hire and prepare accordingly.</p>

            <div class="grid-layout" style="grid-template-columns: 1fr;">
                ${state.companies.map(company => `
                    <div class="card" style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; align-items: center;">
                        <div style="text-align: center; border-right: 1px solid var(--border); padding-right: 2rem;">
                            <h2 style="font-size: 2.5rem; color: var(--primary);">${company.name}</h2>
                            <p style="color: var(--text-muted);">Eligibility: ${company.eligibility}</p>
                        </div>
                        <div>
                            <div style="margin-bottom: 1rem;">
                                <h4 style="color: var(--text-main); margin-bottom: 0.5rem;">Exam Pattern</h4>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">${company.pattern}</p>
                            </div>
                            <div>
                                <h4 style="color: var(--text-main); margin-bottom: 0.5rem;">Syllabus Overview</h4>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">${company.syllabus}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `
};

// Router Logic
function setView(view) {
    state.currentView = view;
    const content = Components[view.charAt(0).toUpperCase() + view.slice(1)] || Components.Home;
    document.getElementById('main-content').innerHTML = content();
    
    // Update active link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if(link.dataset.view === view) link.classList.add('active');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    setView('home');

    // Nav Click Handling
    document.querySelectorAll('.nav-links a, .logo').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const view = el.dataset.view || 'home';
            setView(view);
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
        } else {
            document.body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
        }
    }

    // Apply initial theme
    applyTheme(state.theme);

    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);
        applyTheme(state.theme);
    });
});
