/* MNC DS & AI Mastery Platform - Main Application Controller */

const App = {
  activeModule: 'python', // 'python', 'genai', 'ml', 'bigdata', 'sql', 'roadmap', 'interview', 'playground', 'dashboard', 'admin'
  activeTopicId: null,
  activeTopicTab: 'tab_theory', // 'tab_theory', 'tab_arch', 'tab_subtopics', 'tab_code', 'tab_best', 'tab_interview', 'tab_quiz'
  activeFilter: 'all',
  
  modules: {
    python: PYTHON_DATA,
    genai: GENAI_DATA,
    ml: ML_DATA,
    bigdata: BIGDATA_DATA,
    sql: SQL_DATA
  },

  init() {
    this.setupTheme();
    this.setupEventListeners();
    this.renderSidebar();
    this.renderHeaderStats();
    this.loadModule('python');
    PlaygroundManager.init();
  },

  setupTheme() {
    const savedTheme = DatabaseManager.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    DatabaseManager.setTheme(newTheme);
    this.updateThemeIcon(newTheme);
  },

  updateThemeIcon(theme) {
    const iconElem = document.getElementById('theme-toggle-icon');
    if (iconElem) {
      iconElem.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }
  },

  setupEventListeners() {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  },

  renderSidebar() {
    const nav = document.getElementById('sidebar-nav-items');
    if (!nav) return;

    let html = `
      <div class="nav-section-title">Main Apps</div>
      <a class="nav-item ${this.activeModule === 'dashboard' ? 'active' : ''}" onclick="App.loadDashboardSection()">
        <div class="nav-item-icon"><i data-lucide="layout-dashboard"></i> Learner Dashboard</div>
      </a>

      <div class="nav-section-title" style="margin-top: 1rem;">Core Subjects</div>
      <a class="nav-item ${this.activeModule === 'python' ? 'active' : ''}" onclick="App.loadModule('python')">
        <div class="nav-item-icon"><i data-lucide="code"></i> Python Libraries</div>
        <span class="badge">12</span>
      </a>
      <a class="nav-item ${this.activeModule === 'genai' ? 'active' : ''}" onclick="App.loadModule('genai')">
        <div class="nav-item-icon"><i data-lucide="cpu"></i> Generative AI</div>
        <span class="badge">13</span>
      </a>
      <a class="nav-item ${this.activeModule === 'ml' ? 'active' : ''}" onclick="App.loadModule('ml')">
        <div class="nav-item-icon"><i data-lucide="brain"></i> Machine Learning</div>
        <span class="badge">27</span>
      </a>
      <a class="nav-item ${this.activeModule === 'bigdata' ? 'active' : ''}" onclick="App.loadModule('bigdata')">
        <div class="nav-item-icon"><i data-lucide="database"></i> Big Data & Spark</div>
        <span class="badge">12</span>
      </a>
      <a class="nav-item ${this.activeModule === 'sql' ? 'active' : ''}" onclick="App.loadModule('sql')">
        <div class="nav-item-icon"><i data-lucide="table"></i> SQL Masterclass</div>
        <span class="badge">10</span>
      </a>

      <div class="nav-section-title" style="margin-top: 1rem;">Interview & Practice</div>
      <a class="nav-item ${this.activeModule === 'interview' ? 'active' : ''}" onclick="App.loadInterviewSection()">
        <div class="nav-item-icon"><i data-lucide="briefcase"></i> Top MNC Interview Suite</div>
        <span class="badge" style="background: rgba(245,158,11,0.2); color:#f59e0b;">150 Qs</span>
      </a>
      <a class="nav-item ${this.activeModule === 'roadmap' ? 'active' : ''}" onclick="App.loadRoadmapSection()">
        <div class="nav-item-icon"><i data-lucide="calendar"></i> 90-Day Learning Plan</div>
        <span class="badge" style="background: rgba(16,185,129,0.2); color:#10b981;">90 Days</span>
      </a>
      <a class="nav-item ${this.activeModule === 'playground' ? 'active' : ''}" onclick="App.loadPlaygroundSection()">
        <div class="nav-item-icon"><i data-lucide="terminal"></i> Code Playground</div>
        <span class="badge" style="background: rgba(139,92,246,0.2); color:#c084fc;">Live</span>
      </a>
      <a class="nav-item ${this.activeModule === 'admin' ? 'active' : ''}" onclick="App.loadAdminSection()">
        <div class="nav-item-icon"><i data-lucide="shield"></i> Admin Panel</div>
      </a>
    `;
    nav.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  renderHeaderStats() {
    const completed = DatabaseManager.getCompletedTopics();
    const totalTopics = 74;
    const pct = Math.round((completed.length / totalTopics) * 100);

    const fill = document.getElementById('global-progress-fill');
    const text = document.getElementById('global-progress-text');
    if (fill) fill.style.width = `${pct}%`;
    if (text) text.textContent = `${pct}% Complete (${completed.length}/${totalTopics})`;
  },

  loadModule(modKey) {
    this.activeModule = modKey;
    this.activeTopicId = null;
    this.renderSidebar();

    const data = this.modules[modKey];
    if (!data) return;

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in">
        <h1 class="hero-title">${data.subject}</h1>
        <p class="hero-subtitle">${data.description}</p>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">${data.topics.length}</div>
            <div class="stat-label">Core Topics</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">20 + 10</div>
            <div class="stat-label">MNC Interview Q&As</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.topics.length * 2}</div>
            <div class="stat-label">Interactive Quizzes</div>
          </div>
        </div>
      </div>

      <div class="tabs-nav">
        <button class="tab-btn active" onclick="App.showTopicGrid()"><i data-lucide="book-open"></i> All Topics (${data.topics.length})</button>
        <button class="tab-btn" onclick="App.loadModuleInterview('${modKey}')"><i data-lucide="help-circle"></i> Subject Interview Q&A (30 Qs)</button>
      </div>

      <div id="module-body-container">
        ${this.generateTopicGridHtml(data.topics)}
      </div>
    `;

    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  generateTopicGridHtml(topics) {
    const completed = DatabaseManager.getCompletedTopics();
    const bookmarks = DatabaseManager.getBookmarks();

    let gridHtml = `<div class="topic-grid">`;
    for (let rawT of topics) {
      const t = SchemaBuilder.createTopic(rawT);
      const isDone = completed.includes(t.id);
      const isBookmarked = bookmarks.includes(t.id);

      gridHtml += `
        <div class="topic-card animate-fade-in" onclick="App.openTopicDetail('${t.id}')">
          <div class="topic-card-header">
            <h3 class="topic-title">${t.title}</h3>
            <span class="topic-tag">${this.activeModule.toUpperCase()}</span>
          </div>
          <p class="topic-desc">${t.definition_beginner}</p>
          <div class="topic-meta">
            <span><i data-lucide="check-circle" style="color: ${isDone ? '#10b981' : '#6b7280'};"></i> ${isDone ? 'Completed' : 'Mark as Read'}</span>
            <span><i data-lucide="layers" style="color: #38bdf8;"></i> ${t.subtopics ? t.subtopics.length : 0} Sub-Topics</span>
          </div>
        </div>
      `;
    }
    gridHtml += `</div>`;
    return gridHtml;
  },

  showTopicGrid() {
    const data = this.modules[this.activeModule];
    const container = document.getElementById('module-body-container');
    if (data && container) {
      container.innerHTML = this.generateTopicGridHtml(data.topics);
      if (window.lucide) lucide.createIcons();
    }
  },

  openTopicDetail(topicId, selectedTab = 'tab_theory') {
    this.activeTopicId = topicId;
    this.activeTopicTab = selectedTab;
    const data = this.modules[this.activeModule];
    if (!data) return;

    const rawTopic = data.topics.find(t => t.id === topicId);
    if (!rawTopic) return;

    const topic = SchemaBuilder.createTopic(rawTopic);
    const completed = DatabaseManager.getCompletedTopics().includes(topicId);
    const bookmarked = DatabaseManager.getBookmarks().includes(topicId);

    const container = document.getElementById('module-body-container');
    if (!container) return;

    let html = `
      <div class="topic-detail-container animate-fade-in">
        <div class="detail-header">
          <div class="detail-title-group">
            <h2>${topic.title}</h2>
            <div style="display:flex; gap:0.5rem; margin-top:0.25rem;">
              <span class="topic-tag">${this.activeModule.toUpperCase()}</span>
              <button class="btn-secondary" style="padding: 2px 10px; font-size:0.75rem;" onclick="App.toggleTopicBookmark('${topic.id}')">
                <i data-lucide="bookmark" style="color:${bookmarked ? '#f59e0b' : 'inherit'};"></i> ${bookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
          <div style="display:flex; gap:0.75rem;">
            <button class="btn-secondary" onclick="App.toggleTopicComplete('${topic.id}')">
              <i data-lucide="check-circle" style="color:${completed ? '#10b981' : 'inherit'};"></i> ${completed ? 'Completed' : 'Mark Complete'}
            </button>
            <button class="btn-primary" onclick="App.showTopicGrid()"><i data-lucide="arrow-left"></i> Back to Grid</button>
          </div>
        </div>

        <!-- 7-Tab Section Navigation Bar -->
        <div class="topic-section-tabs">
          <button class="topic-tab-btn ${selectedTab === 'tab_theory' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_theory')"><i data-lucide="book-open"></i> 1. Core Theory</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_arch' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_arch')"><i data-lucide="cpu"></i> 2. Architecture</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_subtopics' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_subtopics')"><i data-lucide="layers"></i> 3. Subtopics (${topic.subtopics.length})</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_code' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_code')"><i data-lucide="code"></i> 4. Code Tiers</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_best' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_best')"><i data-lucide="shield-check"></i> 5. Best Practices</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_interview' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_interview')"><i data-lucide="briefcase"></i> 6. Interview Suite</button>
          <button class="topic-tab-btn ${selectedTab === 'tab_quiz' ? 'active' : ''}" onclick="App.openTopicDetail('${topic.id}', 'tab_quiz')"><i data-lucide="help-circle"></i> 7. Quiz & Summary</button>
        </div>

        <!-- Tab 1: Core Theory -->
        ${selectedTab === 'tab_theory' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="compass"></i> 1. Introduction & Context</div>
            <p><strong>What is it?</strong> ${topic.introduction.what}</p>
            <p style="margin-top:0.4rem;"><strong>Why Created?</strong> ${topic.introduction.why_created}</p>
            <p style="margin-top:0.4rem;"><strong>Why Needed?</strong> ${topic.introduction.why_needed}</p>
            <p style="margin-top:0.4rem;"><strong>History:</strong> ${topic.introduction.history}</p>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="file-text"></i> 2. Definitions</div>
            <p><strong>Beginner Definition:</strong> ${topic.definition_beginner}</p>
            <div class="interview-theory-box" style="margin-top:0.75rem;">
              <strong>MNC Interview Definition:</strong> ${topic.definition_interview}
            </div>
          </div>

          ${this.renderTopicGraphVisualizer(topic)}

          <div class="section-box" style="margin-top:1rem;">
            <div class="section-box-title"><i data-lucide="target"></i> 3. Why We Use It</div>
            <p><strong>Purpose:</strong> ${topic.why_we_use.purpose}</p>
            <p style="margin-top:0.4rem;"><strong>Problems Solved:</strong> ${Array.isArray(topic.why_we_use.problems_solved) ? topic.why_we_use.problems_solved.join(', ') : topic.why_we_use.problems_solved}</p>
            <p style="margin-top:0.4rem;"><strong>Real-world Importance:</strong> ${topic.why_we_use.real_world_importance}</p>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="smile"></i> 12. Real-Life Analogy</div>
            <p style="font-size:0.95rem; color:var(--text-main);">${topic.real_life_analogy}</p>
          </div>
        ` : ''}

        <!-- Tab 2: Architecture & Mechanics -->
        ${selectedTab === 'tab_arch' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="settings"></i> 4. Internal Working & Execution Flow</div>
            <p><strong>Execution Flow:</strong> ${topic.internal_working.execution_flow}</p>
            <p style="margin-top:0.4rem;"><strong>Memory Behavior:</strong> ${topic.internal_working.memory_behavior}</p>
            <div class="formula-box" style="margin-top:0.75rem; white-space:pre-wrap;">${topic.internal_working.diagram}</div>
          </div>

          ${this.renderTopicGraphVisualizer(topic)}

          <div class="section-box" style="margin-top:1rem;">
            <div class="section-box-title"><i data-lucide="terminal"></i> 5. Syntax & Keywords</div>
            <p><strong>Basic Syntax:</strong> <code>${typeof topic.syntax.basic === 'string' ? topic.syntax.basic : (topic.syntax.basic_syntax || JSON.stringify(topic.syntax.basic))}</code></p>
            <p style="margin-top:0.4rem;"><strong>Advanced Syntax:</strong> <code>${typeof topic.syntax.advanced === 'string' ? topic.syntax.advanced : (topic.syntax.advanced_syntax || JSON.stringify(topic.syntax.advanced))}</code></p>
            <p style="margin-top:0.4rem;"><strong>Keyword Explanation:</strong> ${topic.syntax.keyword_explanation}</p>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="list"></i> 6. Parameters & Arguments</div>
            <table class="params-table">
              <thead>
                <tr><th>Parameter</th><th>Data Type</th><th>Required</th><th>Default</th><th>Description</th></tr>
              </thead>
              <tbody>
                ${topic.parameters.map(p => `
                  <tr>
                    <td><code>${p.name}</code></td>
                    <td>${p.type}</td>
                    <td>${p.required ? 'Yes' : 'No'}</td>
                    <td><code>${p.default_val}</code></td>
                    <td>${p.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="table"></i> 9. Methods & Time/Space Complexities</div>
            <table class="methods-table">
              <thead>
                <tr><th>Method</th><th>Parameters</th><th>Return Type</th><th>Time Complexity</th><th>Space Complexity</th></tr>
              </thead>
              <tbody>
                ${topic.methods.map(m => `
                  <tr>
                    <td><code>${m.name}</code></td>
                    <td>${m.parameters}</td>
                    <td>${m.return_type}</td>
                    <td><span class="badge">${m.time_complexity}</span></td>
                    <td><span class="badge" style="background:rgba(16,185,129,0.15); color:#10b981;">${m.space_complexity}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          ${topic.formula ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="calculator"></i> 10. Mathematical Formulas</div>
            <div class="formula-box">${topic.formula}</div>
          </div>` : ''}
        ` : ''}

        <!-- Tab 3: Subtopics Deep Dive -->
        ${selectedTab === 'tab_subtopics' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="layers"></i> 3. Complete Subtopics Deep-Dive Breakdown (${topic.subtopics.length})</div>
            <div style="display:flex; flex-direction:column; gap:1.25rem; margin-top:1rem;">
              ${topic.subtopics.map((st, sIdx) => `
                <div style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-left:4px solid var(--accent-cyan); border-radius:12px; padding:1.25rem;">
                  <h4 style="color:var(--accent-cyan); font-size:1.05rem; margin-bottom:0.5rem;"><i data-lucide="check-circle" style="width:16px; height:16px; display:inline;"></i> Subtopic ${sIdx+1}: ${st.title}</h4>
                  <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:0.5rem;"><strong>Definition & Theory:</strong> ${st.theory}</p>
                  <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;"><strong>Internal Execution:</strong> ${st.internal_working}</p>
                  <div class="code-block-wrapper" style="margin-bottom:0.75rem;">
                    <div class="code-header"><span>Subtopic Code Implementation</span></div>
                    <pre><code>${this.escapeHtml(st.code_example)}</code></pre>
                  </div>
                  <div style="display:flex; gap:1rem; flex-wrap:wrap; font-size:0.8rem; color:var(--text-muted);">
                    <span><strong>Mistake:</strong> ${st.common_mistakes}</span>
                    <span><strong>Best Practice:</strong> ${st.best_practices}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Tab 4: Code & Production Examples -->
        ${selectedTab === 'tab_code' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="code"></i> 15. 4-Tier Code Examples</div>
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
              <button class="pill-btn active" onclick="document.querySelectorAll('.code-tier').forEach(e => e.style.display='none'); document.getElementById('code-beginner').style.display='block';">Beginner</button>
              <button class="pill-btn" onclick="document.querySelectorAll('.code-tier').forEach(e => e.style.display='none'); document.getElementById('code-intermediate').style.display='block';">Intermediate</button>
              <button class="pill-btn" onclick="document.querySelectorAll('.code-tier').forEach(e => e.style.display='none'); document.getElementById('code-advanced').style.display='block';">Advanced</button>
              <button class="pill-btn" onclick="document.querySelectorAll('.code-tier').forEach(e => e.style.display='none'); document.getElementById('code-production').style.display='block';">Production</button>
            </div>

            <div id="code-beginner" class="code-tier">
              <div class="code-block-wrapper">
                <div class="code-header"><span>Beginner Tier Code</span></div>
                <pre><code>${this.escapeHtml(topic.code_examples.beginner.code)}</code></pre>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;"><strong>Explanation:</strong> ${topic.code_examples.beginner.explanation}</p>
            </div>

            <div id="code-intermediate" class="code-tier" style="display:none;">
              <div class="code-block-wrapper">
                <div class="code-header"><span>Intermediate Tier Code</span></div>
                <pre><code>${this.escapeHtml(topic.code_examples.intermediate.code)}</code></pre>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;"><strong>Explanation:</strong> ${topic.code_examples.intermediate.explanation}</p>
            </div>

            <div id="code-advanced" class="code-tier" style="display:none;">
              <div class="code-block-wrapper">
                <div class="code-header"><span>Advanced Tier Code</span></div>
                <pre><code>${this.escapeHtml(topic.code_examples.advanced.code)}</code></pre>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;"><strong>Explanation:</strong> ${topic.code_examples.advanced.explanation}</p>
            </div>

            <div id="code-production" class="code-tier" style="display:none;">
              <div class="code-block-wrapper">
                <div class="code-header"><span>Production Enterprise Tier Code</span></div>
                <pre><code>${this.escapeHtml(topic.code_examples.production.code)}</code></pre>
              </div>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;"><strong>Explanation:</strong> ${topic.code_examples.production.explanation}</p>
            </div>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="folder"></i> 14. Real Project Example: ${topic.real_project_example.title}</div>
            <p style="font-size:0.9rem; color:var(--text-main); margin-bottom:0.75rem;">${topic.real_project_example.description}</p>
            <div class="code-block-wrapper">
              <div class="code-header"><span>Real Project Script</span></div>
              <pre><code>${this.escapeHtml(topic.real_project_example.code)}</code></pre>
            </div>
          </div>
        ` : ''}

        <!-- Tab 5: Best Practices & Comparisons -->
        ${selectedTab === 'tab_best' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="alert-triangle"></i> 16. Common Beginner Mistakes</div>
            ${topic.common_mistakes.map(m => `
              <div style="background:rgba(244,63,94,0.1); border-left:4px solid var(--accent-rose); padding:0.75rem; border-radius:6px; margin-bottom:0.5rem;">
                <strong style="color:var(--accent-rose);">Mistake:</strong> ${m.mistake}<br/>
                <strong style="color:var(--accent-emerald);">Fix:</strong> ${m.fix}
              </div>
            `).join('')}
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="shield-check"></i> 17. Production Best Practices & 18. Performance Tips</div>
            <p><strong>Best Practices:</strong> ${topic.best_practices.join(' | ')}</p>
            <p style="margin-top:0.5rem;"><strong>Performance Tips:</strong> ${topic.performance_tips.join(' | ')}</p>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="columns"></i> 21. Concept Comparison Table</div>
            <table class="comparison-table">
              <thead>
                <tr><th>Feature</th><th>${topic.title}</th><th>Alternate Approach</th><th>Winner / Recommendation</th></tr>
              </thead>
              <tbody>
                ${topic.comparison_table.map(c => `
                  <tr>
                    <td>${c.feature}</td>
                    <td>${c.this_concept}</td>
                    <td>${c.alternate}</td>
                    <td><span class="badge">${c.winner}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- Tab 6: Interview & Coding Suite -->
        ${selectedTab === 'tab_interview' ? `
          <div class="section-box">
            <div class="section-box-title"><i data-lucide="briefcase"></i> 22. Top MNC Interview Preparation (20 Optimised & 10 Tricky Questions)</div>
            <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1rem;">Master all 30 topic-specific MNC interview questions tailored for FAANG, Tier-1 Tech MNCs, and AI/ML data science technical rounds.</p>
            
            <div style="margin-bottom:1.25rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button class="pill-btn active" onclick="document.querySelectorAll('.topic-iq-card').forEach(e => e.style.display='block');">All 30 Questions</button>
              <button class="pill-btn" onclick="document.querySelectorAll('.topic-iq-card.optimised').forEach(e => e.style.display='block'); document.querySelectorAll('.topic-iq-card.tricky').forEach(e => e.style.display='none');">20 Optimised Questions</button>
              <button class="pill-btn" onclick="document.querySelectorAll('.topic-iq-card.tricky').forEach(e => e.style.display='block'); document.querySelectorAll('.topic-iq-card.optimised').forEach(e => e.style.display='none');">10 Tricky Questions</button>
            </div>

            <div class="interview-accordion">
              ${topic.interview_questions.optimised.map((iq, iIdx) => `
                <div class="interview-card topic-iq-card optimised" style="margin-bottom:0.75rem;">
                  <div class="interview-q-header" onclick="App.toggleInterviewAnswer(this)">
                    <span><span class="badge" style="background:rgba(59,130,246,0.2); color:#60a5fa; margin-right:6px;">Optimised Q${iIdx+1}</span> ${iq.q}</span>
                    <i data-lucide="chevron-down"></i>
                  </div>
                  <div class="interview-answer-body">
                    <p><strong>MNC Interviewer Expected Answer:</strong> ${iq.a}</p>
                    <p style="margin-top:0.4rem; color:var(--accent-amber); font-size:0.85rem;"><strong>Why Interviewer Asks This:</strong> ${iq.why_asked || 'Evaluates core technical mastery and real-world execution.'}</p>
                    ${iq.common_mistake ? `<p style="margin-top:0.25rem; color:var(--accent-rose); font-size:0.83rem;"><strong>Common Candidate Trap:</strong> ${iq.common_mistake}</p>` : ''}
                  </div>
                </div>
              `).join('')}

              ${topic.interview_questions.tricky.map((tq, tIdx) => `
                <div class="interview-card topic-iq-card tricky" style="margin-bottom:0.75rem;">
                  <div class="interview-q-header" onclick="App.toggleInterviewAnswer(this)">
                    <span><span class="badge" style="background:rgba(244,63,94,0.2); color:#fca5a5; margin-right:6px;">Tricky Q${tIdx+1}</span> ${tq.q}</span>
                    <i data-lucide="chevron-down"></i>
                  </div>
                  <div class="interview-answer-body">
                    <p><strong>Tricky Edge-Case Explanation:</strong> ${tq.a || tq.explanation}</p>
                    ${tq.explanation ? `<p style="margin-top:0.35rem; color:var(--accent-cyan); font-size:0.85rem;"><strong>Deep-Dive Insight:</strong> ${tq.explanation}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="terminal"></i> 24. Coding Challenges (Easy, Medium, Hard)</div>
            ${topic.coding_challenges.map(cq => `
              <div class="coding-challenge-card">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                  <span class="badge challenge-badge-${cq.difficulty.toLowerCase()}">${cq.difficulty}</span>
                  <span class="badge" style="background:rgba(255,255,255,0.05);">${cq.complexity}</span>
                </div>
                <p><strong>Problem:</strong> ${cq.problem}</p>
                <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.2rem;"><strong>Input:</strong> <code>${cq.input}</code> | <strong>Output:</strong> <code>${cq.output}</code></p>
                <button class="btn-secondary" style="margin-top:0.75rem; padding:3px 10px; font-size:0.75rem;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">Reveal Solution</button>
                <div style="display:none; margin-top:0.75rem;" class="code-block-wrapper">
                  <pre><code>${this.escapeHtml(cq.solution)}</code></pre>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Tab 7: Assessment & Summary -->
        ${selectedTab === 'tab_quiz' ? `
          ${this.renderTopicQuizWidget(topic)}

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="bookmark"></i> 26. Revision Notes</div>
            <ul style="padding-left:1.25rem; color:var(--text-main); font-size:0.9rem;">
              ${topic.revision_notes.map(r => `<li style="margin-bottom:0.35rem;">${r}</li>`).join('')}
            </ul>
          </div>

          <div class="section-box">
            <div class="section-box-title"><i data-lucide="file-text"></i> 27. Quick Cheat Sheet</div>
            <p><strong>Key Syntax:</strong> <code>${topic.cheat_sheet.key_syntax}</code></p>
            <p style="margin-top:0.4rem;"><strong>Essential Methods:</strong> ${topic.cheat_sheet.essential_methods.join(', ')}</p>
            <p style="margin-top:0.4rem;"><strong>Key Interview Takeaways:</strong> ${topic.cheat_sheet.key_interview_points.join(' | ')}</p>
          </div>
        ` : ''}
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  },

  renderTopicQuizWidget(topic) {
    if (!topic.quiz || topic.quiz.length === 0) return '';

    let html = `
      <div class="quiz-widget">
        <div class="quiz-widget-header">
          <i data-lucide="help-circle"></i> Quiz
        </div>
    `;

    topic.quiz.forEach((q, qIdx) => {
      html += `
        <div style="margin-bottom: 1.5rem;" id="quiz-block-${topic.id}-${qIdx}">
          <div class="quiz-question-text">Q${qIdx + 1}: ${q.question}</div>
          <div class="quiz-options-list">
      `;

      q.options.forEach((opt, optIdx) => {
        html += `
          <div class="quiz-option-item" id="opt-${topic.id}-${qIdx}-${optIdx}" onclick="App.checkQuizAnswer('${topic.id}', ${qIdx}, ${optIdx}, ${q.correct})">
            <span style="font-weight:700; width:20px;">${String.fromCharCode(65 + optIdx)}.</span> ${opt}
          </div>
        `;
      });

      html += `
          </div>
          <div class="quiz-explanation" id="expl-${topic.id}-${qIdx}">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  },

  checkQuizAnswer(topicId, qIdx, selectedOptIdx, correctOptIdx) {
    const parentBlock = document.getElementById(`quiz-block-${topicId}-${qIdx}`);
    if (!parentBlock) return;

    const topic = this.modules[this.activeModule].topics.find(t => t.id === topicId);
    const qData = topic.quiz[qIdx];

    qData.options.forEach((_, idx) => {
      const optElem = document.getElementById(`opt-${topicId}-${qIdx}-${idx}`);
      if (optElem) {
        optElem.classList.remove('selected', 'correct-answer', 'wrong-answer');
        if (idx === correctOptIdx) {
          optElem.classList.add('correct-answer');
        } else if (idx === selectedOptIdx) {
          optElem.classList.add('wrong-answer');
        }
      }
    });

    const explElem = document.getElementById(`expl-${topicId}-${qIdx}`);
    if (explElem) {
      explElem.classList.add('show');
    }
  },

  toggleTopicComplete(topicId) {
    const isNowDone = DatabaseManager.toggleTopicCompleted(topicId);
    this.renderHeaderStats();
    this.openTopicDetail(topicId, this.activeTopicTab);
  },

  toggleTopicBookmark(topicId) {
    DatabaseManager.toggleBookmark(topicId);
    this.openTopicDetail(topicId, this.activeTopicTab);
  },

  loadDashboardSection() {
    this.activeModule = 'dashboard';
    this.renderSidebar();

    const completed = DatabaseManager.getCompletedTopics();
    const bookmarks = DatabaseManager.getBookmarks();
    const totalTopics = 74;
    const pct = Math.round((completed.length / totalTopics) * 100);

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in">
        <h1 class="hero-title">Learner Analytics & Dashboard</h1>
        <p class="hero-subtitle">Track your overall 90-day progress, interview readiness score, learning streak, and topic mastery metrics.</p>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">${pct}%</div>
            <div class="stat-label">Curriculum Progress</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${completed.length} / ${totalTopics}</div>
            <div class="stat-label">Topics Mastered</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">5 Days</div>
            <div class="stat-label">Learning Streak 🔥</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">88%</div>
            <div class="stat-label">MNC Readiness Score 🎯</div>
          </div>
        </div>
      </div>

      <div class="section-box">
        <div class="section-box-title"><i data-lucide="bookmark"></i> Bookmarked Topics (${bookmarks.length})</div>
        ${bookmarks.length === 0 ? '<p style="color:var(--text-muted);">No bookmarked topics yet. Click "Bookmark" on any topic to save it here for quick revision.</p>' : `
          <div class="topic-grid">
            ${bookmarks.map(bId => {
              let foundTopic = null;
              let foundMod = null;
              Object.keys(this.modules).forEach(m => {
                const t = this.modules[m].topics.find(x => x.id === bId);
                if (t) { foundTopic = t; foundMod = m; }
              });
              if (!foundTopic) return '';
              return `
                <div class="topic-card" onclick="App.activeModule='${foundMod}'; App.openTopicDetail('${foundTopic.id}')">
                  <div class="topic-card-header">
                    <h3 class="topic-title">${foundTopic.title}</h3>
                    <span class="topic-tag">${foundMod.toUpperCase()}</span>
                  </div>
                  <p class="topic-desc">${foundTopic.definition}</p>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  loadAdminSection() {
    this.activeModule = 'admin';
    this.renderSidebar();

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in">
        <h1 class="hero-title">Platform Admin Control Panel</h1>
        <p class="hero-subtitle">Manage curriculum modules, subjects, interview Q&A databases, user statistics, and system health.</p>
        <div class="hero-stats">
          <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">Active Modules</div></div>
          <div class="stat-card"><div class="stat-number">74</div><div class="stat-label">Total Topics</div></div>
          <div class="stat-card"><div class="stat-number">150</div><div class="stat-label">Interview Q&As</div></div>
        </div>
      </div>

      <div class="section-box">
        <div class="section-box-title"><i data-lucide="settings"></i> System Analytics & Schema Health</div>
        <p>All 74 topics and subtopics conform to the 28-Section Master Schema Engine. Interactive Code Runner and Quiz Engines active.</p>
      </div>
    `;

    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  loadModuleInterview(modKey) {
    const data = this.modules[modKey];
    const container = document.getElementById('module-body-container');
    if (!data || !container) return;

    let html = `
      <div class="animate-fade-in">
        <h3 style="font-size:1.4rem; font-weight:800; margin-bottom:1rem; color:var(--accent-amber);">
          Top MNC Optimized (20) & Tricky (10) Interview Questions for ${data.subject}
        </h3>

        <div style="margin-bottom:1.5rem; display:flex; gap:0.5rem;">
          <button class="pill-btn active" onclick="App.filterInterviewQs('all')">All 30 Questions</button>
          <button class="pill-btn" onclick="App.filterInterviewQs('optimised')">20 Optimised Questions</button>
          <button class="pill-btn" onclick="App.filterInterviewQs('tricky')">10 Tricky Questions</button>
        </div>

        <div class="interview-accordion" id="interview-list-container">
          ${this.generateInterviewListHtml(data.interview_questions, 'all')}
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  generateInterviewListHtml(iqs, filter) {
    let html = '';

    if (filter === 'all' || filter === 'optimised') {
      iqs.optimised.forEach((item, idx) => {
        html += `
          <div class="interview-card optimised">
            <div class="interview-q-header" onclick="App.toggleInterviewAnswer(this)">
              <span><span class="badge" style="background:rgba(59,130,246,0.2); color:#60a5fa;">Optimised Q${idx+1}</span> ${item.q}</span>
              <i data-lucide="chevron-down"></i>
            </div>
            <div class="interview-answer-body">
              <strong>MNC Interviewer Expected Answer:</strong><br/>
              ${item.a}
            </div>
          </div>
        `;
      });
    }

    if (filter === 'all' || filter === 'tricky') {
      iqs.tricky.forEach((item, idx) => {
        html += `
          <div class="interview-card tricky">
            <div class="interview-q-header" onclick="App.toggleInterviewAnswer(this)">
              <span><span class="badge" style="background:rgba(244,63,94,0.2); color:#fca5a5;">Tricky Q${idx+1}</span> ${item.q}</span>
              <i data-lucide="chevron-down"></i>
            </div>
            <div class="interview-answer-body">
              <strong>Tricky Edge-Case Explanation:</strong><br/>
              ${item.a}
            </div>
          </div>
        `;
      });
    }

    return html;
  },

  filterInterviewQs(filter) {
    const data = this.modules[this.activeModule];
    const container = document.getElementById('interview-list-container');
    if (data && container) {
      container.innerHTML = this.generateInterviewListHtml(data.interview_questions, filter);
      if (window.lucide) lucide.createIcons();
    }
  },

  toggleInterviewAnswer(headerElem) {
    const body = headerElem.nextElementSibling;
    if (body) {
      body.classList.toggle('open');
    }
  },

  loadInterviewSection() {
    this.activeModule = 'interview';
    this.renderSidebar();

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in">
        <h1 class="hero-title">Top MNC Interview Preparation Master Repository</h1>
        <p class="hero-subtitle">150 Total Curated Interview Questions (100 Optimised + 50 Tricky Questions) tailored for Tier-1 Tech MNCs, FAANG, and Big 4 AI/ML Data Science rounds.</p>
      </div>

      <div class="filter-pills">
        <button class="pill-btn active" onclick="App.showGlobalInterviewSubject('all')">All Subjects (150 Qs)</button>
        <button class="pill-btn" onclick="App.showGlobalInterviewSubject('python')">Python Libraries</button>
        <button class="pill-btn" onclick="App.showGlobalInterviewSubject('genai')">Generative AI</button>
        <button class="pill-btn" onclick="App.showGlobalInterviewSubject('ml')">Machine Learning</button>
        <button class="pill-btn" onclick="App.showGlobalInterviewSubject('bigdata')">Big Data</button>
        <button class="pill-btn" onclick="App.showGlobalInterviewSubject('sql')">SQL</button>
      </div>

      <div id="global-interview-container" class="interview-accordion">
        ${this.generateAllGlobalInterviewHtml('all')}
      </div>
    `;

    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  generateAllGlobalInterviewHtml(subjFilter) {
    let html = '';
    const keys = subjFilter === 'all' ? Object.keys(this.modules) : [subjFilter];

    keys.forEach(k => {
      const mod = this.modules[k];
      if (mod && mod.interview_questions) {
        html += `<h3 style="color:var(--accent-cyan); margin:1.5rem 0 0.75rem 0; font-size:1.2rem;">${mod.subject} Interview Prep</h3>`;
        html += this.generateInterviewListHtml(mod.interview_questions, 'all');
      }
    });

    return html;
  },

  showGlobalInterviewSubject(subjKey) {
    const container = document.getElementById('global-interview-container');
    if (container) {
      container.innerHTML = this.generateAllGlobalInterviewHtml(subjKey);
      if (window.lucide) lucide.createIcons();
    }
  },

  loadRoadmapSection() {
    this.activeModule = 'roadmap';
    this.renderSidebar();

    const completedDays = DatabaseManager.getCompletedDays();
    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in">
        <h1 class="hero-title">90-Day Complete MNC Data Science & AI Study Roadmap</h1>
        <p class="hero-subtitle">Structured day-by-day learning curriculum designed to transform beginners into production-ready engineers qualified for top MNC roles in 90 days.</p>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">${completedDays.length} / 90</div>
            <div class="stat-label">Days Finished</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${Math.round((completedDays.length/90)*100)}%</div>
            <div class="stat-label">Curriculum Progress</div>
          </div>
        </div>
      </div>

      <div class="roadmap-timeline">
    `;

    ROADMAP_DATA.forEach(week => {
      html += `
        <div class="roadmap-week-card">
          <div class="week-title"><i data-lucide="calendar"></i> ${week.title}</div>
          <div class="days-grid">
      `;

      week.days.forEach(d => {
        const isDone = completedDays.includes(d.day);
        html += `
          <div class="day-item ${isDone ? 'completed' : ''}">
            <span style="font-size:0.85rem; font-weight:600;">${d.title}</span>
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="App.toggleDayComplete(${d.day})" style="cursor:pointer;" />
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  toggleDayComplete(dayNum) {
    DatabaseManager.toggleDayCompleted(dayNum);
    this.loadRoadmapSection();
  },

  loadPlaygroundSection() {
    this.activeModule = 'playground';
    this.renderSidebar();

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div class="hero-banner animate-fade-in" style="margin-bottom:1rem; padding:1.25rem 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h1 class="hero-title" style="font-size:1.6rem;"><i data-lucide="terminal" style="display:inline; width:28px; height:28px; color:var(--accent-cyan);"></i> Full-Size Live Code Playground & IDE</h1>
            <p class="hero-subtitle" style="font-size:0.88rem; margin-top:0.25rem;">Side-by-side live execution environment for Python, NumPy, Pandas, Scikit-Learn ML, and SQL Catalyst queries.</p>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
            <span class="badge" style="background:rgba(56,189,248,0.15); color:#38bdf8; padding:6px 12px; font-size:0.8rem; border:1px solid rgba(56,189,248,0.3);" id="playground-status-badge">Ready</span>
            <button class="btn-primary" style="padding:8px 18px; font-size:0.9rem; font-weight:700;" onclick="PlaygroundManager.runCode()">
              <i data-lucide="play"></i> Run Code (Ctrl+Enter)
            </button>
          </div>
        </div>
      </div>

      <!-- Control Toolbar -->
      <div class="playground-toolbar" style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; background:var(--bg-card); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:12px;">
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <button class="pill-btn active" id="btn-lang-python" onclick="PlaygroundManager.switchLanguage('python'); document.querySelectorAll('.lang-pill').forEach(e=>e.classList.remove('active')); this.classList.add('active');">Python 3.11</button>
          <button class="pill-btn lang-pill" id="btn-lang-sql" onclick="PlaygroundManager.switchLanguage('sql'); document.querySelectorAll('.lang-pill').forEach(e=>e.classList.remove('active')); this.classList.add('active');">SQL Catalyst Engine</button>
        </div>

        <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
          <span style="font-size:0.82rem; color:var(--text-muted);">Presets:</span>
          <select id="preset-snippet-select" onchange="PlaygroundManager.loadPresetSnippet(this.value)" style="background:var(--bg-tertiary); color:var(--text-main); border:1px solid var(--border-color); padding:5px 10px; border-radius:6px; font-size:0.82rem; cursor:pointer;">
            <option value="python_pandas">Pandas GroupBy & Aggregation</option>
            <option value="python_numpy">NumPy Matrix Dot Product & Inv</option>
            <option value="python_ml">Scikit-Learn ML Classification</option>
            <option value="sql_window">SQL Window CTE & DENSE_RANK()</option>
            <option value="sql_join">SQL LEFT JOIN & Aggregate HAVING</option>
          </select>

          <button class="btn-secondary" style="padding:4px 10px; font-size:0.78rem;" onclick="PlaygroundManager.clearCode()">
            <i data-lucide="trash-2"></i> Clear Editor
          </button>
        </div>
      </div>

      <!-- Full-Size Side-by-Side 2-Column IDE Workspace -->
      <div class="playground-split-workspace">
        <!-- Left Panel: Full-Size Source Code Editor -->
        <div class="playground-editor-panel">
          <div class="panel-header">
            <span style="display:flex; align-items:center; gap:0.4rem;"><i data-lucide="code" style="width:16px; height:16px; color:var(--accent-cyan);"></i> Source Code Editor</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">Shortcut: Ctrl + Enter</span>
          </div>
          <div class="editor-input-wrapper">
            <textarea id="playground-editor" class="full-size-code-input" spellcheck="false" placeholder="// Write Python or SQL code here..."></textarea>
          </div>
        </div>

        <!-- Right Panel: Side-by-Side Live Terminal Output Console -->
        <div class="playground-console-panel">
          <div class="panel-header">
            <span style="display:flex; align-items:center; gap:0.4rem;"><i data-lucide="terminal" style="width:16px; height:16px; color:var(--accent-emerald);"></i> Execution Terminal & Debugger</span>
            <div style="display:flex; gap:0.75rem; font-size:0.75rem; color:var(--text-muted);">
              <span>Exec: <strong id="playground-exec-time" style="color:var(--accent-emerald);">0 ms</strong></span>
              <span>RAM: <strong id="playground-mem-usage" style="color:var(--accent-cyan);">0 MB</strong></span>
            </div>
          </div>
          <div id="playground-console" class="full-size-terminal-output">// Press 'Run Code' or Ctrl+Enter to execute live code side-by-side...</div>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
    PlaygroundManager.init();
  },

  handleSearch(query) {
    if (!query || query.trim() === '') {
      if (this.activeModule in this.modules) {
        this.loadModule(this.activeModule);
      }
      return;
    }

    const q = query.toLowerCase().trim();
    let matches = [];

    Object.keys(this.modules).forEach(modKey => {
      const mod = this.modules[modKey];
      mod.topics.forEach(t => {
        const subMatch = t.subtopics && t.subtopics.some(s => (typeof s === 'string' ? s.toLowerCase().includes(q) : s.title.toLowerCase().includes(q) || s.theory.toLowerCase().includes(q)));
        if (t.title.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.where_we_use.toLowerCase().includes(q) || subMatch) {
          matches.push({ ...t, moduleKey: modKey });
        }
      });
    });

    const contentArea = document.getElementById('main-content-view');
    if (!contentArea) return;

    let html = `
      <div style="margin-bottom:1.5rem;">
        <h2>Search Results for "${this.escapeHtml(query)}" (${matches.length} matches found)</h2>
      </div>
      <div class="topic-grid">
    `;

    matches.forEach(t => {
      html += `
        <div class="topic-card animate-fade-in" onclick="App.activeModule='${t.moduleKey}'; App.openTopicDetail('${t.id}')">
          <div class="topic-card-header">
            <h3 class="topic-title">${t.title}</h3>
            <span class="topic-tag">${t.moduleKey.toUpperCase()}</span>
          </div>
          <p class="topic-desc">${t.definition}</p>
        </div>
      `;
    });

    html += `</div>`;
    contentArea.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  renderTopicGraphVisualizer(topic) {
    if (!topic || !topic.title) return '';
    const titleLower = topic.title.toLowerCase();

    // 1. Matplotlib / Seaborn / Visualization Libraries Graphs
    if (titleLower.includes('matplotlib') || titleLower.includes('seaborn') || titleLower.includes('visualization') || titleLower.includes('opencv')) {
      return `
        <div class="graph-visualizer-card animate-fade-in" style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-top:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); font-size:1rem; font-weight:700;"><i data-lucide="bar-chart-2"></i> Visual Plot Chart Engine</h4>
            <span class="badge" style="background:rgba(56,189,248,0.2); color:#38bdf8;">Graphics Engine</span>
          </div>
          <div style="background:#0f172a; border-radius:8px; padding:1rem; text-align:center; box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
            <svg viewBox="0 0 500 210" style="width:100%; max-height:210px; font-family:sans-serif;">
              <!-- Grid Lines -->
              <line x1="50" y1="30" x2="470" y2="30" stroke="#334155" stroke-dasharray="4"/>
              <line x1="50" y1="80" x2="470" y2="80" stroke="#334155" stroke-dasharray="4"/>
              <line x1="50" y1="130" x2="470" y2="130" stroke="#334155" stroke-dasharray="4"/>
              <line x1="50" y1="170" x2="470" y2="170" stroke="#475569" stroke-width="2"/>
              <line x1="50" y1="30" x2="50" y2="170" stroke="#475569" stroke-width="2"/>
              
              <!-- Axes Labels -->
              <text x="260" y="195" fill="#94a3b8" font-size="11" text-anchor="middle">X-Axis (Feature Dimensions)</text>
              <text x="20" y="100" fill="#94a3b8" font-size="11" text-anchor="middle" transform="rotate(-90 20 100)">Y-Axis (Target Data)</text>

              <!-- Bars / Curves -->
              <rect x="80" y="100" width="35" height="70" rx="3" fill="#38bdf8" opacity="0.85"/>
              <rect x="140" y="60" width="35" height="110" rx="3" fill="#38bdf8" opacity="0.85"/>
              <rect x="200" y="120" width="35" height="50" rx="3" fill="#38bdf8" opacity="0.85"/>
              <rect x="260" y="40" width="35" height="130" rx="3" fill="#38bdf8" opacity="0.85"/>
              <rect x="320" y="85" width="35" height="85" rx="3" fill="#38bdf8" opacity="0.85"/>

              <!-- Trendline Overlay -->
              <path d="M 97 100 Q 157 40 217 110 T 337 75" fill="none" stroke="#f43f5e" stroke-width="3"/>
              <circle cx="97" cy="100" r="4" fill="#f43f5e"/>
              <circle cx="157" cy="60" r="4" fill="#f43f5e"/>
              <circle cx="217" cy="120" r="4" fill="#f43f5e"/>
              <circle cx="277" cy="40" r="4" fill="#f43f5e"/>
              <circle cx="337" cy="85" r="4" fill="#f43f5e"/>

              <!-- Legend -->
              <rect x="380" y="30" width="85" height="35" rx="4" fill="#1e293b" stroke="#334155"/>
              <rect x="388" y="42" width="10" height="10" fill="#38bdf8"/>
              <text x="404" y="50" fill="#e2e8f0" font-size="9">Bar Metric</text>
            </svg>
          </div>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.6rem;">Graphical visual plot generated by ${topic.title}.</p>
        </div>
      `;
    }

    // 2. Machine Learning / Regression / Neural Network / Classification Graphs
    if (titleLower.includes('regression') || titleLower.includes('classification') || titleLower.includes('neural') || titleLower.includes('clustering') || titleLower.includes('scikit') || titleLower.includes('pytorch') || titleLower.includes('tensorflow') || titleLower.includes('learn')) {
      return `
        <div class="graph-visualizer-card animate-fade-in" style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-top:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); font-size:1rem; font-weight:700;"><i data-lucide="activity"></i> Model Decision Boundary & Fit Chart</h4>
            <span class="badge" style="background:rgba(16,185,129,0.2); color:#10b981;">Model Geometry</span>
          </div>
          <div style="background:#0f172a; border-radius:8px; padding:1rem; text-align:center; box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
            <svg viewBox="0 0 500 190" style="width:100%; max-height:190px; font-family:sans-serif;">
              <line x1="40" y1="160" x2="460" y2="160" stroke="#475569" stroke-width="2"/>
              <line x1="40" y1="20" x2="40" y2="160" stroke="#475569" stroke-width="2"/>
              
              <!-- Points -->
              <circle cx="80" cy="140" r="5" fill="#38bdf8"/>
              <circle cx="130" cy="120" r="5" fill="#38bdf8"/>
              <circle cx="180" cy="105" r="5" fill="#38bdf8"/>
              <circle cx="230" cy="85" r="5" fill="#38bdf8"/>
              <circle cx="280" cy="70" r="5" fill="#38bdf8"/>
              <circle cx="330" cy="55" r="5" fill="#38bdf8"/>
              <circle cx="380" cy="40" r="5" fill="#38bdf8"/>

              <!-- Regression Line -->
              <line x1="50" y1="150" x2="410" y2="30" stroke="#10b981" stroke-width="3"/>

              <!-- Residuals -->
              <line x1="130" y1="120" x2="130" y2="128" stroke="#f43f5e" stroke-dasharray="2,2"/>
              <line x1="230" y1="85" x2="230" y2="96" stroke="#f43f5e" stroke-dasharray="2,2"/>

              <text x="250" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">Feature Dimension X</text>
              <text x="310" y="25" fill="#10b981" font-size="11" font-weight="bold">Best-Fit Decision Boundary</text>
            </svg>
          </div>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.6rem;">Graphic decision boundary and optimization curve for ${topic.title}.</p>
        </div>
      `;
    }

    // 3. Generative AI / RAG / Vector DB / Transformers Graphs
    if (titleLower.includes('rag') || titleLower.includes('vector') || titleLower.includes('transformer') || titleLower.includes('llm') || titleLower.includes('agent') || titleLower.includes('embedding') || titleLower.includes('prompt')) {
      return `
        <div class="graph-visualizer-card animate-fade-in" style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-top:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); font-size:1rem; font-weight:700;"><i data-lucide="share-2"></i> Neural Network & Vector Architecture Graph</h4>
            <span class="badge" style="background:rgba(245,158,11,0.2); color:#f59e0b;">AI Flow Graph</span>
          </div>
          <div style="background:#0f172a; border-radius:8px; padding:1rem; text-align:center;">
            <svg viewBox="0 0 520 140" style="width:100%; max-height:140px; font-family:sans-serif;">
              <rect x="15" y="35" width="95" height="55" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <text x="62" y="60" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Input Token</text>
              <text x="62" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">[User Prompt]</text>

              <line x1="110" y1="62" x2="140" y2="62" stroke="#38bdf8" stroke-width="2"/>

              <rect x="145" y="35" width="105" height="55" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
              <text x="197" y="60" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Embedder</text>
              <text x="197" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">[Vector Float32]</text>

              <line x1="250" y1="62" x2="280" y2="62" stroke="#f59e0b" stroke-width="2"/>

              <rect x="285" y="35" width="105" height="55" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
              <text x="337" y="60" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Vector Search</text>
              <text x="337" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">[Nearest k-NN]</text>

              <line x1="390" y1="62" x2="420" y2="62" stroke="#10b981" stroke-width="2"/>

              <rect x="425" y="35" width="85" height="55" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
              <text x="467" y="60" fill="#ec4899" font-size="11" font-weight="bold" text-anchor="middle">LLM Output</text>
              <text x="467" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">[Response]</text>
            </svg>
          </div>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.6rem;">End-to-end neural vector retrieval diagram for ${topic.title}.</p>
        </div>
      `;
    }

    // 4. Default System Architecture Execution Graph
    return `
      <div class="graph-visualizer-card animate-fade-in" style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-top:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h4 style="color:var(--accent-cyan); font-size:1rem; font-weight:700;"><i data-lucide="git-branch"></i> System Execution & Flow Architecture</h4>
          <span class="badge" style="background:rgba(56,189,248,0.2); color:#38bdf8;">Execution Graph</span>
        </div>
        <div style="background:#0f172a; border-radius:8px; padding:1rem; text-align:center;">
          <svg viewBox="0 0 500 110" style="width:100%; max-height:110px; font-family:sans-serif;">
            <rect x="25" y="30" width="115" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="82" y="60" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Input Stream</text>

            <line x1="140" y1="55" x2="190" y2="55" stroke="#38bdf8" stroke-width="2"/>

            <rect x="195" y="30" width="115" height="50" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="252" y="60" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">${topic.title}</text>

            <line x1="310" y1="55" x2="360" y2="55" stroke="#10b981" stroke-width="2"/>

            <rect x="365" y="30" width="115" height="50" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
            <text x="422" y="60" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Target Result</text>
          </svg>
        </div>
      </div>
    `;
  },

  escapeHtml(str) {
    if (typeof str !== 'string') return String(str || '');
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
