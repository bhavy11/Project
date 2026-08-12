/* Client-Side Data Store & LocalStorage Manager */
const DatabaseManager = {
  STORAGE_KEYS: {
    THEME: 'mnc_prep_theme',
    PROGRESS: 'mnc_prep_progress',
    QUIZ_SCORES: 'mnc_prep_quizzes',
    BOOKMARKS: 'mnc_prep_bookmarks',
    ROADMAP_DAYS: 'mnc_prep_roadmap'
  },

  init() {
    if (!localStorage.getItem(this.STORAGE_KEYS.PROGRESS)) {
      localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.QUIZ_SCORES)) {
      localStorage.setItem(this.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify({}));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.BOOKMARKS)) {
      localStorage.setItem(this.STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.ROADMAP_DAYS)) {
      localStorage.setItem(this.STORAGE_KEYS.ROADMAP_DAYS, JSON.stringify([]));
    }
  },

  getTheme() {
    return localStorage.getItem(this.STORAGE_KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(this.STORAGE_KEYS.THEME, theme);
  },

  getCompletedTopics() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PROGRESS)) || [];
    } catch (e) {
      return [];
    }
  },

  toggleTopicCompleted(topicId) {
    const completed = this.getCompletedTopics();
    const index = completed.indexOf(topicId);
    if (index > -1) {
      completed.splice(index, 1);
    } else {
      completed.push(topicId);
    }
    localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify(completed));
    return completed.includes(topicId);
  },

  getQuizScores() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.QUIZ_SCORES)) || {};
    } catch (e) {
      return {};
    }
  },

  saveQuizScore(topicId, score, total) {
    const scores = this.getQuizScores();
    scores[topicId] = { score, total, timestamp: Date.now() };
    localStorage.setItem(this.STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
  },

  getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.BOOKMARKS)) || [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(itemKey) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(itemKey);
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(itemKey);
    }
    localStorage.setItem(this.STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return bookmarks.includes(itemKey);
  },

  getCompletedDays() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ROADMAP_DAYS)) || [];
    } catch (e) {
      return [];
    }
  },

  toggleDayCompleted(dayNum) {
    const days = this.getCompletedDays();
    const index = days.indexOf(dayNum);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(dayNum);
    }
    localStorage.setItem(this.STORAGE_KEYS.ROADMAP_DAYS, JSON.stringify(days));
    return days.includes(dayNum);
  }
};

DatabaseManager.init();
