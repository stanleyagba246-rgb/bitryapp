import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// NATIVE INLINE SVG ICONS (Prevents cross-bundle React $$typeof mismatches)
// ============================================================================

function IconBase({ children, className = 'w-5 h-5', viewBox = '0 0 24 24', fill = 'none' }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SettingsIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </IconBase>
);

const CalendarIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconBase>
);

const PlusIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconBase>
);

const MoreVerticalIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </IconBase>
);

const XIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconBase>
);

const ChevronLeftIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="15 18 9 12 15 6" />
  </IconBase>
);

const ChevronRightIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="9 18 15 12 9 6" />
  </IconBase>
);

const ChevronDownIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="6 9 12 15 18 9" />
  </IconBase>
);

const ChevronUpIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="18 15 12 9 6 15" />
  </IconBase>
);

const ArrowLeftIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </IconBase>
);

const ArrowRightIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconBase>
);

const CheckIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="20 6 9 17 4 12" />
  </IconBase>
);

const Trash2Icon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </IconBase>
);

const Edit3Icon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </IconBase>
);

const HistoryIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M3 3v5h5" />
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
    <polyline points="12 7 12 12 15 15" />
  </IconBase>
);

const RotateCcwIcon = ({ className }) => (
  <IconBase className={className}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </IconBase>
);

const FlameIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </IconBase>
);

const CheckCircle2Icon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

const SparklesIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </IconBase>
);

const ShieldIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </IconBase>
);

const LockIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconBase>
);

const MailIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconBase>
);

const MapPinIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </IconBase>
);

const SendIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </IconBase>
);

const BarChart3Icon = ({ className }) => (
  <IconBase className={className}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </IconBase>
);

const MenuIcon = ({ className }) => (
  <IconBase className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </IconBase>
);

const HomeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconBase>
);

// ============================================================================
// CONSTANTS, PUBLISHER INFO & THEME PALETTES
// ============================================================================

const PUBLISHER_INFO = {
  appName: 'Bitry',
  companyName: 'Cozy Automations LLC',
  address: '1209 Mountain Road Pl NE, Albuquerque, NM 87110, USA',
  supportEmail: 'stanley@cozyautomation.com',
  website: 'https://cozyautomation.com',
  lastUpdated: 'November 19, 2026'
};

// Reference "Today" anchor matching the Bitry app calendar & stats
const INITIAL_TODAY_STR = '2026-11-09';

// Curated Unsplash photography with graceful gradient/emoji fallbacks
const LANDING_IMAGES = {
  hero: {
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    alt: 'Morning journaling and wellness planning desk routine',
    fallbackEmoji: '🌱',
    fallbackLabel: 'Daily Habit & Streak Planner'
  },
  movement: {
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    alt: 'Movement and daily fitness consistency',
    fallbackEmoji: '🏃',
    fallbackLabel: 'Movement & Fitness'
  },
  mindful: {
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    alt: 'Mindful focus, stretching, and quiet prayer routine',
    fallbackEmoji: '🧎',
    fallbackLabel: 'Mindful Focus & Prayer'
  },
  journaling: {
    url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80',
    alt: 'Daily journaling, reading, and structured reflection',
    fallbackEmoji: '✍️',
    fallbackLabel: 'Daily Journaling & Planning'
  }
};

const THEME_PALETTES = {
  amber: {
    id: 'amber',
    name: 'Amber Gold',
    border: '#F7DCAA',
    activeBorder: '#F5B041',
    checkBg: '#F5B041',
    lightBg: '#FEF9EE',
    ringColor: '#F5B041'
  },
  coral: {
    id: 'coral',
    name: 'Soft Coral',
    border: '#F5CBC5',
    activeBorder: '#EB7A68',
    checkBg: '#EB7A68',
    lightBg: '#FDF3F2',
    ringColor: '#EB7A68'
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    border: '#B15DFF',
    activeBorder: '#9B42F5',
    checkBg: '#A547F5',
    lightBg: '#F6EEFF',
    ringColor: '#9B42F5'
  },
  green: {
    id: 'green',
    name: 'Emerald Green',
    border: '#34C759',
    activeBorder: '#2ECC71',
    checkBg: '#32C759',
    lightBg: '#EEFAEE',
    ringColor: '#2ECC71'
  },
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    border: '#A9D1F7',
    activeBorder: '#3498DB',
    checkBg: '#3498DB',
    lightBg: '#EFF7FE',
    ringColor: '#3498DB'
  }
};

const PRESET_CATEGORIES = [
  {
    id: 'sport',
    title: 'Sport',
    items: [
      { name: 'Walk', emoji: '🚶', theme: 'green', targetPerWeek: 7 },
      { name: 'Run', emoji: '🏃', theme: 'amber', targetPerWeek: 5 },
      { name: 'Yoga', emoji: '🧘', theme: 'purple', targetPerWeek: 4 },
      { name: 'Exercise', emoji: '🏋️', theme: 'coral', targetPerWeek: 4 },
      { name: 'Stretch', emoji: '🤸', theme: 'blue', targetPerWeek: 7 },
      { name: 'Swim', emoji: '🏊', theme: 'blue', targetPerWeek: 3 },
      { name: 'Cycling', emoji: '🚴', theme: 'green', targetPerWeek: 4 },
      { name: 'Dance', emoji: '💃', theme: 'coral', targetPerWeek: 3 },
      { name: 'Interval Training', emoji: '⏱️', theme: 'purple', targetPerWeek: 4 }
    ]
  },
  {
    id: 'health',
    title: 'Health',
    items: [
      { name: 'Drink Water', emoji: '💧', theme: 'blue', targetPerWeek: 7 },
      { name: 'Eat Healthy', emoji: '🥗', theme: 'green', targetPerWeek: 7 },
      { name: 'Sleep Early', emoji: '😴', theme: 'purple', targetPerWeek: 7 },
      { name: 'Vitamins', emoji: '💊', theme: 'amber', targetPerWeek: 7 },
      { name: 'Meditate', emoji: '🧘‍♂️', theme: 'coral', targetPerWeek: 5 }
    ]
  },
  {
    id: 'thought',
    title: 'Thought',
    items: [
      { name: 'Work', emoji: '👷', theme: 'amber', targetPerWeek: 7 },
      { name: 'Plan', emoji: '📋', theme: 'coral', targetPerWeek: 7 },
      { name: 'Pray', emoji: '🧎', theme: 'purple', targetPerWeek: 7 },
      { name: 'Journal', emoji: '✍️', theme: 'green', targetPerWeek: 7 },
      { name: 'Read', emoji: '📚', theme: 'blue', targetPerWeek: 5 }
    ]
  }
];

const EMOJI_OPTIONS = [
  '👷', '📋', '🧎', '✍️', '🏋️', '🚶', '🏃', '🧘', '🤸', '🏊',
  '🚴', '💃', '⏱️', '💧', '😴', '🥗', '💊', '📚', '🎯', '💻',
  '🎨', '🎸', '🌱', '🧹', '🍵', '🧠', '☀️', '🌙'
];

const FAQ_ITEMS = [
  {
    question: 'Is Bitry completely free to use?',
    answer:
      'Yes. You can jump right into Bitry, track unlimited daily habits, inspect monthly calendar histories, and analyze weekly completion statistics at zero cost and with no third-party advertisements.'
  },
  {
    question: 'Where is my habit data stored, and is it private?',
    answer:
      'Bitry uses offline-first local storage so your habit logs and streaks stay directly on your browser/device. Cozy Automations LLC does not sell your personal routine data or run behavioral ad trackers.'
  },
  {
    question: 'How does streak and monthly calendar tracking work?',
    answer:
      'Every time you check off a habit on your daily list, Bitry updates your current streak, best streak, and 6x7 monthly calendar view—complete with a circular Goal Met ring gauge and flexible 1x to 7x weekly targets.'
  },
  {
    question: 'Can I use Bitry on both mobile phones and desktop web browsers?',
    answer:
      'Yes. Bitry features a responsive mobile-first interface designed to feel native on phones, tablets, and desktop browsers, alongside our Android app listing on Google Play.'
  }
];

// ============================================================================
// DATE UTILITY FUNCTIONS & INITIAL SAMPLE SEED DATA
// ============================================================================

function parseDateStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function formatDateStr(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(dateStr, days) {
  const dt = parseDateStr(dateStr);
  dt.setDate(dt.getDate() + days);
  return formatDateStr(dt);
}

const SHORT_DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function buildInitialHabits() {
  const exactPrayLogs = {
    '2026-10-08': 'done',
    '2026-10-10': 'done',
    '2026-10-11': 'done',
    '2026-10-12': 'done',
    '2026-10-13': 'done',
    '2026-10-14': 'done',
    '2026-10-15': 'done',
    '2026-10-16': 'done',
    '2026-10-17': 'done',
    '2026-10-18': 'done',
    '2026-10-19': 'done',
    '2026-10-20': 'done',
    '2026-10-21': 'done',
    '2026-10-22': 'done',
    '2026-10-23': 'done',
    '2026-10-24': 'done',
    '2026-10-25': 'done',
    '2026-10-26': 'done',
    '2026-10-27': 'done',
    '2026-10-28': 'done',
    '2026-10-29': 'done',
    '2026-10-30': 'done',
    '2026-10-31': 'missed',
    '2026-11-01': 'missed',
    '2026-11-02': 'done',
    '2026-11-03': 'done',
    '2026-11-04': 'done',
    '2026-11-05': 'missed',
    '2026-11-06': 'done',
    '2026-11-07': 'done',
    '2026-11-08': 'done',
    '2026-11-09': 'done'
  };

  return [
    {
      id: 'habit-work',
      name: 'Work',
      emoji: '👷',
      theme: 'amber',
      targetPerWeek: 7,
      prevWeekTrend: 100,
      logs: {
        '2026-11-06': 'done',
        '2026-11-07': 'done',
        '2026-11-08': 'missed'
      }
    },
    {
      id: 'habit-plan',
      name: 'Plan',
      emoji: '📋',
      theme: 'coral',
      targetPerWeek: 7,
      prevWeekTrend: 90,
      logs: {
        '2026-11-06': 'done',
        '2026-11-07': 'missed',
        '2026-11-08': 'done'
      }
    },
    {
      id: 'habit-pray',
      name: 'Pray',
      emoji: '🧎',
      theme: 'purple',
      targetPerWeek: 7,
      prevWeekTrend: 83,
      logs: exactPrayLogs
    },
    {
      id: 'habit-journal',
      name: 'Journal',
      emoji: '✍️',
      theme: 'green',
      targetPerWeek: 7,
      prevWeekTrend: 80,
      logs: {
        '2026-11-04': 'done',
        '2026-11-06': 'done',
        '2026-11-07': 'done',
        '2026-11-08': 'done',
        '2026-11-09': 'done'
      }
    },
    {
      id: 'habit-exercise',
      name: 'Exercise',
      emoji: '🏋️',
      theme: 'blue',
      targetPerWeek: 4,
      prevWeekTrend: 100,
      logs: {
        '2026-11-06': 'done'
      }
    }
  ];
}

function computeHabitStats(habit, year, monthZeroIndexed) {
  const logs = habit.logs || {};
  const doneDates = Object.keys(logs)
    .filter((d) => logs[d] === 'done')
    .sort();

  const totalDone = doneDates.length;

  const monthPrefix = `${year}-${String(monthZeroIndexed + 1).padStart(2, '0')}-`;
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  const doneInMonth = doneDates.filter((d) => d.startsWith(monthPrefix)).length;

  const monthlyGoalDays = Math.round((habit.targetPerWeek / 7) * daysInMonth) || daysInMonth;
  const goalMetPercent = Math.min(100, Math.round((doneInMonth / monthlyGoalDays) * 100));

  let bestStreak = 0;
  let tempStreak = 0;
  let prevDateStr = null;

  for (const dStr of doneDates) {
    if (!prevDateStr) {
      tempStreak = 1;
    } else {
      const expectedNext = addDays(prevDateStr, 1);
      if (dStr === expectedNext) {
        tempStreak += 1;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }
    prevDateStr = dStr;
  }

  let currentStreak = 0;
  let cursor =
    logs[INITIAL_TODAY_STR] === 'done'
      ? INITIAL_TODAY_STR
      : addDays(INITIAL_TODAY_STR, -1);

  while (logs[cursor] === 'done') {
    currentStreak += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    currentStreak,
    bestStreak,
    doneInMonth,
    totalDone,
    goalMetPercent
  };
}

// ============================================================================
// SAFE IMAGE COMPONENT WITH GRACEFUL FALLBACK
// ============================================================================

function SafeImage({ src, alt, className, fallbackEmoji = '🌱', fallbackLabel = 'Bitry' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[#5D38F6] via-[#7A49F8] to-[#A547F5] flex flex-col items-center justify-center text-white p-6 text-center`}
      >
        <span className="text-5xl mb-2">{fallbackEmoji}</span>
        <span className="text-xs font-bold uppercase tracking-wider opacity-90">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

// ============================================================================
// ROOT CONTROLLER: LANDING SITE <-> HABIT TRACKER APP ROUTER
// ============================================================================

export default function App() {
  const [isAppOpen, setIsAppOpen] = useState(() => {
    try {
      return localStorage.getItem('bitry_app_active') === 'true';
    } catch {
      return false;
    }
  });

  // Active public page: 'home' | 'contact' | 'privacy' | 'terms'
  const [publicPage, setPublicPage] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.toLowerCase() : '';
    if (hash === '#contact') return 'contact';
    if (hash === '#privacy') return 'privacy';
    if (hash === '#terms') return 'terms';
    return 'home';
  });

  const [globalToast, setGlobalToast] = useState(null);

  const triggerGlobalToast = (msg) => {
    setGlobalToast(msg);
    setTimeout(() => {
      setGlobalToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#contact') {
        setPublicPage('contact');
      } else if (hash === '#privacy') {
        setPublicPage('privacy');
      } else if (hash === '#terms') {
        setPublicPage('terms');
      } else if (hash === '#home' || hash === '') {
        setPublicPage('home');
      }
    };
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const navigatePublicPage = (nextPage) => {
    setPublicPage(nextPage);
    setIsAppOpen(false);
    try {
      localStorage.setItem('bitry_app_active', 'false');
      const nextHash = nextPage === 'home' ? '' : `#${nextPage}`;
      window.history.replaceState(
        null,
        '',
        nextHash || window.location.pathname + window.location.search
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignore history/storage errors in sandboxed frames
    }
  };

  const handleEnterApp = () => {
    setIsAppOpen(true);
    try {
      localStorage.setItem('bitry_app_active', 'true');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#141422] font-sans antialiased">
      {isAppOpen ? (
        <BitryTrackerApp
          onGoHome={() => navigatePublicPage('home')}
          onOpenLegal={(page) => navigatePublicPage(page)}
        />
      ) : (
        <BitryPublicSite
          activePage={publicPage}
          onNavigatePage={navigatePublicPage}
          onEnterApp={handleEnterApp}
          onNotify={triggerGlobalToast}
        />
      )}

      {globalToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-[#141422] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/10">
          <CheckCircle2Icon className="w-4 h-4 text-[#2ECC71] shrink-0" />
          <span>{globalToast}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PUBLIC WEBSITE SHELL (Navbar + Home / Contact / Privacy / Terms Pages)
// ============================================================================

function BitryPublicSite({
  activePage,
  onNavigatePage,
  onEnterApp,
  onNotify
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'contact', label: 'Contact' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'terms', label: 'Terms' }
  ];

  const handleNavClick = (pageId) => {
    setMobileNavOpen(false);
    onNavigatePage(pageId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#141422] overflow-x-hidden">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#5D38F6] text-white flex items-center justify-center text-xl shadow-md shadow-[#5D38F6]/25 group-hover:scale-105 transition">
              🌱
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">
                Bitry
              </span>
              <span className="text-[10px] font-semibold text-gray-400 tracking-wide mt-0.5">
                by Cozy Automations
              </span>
            </div>
          </button>

          {/* Desktop Page Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full transition ${
                    isActive
                      ? 'bg-[#F3EEFF] text-[#5D38F6] font-bold'
                      : 'text-gray-600 hover:text-[#5D38F6] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Single Sign In CTA */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5D38F6] hover:bg-[#4D29E3] text-white text-sm font-bold shadow-lg shadow-[#5D38F6]/25 transition active:scale-95"
            >
              <span>Open App</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="sm:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {mobileNavOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 px-5 py-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-1.5 text-sm font-semibold">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-3.5 py-2.5 rounded-xl transition ${
                      isActive
                        ? 'bg-[#F3EEFF] text-[#5D38F6] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  onEnterApp();
                }}
                className="w-full py-3 rounded-full bg-[#5D38F6] text-white text-sm font-bold text-center inline-flex items-center justify-center gap-2"
              >
                <span>Open App</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Individual Page Content */}
      <main className="flex-1 flex flex-col">
        {activePage === 'home' && (
          <HomePageContent
            onEnterApp={onEnterApp}
            onNavigatePage={onNavigatePage}
          />
        )}

        {activePage === 'contact' && (
          <ContactPageContent
            onNavigatePage={onNavigatePage}
            onNotify={onNotify}
          />
        )}

        {activePage === 'privacy' && (
          <PrivacyPageContent onNavigatePage={onNavigatePage} />
        )}

        {activePage === 'terms' && (
          <TermsPageContent onNavigatePage={onNavigatePage} />
        )}
      </main>

      {/* Shared Footer */}
      <footer className="bg-[#141422] text-gray-300 pt-14 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            <div className="lg:col-span-5 space-y-3">
              <button
                type="button"
                onClick={() => onNavigatePage('home')}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#5D38F6] text-white flex items-center justify-center text-lg">
                  🌱
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Bitry
                </span>
              </button>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                A calm, visual daily habit tracker built to help you turn small daily
                actions into lasting streaks.
              </p>
              <p className="text-xs text-gray-500 pt-1">
                Published by {PUBLISHER_INFO.companyName} • Albuquerque, NM
              </p>
            </div>

            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Pages
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('home')}
                    className="hover:text-white transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('contact')}
                    className="hover:text-white transition"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('privacy')}
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigatePage('terms')}
                    className="hover:text-white transition"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                App & Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={onEnterApp}
                    className="hover:text-white transition"
                  >
                    Sign In to Bitry App
                  </button>
                </li>
                <li>
                  <a
                    href={`mailto:${PUBLISHER_INFO.supportEmail}`}
                    className="hover:text-white transition"
                  >
                    {PUBLISHER_INFO.supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} {PUBLISHER_INFO.companyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => onNavigatePage('home')}
                className="hover:text-gray-300 transition"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('contact')}
                className="hover:text-gray-300 transition"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('privacy')}
                className="hover:text-gray-300 transition"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('terms')}
                className="hover:text-gray-300 transition"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// PAGE 1: HOME LANDING PAGE CONTENT
// ============================================================================

function HomePageContent({ onEnterApp, onNavigatePage }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const [heroDemoHabits, setHeroDemoHabits] = useState([
    { id: 'demo-walk', name: 'Morning Walk', emoji: '🚶', theme: 'green', done: true },
    { id: 'demo-water', name: 'Drink Water', emoji: '💧', theme: 'blue', done: true },
    { id: 'demo-read', name: 'Read 20 Mins', emoji: '📚', theme: 'purple', done: false }
  ]);

  const toggleHeroDemoHabit = (id) => {
    setHeroDemoHabits((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const heroDoneCount = heroDemoHabits.filter((h) => h.done).length;
  const heroProgressPct = Math.round((heroDoneCount / heroDemoHabits.length) * 100);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-[#F6F4FF] via-[#FAFBFD] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#5D38F6]/20 shadow-sm text-xs font-bold text-[#5D38F6]">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Daily Habit & Streak Companion</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                Build lasting daily habits,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5D38F6] to-[#A547F5]">
                  one check-in at a time.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bitry gives you a calm, distraction-free workspace to track daily routines,
                grow visual streaks, and review monthly calendar progress—starting from a
                clean blank canvas.
              </p>

              {/* Hero Single Sign In CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onEnterApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#5D38F6] hover:bg-[#4D29E3] text-white text-base font-bold shadow-xl shadow-[#5D38F6]/30 transition active:scale-95"
                >
                  <span>Open App</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2Icon className="w-4 h-4 text-[#2ECC71]" />
                  No clutter
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldIcon className="w-4 h-4 text-[#5D38F6]" />
                  Offline-first local storage
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FlameIcon className="w-4 h-4 text-[#F5B041]" />
                  Visual monthly streaks
                </span>
              </div>
            </div>

            {/* Right Column: Lifestyle Hero Photography + Interactive Mini-App */}
            <div className="lg:col-span-6 relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-gray-100">
                <SafeImage
                  src={LANDING_IMAGES.hero.url}
                  alt={LANDING_IMAGES.hero.alt}
                  fallbackEmoji={LANDING_IMAGES.hero.fallbackEmoji}
                  fallbackLabel={LANDING_IMAGES.hero.fallbackLabel}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-gray-100 absolute -top-5 -left-5">
                <div className="w-10 h-10 rounded-xl bg-[#FFF4E5] text-[#F39C12] flex items-center justify-center">
                  <FlameIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-900">21-Day Best Streak</p>
                  <p className="text-[11px] font-medium text-gray-500">Consistency builds momentum</p>
                </div>
              </div>

              <div className="mt-5 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-4 sm:w-[325px] bg-white rounded-[26px] p-4 shadow-[0_20px_50px_rgba(20,20,45,0.18)] border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-gray-900">Today’s Focus</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F6EEFF] text-[#5D38F6]">
                      Interactive
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#5D38F6]">{heroProgressPct}%</span>
                </div>

                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#5D38F6] rounded-full transition-all duration-300"
                    style={{ width: `${heroProgressPct}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {heroDemoHabits.map((item) => {
                    const pal = THEME_PALETTES[item.theme] || THEME_PALETTES.purple;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleHeroDemoHabit(item.id)}
                        style={{
                          borderColor: item.done ? pal.activeBorder : pal.border
                        }}
                        className="w-full rounded-2xl border-[1.6px] px-3 py-2 flex items-center justify-between bg-white hover:bg-gray-50/70 transition text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            style={{
                              backgroundColor: item.done ? pal.checkBg : 'transparent',
                              borderColor: item.done ? pal.checkBg : '#8E8A99'
                            }}
                            className="w-5 h-5 rounded-full border-[1.6px] flex items-center justify-center transition"
                          >
                            {item.done && <CheckIcon className="w-3 h-3 text-white" />}
                          </span>
                          <span className="text-xs font-bold text-gray-900">{item.name}</span>
                          <span className="text-sm">{item.emoji}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400">
                          {item.done ? 'Done' : 'Tap'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Lifestyle Gallery */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5D38F6]">
              Lifestyle & Balance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Designed for every rhythm of your day
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Organize physical movement, spiritual stillness, and focused reflection in
              one unified daily checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                img: LANDING_IMAGES.movement,
                badge: '🏃 Sport & Energy',
                title: 'Movement & Fitness',
                desc: 'Track daily walks, runs, gym sessions, and swims with custom weekly frequency goals from 1x to 7x per week.'
              },
              {
                img: LANDING_IMAGES.mindful,
                badge: '🧎 Stillness & Clarity',
                title: 'Mindful Focus & Prayer',
                desc: 'Protect time for prayer, meditation, hydration, and early rest with color-coded streak calendars.'
              },
              {
                img: LANDING_IMAGES.journaling,
                badge: '✍️ Thought & Growth',
                title: 'Daily Journaling & Planning',
                desc: 'Build lasting reading, writing, and work-planning habits that compound into multi-week streaks.'
              }
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded-[28px] overflow-hidden border border-gray-100 bg-[#FAFBFD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <SafeImage
                    src={card.img.url}
                    alt={card.img.alt}
                    fallbackEmoji={card.img.fallbackEmoji}
                    fallbackLabel={card.img.fallbackLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {card.badge}
                  </span>
                  <h3 className="absolute bottom-4 left-5 right-5 text-lg font-extrabold text-white tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 sm:py-24 bg-[#FAFBFD] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5D38F6]">
              Everything You Need
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Simple on the surface. Powerful underneath.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              Every screen in Bitry is crafted to eliminate friction so checking off your
              habits takes less than three seconds a day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                IconComp: CheckCircle2Icon,
                iconColor: 'text-[#2ECC71]',
                bg: 'bg-[#EAFAF1]',
                title: 'One-Tap Daily Check-Ins',
                desc: 'Tap the circular checkmark beside any habit on your 7-day week strip to complete it and watch your daily progress bar fill immediately.'
              },
              {
                IconComp: HistoryIcon,
                iconColor: 'text-[#A547F5]',
                bg: 'bg-[#F6EEFF]',
                title: 'Monthly Streak Calendar',
                desc: 'Tap any habit to open its 6x7 monthly calendar grid—cycle dates between Done, Missed, and Clear while tracking your Goal Met ring gauge.'
              },
              {
                IconComp: BarChart3Icon,
                iconColor: 'text-[#3498DB]',
                bg: 'bg-[#EBF5FB]',
                title: 'Weekly Completion Analytics',
                desc: 'Inspect 7-day completion bar charts and ranked per-habit completion percentages across any week of the year.'
              },
              {
                IconComp: SparklesIcon,
                iconColor: 'text-[#F39C12]',
                bg: 'bg-[#FFF4E5]',
                title: 'Preset & Custom Habit Library',
                desc: 'Choose from curated Sport, Health, and Thought templates or craft custom habits with 28 expressive emojis and 5 accent border themes.'
              },
              {
                IconComp: LockIcon,
                iconColor: 'text-[#EB7A68]',
                bg: 'bg-[#FDF3F2]',
                title: 'Instant Local Persistence',
                desc: 'Your habit history saves automatically to local device storage for instant offline responsiveness and privacy.'
              },
              {
                IconComp: PlusIcon,
                iconColor: 'text-[#5D38F6]',
                bg: 'bg-[#F3EEFF]',
                title: 'Zero-Noise Blank Canvas Start',
                desc: 'Sign in to a calm, clutter-free screen featuring a single "+ Start Habit" button so you build your routine intentionally from scratch.'
              }
            ].map((feat) => {
              const FeatureIcon = feat.IconComp;
              return (
                <div
                  key={feat.title}
                  className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl ${feat.bg} flex items-center justify-center mb-4`}
                  >
                    <FeatureIcon className={`w-5 h-5 ${feat.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5D38F6]">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Start your first habit in under 30 seconds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Click Sign In',
                desc: 'Tap Sign In in the navigation bar or hero section to open your personal Bitry workspace right away.'
              },
              {
                step: '02',
                title: 'Start Your First Habit',
                desc: 'Tap "+ Start Habit" on your clean blank canvas to pick a Sport, Health, or Thought preset or customize your own habit.'
              },
              {
                step: '03',
                title: 'Track Streaks & Monthly Goals',
                desc: 'Check off habits daily, build your current and best streaks, and monitor your Goal Met ring gauge across every month.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-[26px] bg-[#FAFBFD] border border-gray-100 p-7 text-center md:text-left"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#5D38F6] text-white text-sm font-extrabold shadow-md shadow-[#5D38F6]/20 mb-5">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#5D38F6] hover:bg-[#4D29E3] text-white text-sm sm:text-base font-bold shadow-xl shadow-[#5D38F6]/25 transition active:scale-95"
            >
              <span>Sign In & Start Tracking</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('contact')}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-sm sm:text-base font-bold transition"
            >
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24 bg-[#FAFBFD] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5D38F6]">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/70 transition"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUpIcon className="w-5 h-5 text-[#5D38F6] shrink-0" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// PAGE 2: DEDICATED CONTACT PAGE
// ============================================================================

function ContactPageContent({ onNavigatePage, onNotify }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    onNotify('Message sent to Cozy Automations support!');
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#F6F4FF] via-[#FAFBFD] to-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => onNavigatePage('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#5D38F6] transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
            Have a question about Bitry, feedback on habit features, or a privacy request?
            Reach out directly to our team at {PUBLISHER_INFO.companyName}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Publisher Details Card */}
          <div className="lg:col-span-5 bg-white rounded-[28px] p-7 border border-gray-100 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5D38F6]">
                Developer & Publisher
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">
                {PUBLISHER_INFO.companyName}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Official publisher of {PUBLISHER_INFO.appName}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F3EEFF] text-[#5D38F6] flex items-center justify-center shrink-0 mt-0.5">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Support Email
                  </p>
                  <a
                    href={`mailto:${PUBLISHER_INFO.supportEmail}`}
                    className="font-bold text-gray-900 hover:text-[#5D38F6] transition"
                  >
                    {PUBLISHER_INFO.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EAFAF1] text-[#2ECC71] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Registered Business Address
                  </p>
                  <p className="font-semibold text-gray-800 leading-relaxed">
                    {PUBLISHER_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
              We typically respond to all support and data-privacy inquiries within 1–2
              business days.
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-7 sm:p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EAFAF1] text-[#2ECC71] flex items-center justify-center mx-auto">
                  <CheckCircle2Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Thank you, {name}!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  We have received your message regarding <strong>{topic}</strong> and will
                  reply to <strong>{email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#F3EEFF] text-[#5D38F6] text-xs font-bold hover:bg-[#E7DCFF] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full rounded-2xl bg-[#FAFBFD] border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#5D38F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl bg-[#FAFBFD] border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#5D38F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-2xl bg-[#FAFBFD] border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#5D38F6]"
                  >
                    <option value="General Support">General Support</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Privacy & Data Inquiry">Privacy & Data Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our team help you?"
                    className="w-full rounded-2xl bg-[#FAFBFD] border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#5D38F6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#5D38F6] hover:bg-[#4D29E3] text-white text-sm font-bold shadow-lg shadow-[#5D38F6]/25 transition active:scale-95"
                >
                  <SendIcon className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 3: DEDICATED PRIVACY POLICY PAGE
// ============================================================================

function PrivacyPageContent({ onNavigatePage }) {
  return (
    <div className="flex-1 bg-[#FAFBFD] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigatePage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#5D38F6] transition mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-[28px] p-7 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5D38F6]">
              Legal & Data Safety
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Effective Date: {PUBLISHER_INFO.lastUpdated} • Published by{' '}
              {PUBLISHER_INFO.companyName}
            </p>
          </div>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">1. Overview</h2>
            <p>
              {PUBLISHER_INFO.companyName} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) operates the <strong>Bitry</strong> habit tracker web
              and mobile application. We respect your privacy and designed Bitry with a
              local-first architecture so you remain in control of your personal routines.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              2. Information Stored on Your Device
            </h2>
            <p>
              Habit titles, emojis, weekly frequency goals, and daily completion logs are
              stored locally on your device using browser <code>localStorage</code>. We do
              not transmit your personal habit logs to external advertising servers or sell
              user data to third parties.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              3. Support Communications
            </h2>
            <p>
              If you voluntarily contact us via our Contact page or email{' '}
              <a
                href={`mailto:${PUBLISHER_INFO.supportEmail}`}
                className="text-[#5D38F6] font-semibold underline"
              >
                {PUBLISHER_INFO.supportEmail}
              </a>
              , we use your name and email address solely to respond to your inquiry.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              4. Data Deletion & User Control
            </h2>
            <p>
              You can clear all stored habit data at any time directly inside the Bitry
              app by opening <strong>Settings → Reset to Blank Screen (Clear Habits)</strong>{' '}
              or by clearing your browser/app storage.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">5. Contact Us</h2>
            <p>
              For privacy questions, write to {PUBLISHER_INFO.companyName},{' '}
              {PUBLISHER_INFO.address}, or email {PUBLISHER_INFO.supportEmail}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE 4: DEDICATED TERMS OF SERVICE PAGE
// ============================================================================

function TermsPageContent({ onNavigatePage }) {
  return (
    <div className="flex-1 bg-[#FAFBFD] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigatePage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#5D38F6] transition mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-[28px] p-7 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5D38F6]">
              Legal Agreement
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Last Updated: {PUBLISHER_INFO.lastUpdated} • {PUBLISHER_INFO.companyName}
            </p>
          </div>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using <strong>Bitry</strong>, you agree to be bound by these
              Terms of Service provided by {PUBLISHER_INFO.companyName}. If you do not
              agree, please discontinue use of the application.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              2. Personal Productivity Use Only
            </h2>
            <p>
              Bitry is a personal habit-tracking and self-organization tool. It does not
              provide medical, clinical, psychological, or professional health advice.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              3. Intellectual Property
            </h2>
            <p>
              All visual designs, user interface components, branding, and software code
              within Bitry are the property of {PUBLISHER_INFO.companyName} and are
              protected by applicable intellectual property laws.
            </p>
          </section>

          <section className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-base font-extrabold text-gray-900">
              4. Disclaimer & Limitation of Liability
            </h2>
            <p>
              Bitry is provided &ldquo;as is&rdquo; without warranties of any kind. Because
              habit records are stored locally on your device, you are responsible for
              maintaining backups of your browser or device data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BITRY HABIT TRACKER APP COMPONENT (4 Screens + Settings Home Page Button)
// ============================================================================

function BitryTrackerApp({ onGoHome, onOpenLegal }) {
  const storageKey = 'bitry_habits_workspace_v1';

  // Start with a clean blank habit state by default
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to read habits from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(habits));
    } catch (e) {
      console.error('Failed to save habits to localStorage:', e);
    }
  }, [habits, storageKey]);

  // Navigation & UI state ('today' | 'statistics' | 'add')
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState(INITIAL_TODAY_STR);
  const [stripStartDate, setStripStartDate] = useState('2026-11-06');

  // Detail modal state
  const [detailHabitId, setDetailHabitId] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState({ year: 2026, month: 10 });

  // Statistics week start
  const [statsWeekMonday, setStatsWeekMonday] = useState('2026-11-09');

  // Action menu state for habit cards
  const [openMenuHabitId, setOpenMenuHabitId] = useState(null);

  // Add / Edit Habit modal & accordion state
  const [expandedCategory, setExpandedCategory] = useState('sport');
  const [habitFormModal, setHabitFormModal] = useState(null);
  const [deleteConfirmHabit, setDeleteConfirmHabit] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuHabitId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // ============================================================================
  // HABIT CRUD ACTIONS
  // ============================================================================

  const toggleHabitOnDate = (habitId, dateStr) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const currentStatus = h.logs?.[dateStr];
        const nextLogs = { ...(h.logs || {}) };
        if (currentStatus === 'done') {
          delete nextLogs[dateStr];
        } else {
          nextLogs[dateStr] = 'done';
        }
        return { ...h, logs: nextLogs };
      })
    );
  };

  const cycleHabitCalendarDay = (habitId, dateStr) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const current = h.logs?.[dateStr];
        const nextLogs = { ...(h.logs || {}) };
        if (!current) {
          nextLogs[dateStr] = 'done';
        } else if (current === 'done') {
          nextLogs[dateStr] = 'missed';
        } else {
          delete nextLogs[dateStr];
        }
        return { ...h, logs: nextLogs };
      })
    );
  };

  const handleSaveHabitForm = (formData) => {
    if (!formData.name.trim()) return;

    if (habitFormModal?.mode === 'edit' && formData.id) {
      setHabits((prev) =>
        prev.map((h) =>
          h.id === formData.id
            ? {
                ...h,
                name: formData.name.trim(),
                emoji: formData.emoji,
                theme: formData.theme,
                targetPerWeek: Number(formData.targetPerWeek) || 7
              }
            : h
        )
      );
      showToast(`Updated "${formData.name.trim()}"`);
    } else {
      const newHabit = {
        id: `habit-${Date.now()}`,
        name: formData.name.trim(),
        emoji: formData.emoji || '✨',
        theme: formData.theme || 'purple',
        targetPerWeek: Number(formData.targetPerWeek) || 7,
        prevWeekTrend: 100,
        logs: {}
      };
      setHabits((prev) => [...prev, newHabit]);
      showToast(`Added "${newHabit.name} ${newHabit.emoji}"`);
      setActiveTab('today');
    }
    setHabitFormModal(null);
  };

  const handleDeleteHabit = (habitId) => {
    const target = habits.find((h) => h.id === habitId);
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    if (detailHabitId === habitId) setDetailHabitId(null);
    setDeleteConfirmHabit(null);
    if (target) showToast(`Deleted "${target.name}"`);
  };

  const handleClearAllHabits = () => {
    setHabits([]);
    setDetailHabitId(null);
    setSettingsModalOpen(false);
    showToast('Cleared all habits');
  };

  const handleResetDemoData = () => {
    const fresh = buildInitialHabits();
    setHabits(fresh);
    setSelectedDate(INITIAL_TODAY_STR);
    setStripStartDate('2026-11-06');
    setStatsWeekMonday('2026-11-09');
    setSettingsModalOpen(false);
    showToast('Loaded sample Bitry habits & history');
  };

  // ============================================================================
  // DERIVED DATA
  // ============================================================================

  const stripDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const dStr = addDays(stripStartDate, i);
      const dt = parseDateStr(dStr);
      const dayLabel = SHORT_DAY_NAMES[dt.getDay()];
      const dayNum = dt.getDate();
      const doneCount = habits.filter((h) => h.logs?.[dStr] === 'done').length;
      const totalCount = habits.length;
      return { dateStr: dStr, dayLabel, dayNum, doneCount, totalCount };
    });
  }, [stripStartDate, habits]);

  const selectedDayProgress = useMemo(() => {
    const total = habits.length;
    const completed = habits.filter((h) => h.logs?.[selectedDate] === 'done').length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }, [habits, selectedDate]);

  const statsData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const dStr = addDays(statsWeekMonday, i);
      const dt = parseDateStr(dStr);
      const label = `${dt.getDate()} ${SHORT_MONTH_NAMES[dt.getMonth()]}`;
      const doneCount = habits.filter((h) => h.logs?.[dStr] === 'done').length;
      const ratio = habits.length > 0 ? doneCount / habits.length : 0;
      return { dateStr: dStr, label, doneCount, ratio };
    });

    const totalTargetInWeek = habits.reduce((acc, h) => acc + (h.targetPerWeek || 7), 0);
    let totalDoneInWeek = 0;

    const perHabitStats = habits.map((h) => {
      const doneInWeek = days.filter((d) => h.logs?.[d.dateStr] === 'done').length;
      totalDoneInWeek += doneInWeek;
      const target = h.targetPerWeek || 7;
      const pct = target > 0 ? Math.round((doneInWeek / target) * 100) : 0;
      return { ...h, doneInWeek, target, pct };
    });

    const sortedHabits = [...perHabitStats].sort((a, b) => b.pct - a.pct);
    const overallPercent =
      totalTargetInWeek > 0 ? Math.round((totalDoneInWeek / totalTargetInWeek) * 100) : 0;

    const startDt = parseDateStr(statsWeekMonday);
    const endDt = parseDateStr(addDays(statsWeekMonday, 6));
    const rangeLabel =
      statsWeekMonday === INITIAL_TODAY_STR
        ? `Today - ${endDt.getDate()} ${FULL_MONTH_NAMES[endDt.getMonth()]}`
        : `${startDt.getDate()} ${SHORT_MONTH_NAMES[startDt.getMonth()]} - ${endDt.getDate()} ${FULL_MONTH_NAMES[endDt.getMonth()]}`;

    return {
      days,
      totalDoneInWeek,
      totalTargetInWeek,
      overallPercent,
      rangeLabel,
      sortedHabits
    };
  }, [habits, statsWeekMonday]);

  const detailHabit = useMemo(
    () => habits.find((h) => h.id === detailHabitId) || null,
    [habits, detailHabitId]
  );

  const openHabitDetail = (habitId) => {
    setDetailHabitId(habitId);
    const dt = parseDateStr(selectedDate);
    setCalendarMonth({ year: dt.getFullYear(), month: dt.getMonth() });
  };

  return (
    <div className="min-h-screen bg-[#ECEEF4] flex flex-col items-center justify-start sm:justify-center sm:py-6 font-sans text-[#1C1C28] select-none">
      {/* Mobile Phone Frame Container */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[900px] bg-[#FAFBFD] sm:rounded-[42px] sm:shadow-[0_24px_70px_rgba(20,20,45,0.16)] sm:border-[6px] sm:border-white flex flex-col relative overflow-hidden">
        {/* Top App Bar with Brand & Home Page Link */}
        <div className="px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-gray-800 bg-white">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-[#6236FF]/10 text-[#6236FF] tracking-tight">
              🌱 Bitry
            </span>
          </div>
          <button
            type="button"
            onClick={onGoHome}
            className="text-[11px] font-bold text-gray-500 hover:text-[#5D38F6] transition"
            title="Return to Bitry Home Page"
          >
            Home Page
          </button>
        </div>

        {/* =================================================================== */}
        {/* SCREEN 1: TODAY / HABITS VIEW                                       */}
        {/* =================================================================== */}
        {activeTab === 'today' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="px-5 pt-3 pb-4 bg-white flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Bitry Settings"
              >
                <SettingsIcon className="w-[22px] h-[22px]" />
              </button>

              <div className="flex flex-col items-center">
                <h1 className="text-[19px] font-bold tracking-tight text-gray-900">
                  {selectedDate === INITIAL_TODAY_STR
                    ? 'Today'
                    : `${parseDateStr(selectedDate).getDate()} ${
                        SHORT_MONTH_NAMES[parseDateStr(selectedDate).getMonth()]
                      }`}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedDate(INITIAL_TODAY_STR);
                  setStripStartDate('2026-11-06');
                  showToast('Jumped to Today (Mon, 9 Nov)');
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Jump to Today"
              >
                <CalendarIcon className="w-[21px] h-[21px]" />
              </button>
            </header>

            {/* Horizontal 7-Day Week Strip */}
            <div className="bg-white px-2 pb-3 relative">
              <div className="flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => setStripStartDate((prev) => addDays(prev, -7))}
                  className="p-1 text-gray-400 hover:text-gray-700 active:scale-90 transition"
                  title="Previous Week"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>

                <div className="flex-1 grid grid-cols-7 gap-1.5">
                  {stripDays.map((item) => {
                    const isSelected = item.dateStr === selectedDate;
                    const isPastOrToday = item.dateStr <= INITIAL_TODAY_STR;

                    let borderColorClass = 'border-[#EFEFF4] text-gray-900 bg-white';
                    if (isSelected) {
                      borderColorClass =
                        'bg-[#5D38F6] border-[#5D38F6] text-white shadow-[0_6px_16px_rgba(93,56,246,0.28)]';
                    } else if (isPastOrToday && habits.length > 0) {
                      if (item.doneCount >= 2) {
                        borderColorClass = 'border-[#58D68D] bg-white text-gray-900';
                      } else if (item.doneCount > 0) {
                        borderColorClass = 'border-[#F5B041] bg-white text-gray-900';
                      }
                    }

                    return (
                      <div key={item.dateStr} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`w-full py-2 rounded-[14px] border-[1.6px] flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${borderColorClass}`}
                        >
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                              isSelected ? 'text-white/90' : 'text-gray-400'
                            }`}
                          >
                            {item.dayLabel}
                          </span>
                          <span
                            className={`text-[15px] font-bold mt-0.5 ${
                              isSelected ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.dayNum}
                          </span>
                        </button>
                        <div className="h-2.5 flex items-center justify-center">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5D38F6]"></span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setStripStartDate((prev) => addDays(prev, 7))}
                  className="p-1 text-gray-400 hover:text-gray-700 active:scale-90 transition"
                  title="Next Week"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Card */}
            {habits.length > 0 && (
              <div className="bg-white px-5 pt-2 pb-5 rounded-b-[24px] shadow-[0_4px_14px_rgba(0,0,0,0.03)] z-10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[17px] font-bold text-gray-900">Progress</span>
                  <span className="text-xs font-semibold text-gray-400">
                    {selectedDayProgress.completed} / {selectedDayProgress.total} completed
                  </span>
                </div>
                <div className="w-full h-[7px] bg-[#EBEBF0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5D38F6] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${selectedDayProgress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Clean Blank Screen with Compact "Start Habit" Button when 0 habits */}
            {habits.length === 0 ? (
              <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 pb-28">
                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5E2CED] hover:bg-[#4F23CC] text-white text-xs font-bold tracking-wide shadow-[0_8px_20px_rgba(94,44,237,0.28)] active:scale-95 transition-all"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Start Habit</span>
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28 space-y-3.5">
                {habits.map((habit) => {
                  const palette = THEME_PALETTES[habit.theme] || THEME_PALETTES.purple;
                  const isDone = habit.logs?.[selectedDate] === 'done';

                  return (
                    <div
                      key={habit.id}
                      onClick={() => openHabitDetail(habit.id)}
                      style={{
                        borderColor: isDone ? palette.activeBorder : palette.border
                      }}
                      className="bg-white rounded-[20px] border-[1.8px] px-4 py-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all cursor-pointer relative group"
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleHabitOnDate(habit.id, selectedDate);
                          }}
                          style={{
                            backgroundColor: isDone ? palette.checkBg : 'transparent',
                            borderColor: isDone ? palette.checkBg : '#7E7A8A'
                          }}
                          className="w-[30px] h-[30px] rounded-full border-[1.8px] flex items-center justify-center transition-all duration-200 active:scale-90 shrink-0"
                          aria-label={`Mark ${habit.name} as ${isDone ? 'incomplete' : 'complete'}`}
                        >
                          {isDone && <CheckIcon className="w-4 h-4 text-white" />}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[16px] font-bold text-gray-900 tracking-tight">
                            {habit.name}
                          </span>
                          <span className="text-[18px] leading-none">{habit.emoji}</span>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuHabitId((prev) =>
                              prev === habit.id ? null : habit.id
                            );
                          }}
                          className="w-9 h-9 rounded-[10px] bg-[#F5F6F9] hover:bg-[#EAECEF] flex items-center justify-center text-gray-500 transition active:scale-95"
                          aria-label="Habit options"
                        >
                          <MoreVerticalIcon className="w-4 h-4" />
                        </button>

                        {openMenuHabitId === habit.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-11 w-44 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.14)] border border-gray-100 py-1.5 z-30"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                openHabitDetail(habit.id);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"
                            >
                              <HistoryIcon className="w-3.5 h-3.5 text-[#5D38F6]" />
                              View History & Calendar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                setHabitFormModal({
                                  mode: 'edit',
                                  habitData: { ...habit }
                                });
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"
                            >
                              <Edit3Icon className="w-3.5 h-3.5 text-amber-500" />
                              Edit Habit
                            </button>
                            <div className="my-1 border-t border-gray-100" />
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                setDeleteConfirmHabit(habit);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                            >
                              <Trash2Icon className="w-3.5 h-3.5 text-red-500" />
                              Delete Habit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* SCREEN 2: STATISTICS VIEW                                           */}
        {/* =================================================================== */}
        {activeTab === 'statistics' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="px-5 pt-3 pb-3 bg-white flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Settings"
              >
                <SettingsIcon className="w-[22px] h-[22px]" />
              </button>
              <h1 className="text-[19px] font-bold tracking-tight text-gray-900">
                Statistics
              </h1>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-28">
              <div className="bg-white px-5 pt-2 pb-5 shadow-[0_4px_14px_rgba(0,0,0,0.02)]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[19px] font-bold text-gray-900">Total Done</span>
                  <span className="text-[19px] font-bold text-gray-900">
                    {statsData.overallPercent}%
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 mb-5">
                  <span className="text-[15px] font-medium text-gray-800">
                    {statsData.rangeLabel}
                  </span>
                  <span className="text-[16px] font-medium text-gray-800">
                    {statsData.totalDoneInWeek} / {statsData.totalTargetInWeek}
                  </span>
                </div>

                {/* Vertical Bar Chart with Dashed Grid Lines */}
                <div className="relative h-48 pt-2 pb-6 px-1">
                  <div className="absolute inset-x-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((lineIdx) => (
                      <div
                        key={lineIdx}
                        className="w-full border-b border-dashed border-gray-200"
                      />
                    ))}
                  </div>

                  <div className="relative z-10 h-full grid grid-cols-7 gap-3 items-end">
                    {statsData.days.map((dayObj) => {
                      const heightPct = Math.round(dayObj.ratio * 100);
                      return (
                        <div
                          key={dayObj.dateStr}
                          onClick={() => {
                            setSelectedDate(dayObj.dateStr);
                            setActiveTab('today');
                          }}
                          className="h-full flex flex-col items-center justify-end group cursor-pointer"
                          title={`${dayObj.label}: ${dayObj.doneCount} completed`}
                        >
                          <div className="w-6 h-full bg-[#F5F6F8] rounded-full flex flex-col justify-end overflow-hidden p-0">
                            <div
                              className="w-full bg-[#2ECC71] rounded-full transition-all duration-500 ease-out"
                              style={{
                                height: `${heightPct}%`,
                                minHeight: dayObj.doneCount > 0 ? '18%' : '0%'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-7 gap-1 mt-2 text-center">
                    {statsData.days.map((dayObj) => (
                      <span
                        key={dayObj.dateStr}
                        className="text-[11px] font-medium text-gray-400"
                      >
                        {dayObj.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 pt-3">
                  <button
                    type="button"
                    onClick={() => setStatsWeekMonday((prev) => addDays(prev, -7))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-700 active:scale-90 transition"
                    aria-label="Previous week"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatsWeekMonday(INITIAL_TODAY_STR)}
                    className="flex items-center gap-1.5 text-[16px] font-bold text-gray-900 hover:opacity-80 transition"
                  >
                    <span>{statsData.rangeLabel}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatsWeekMonday((prev) => addDays(prev, 7))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-700 active:scale-90 transition"
                    aria-label="Next week"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-5 pt-4 space-y-3">
                {statsData.sortedHabits.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-gray-400 mb-3">No habits tracked yet</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('add')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5E2CED] hover:bg-[#4F23CC] text-white text-xs font-bold shadow-md shadow-[#5E2CED]/20 active:scale-95 transition"
                    >
                      <PlusIcon className="w-3.5 h-3.5" />
                      <span>Start Habit</span>
                    </button>
                  </div>
                ) : (
                  statsData.sortedHabits.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => openHabitDetail(h.id)}
                      className="bg-white rounded-[18px] px-4 py-3.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[16px] font-bold text-gray-900">
                            {h.name}
                          </span>
                          <span className="text-[17px]">{h.emoji}</span>
                        </div>
                        <p className="text-[13px] font-medium text-gray-400 mt-0.5">
                          {h.doneInWeek} / {h.target} times
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[16px] font-bold text-gray-900">
                          {h.pct}%
                        </span>
                        <div className="flex items-center justify-end gap-0.5 text-[12px] font-semibold text-[#E74C3C] mt-0.5">
                          <ChevronDownIcon className="w-3.5 h-3.5" />
                          <span>{h.prevWeekTrend || 80}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCREEN 3: ADD HABIT SCREEN                                          */}
        {/* =================================================================== */}
        {activeTab === 'add' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB]">
            <header className="px-5 pt-3 pb-4 bg-white rounded-b-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('today')}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-[18px] font-bold text-gray-900">Add Habit</h1>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-5">
              <button
                type="button"
                onClick={() =>
                  setHabitFormModal({
                    mode: 'create',
                    habitData: {
                      name: '',
                      emoji: '✨',
                      theme: 'purple',
                      targetPerWeek: 7
                    }
                  })
                }
                className="w-full bg-white rounded-[18px] px-4 py-3.5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">✏️</span>
                  <span className="text-[16px] font-medium text-gray-900">
                    Custom Habit
                  </span>
                </div>
                <PlusIcon className="w-5 h-5 text-[#5D38F6]" />
              </button>

              {PRESET_CATEGORIES.map((category) => {
                const isExpanded = expandedCategory === category.id;
                return (
                  <div key={category.id} className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCategory((prev) =>
                          prev === category.id ? null : category.id
                        )
                      }
                      className="w-full flex items-center justify-between py-1 text-left"
                    >
                      <span className="text-[19px] font-bold text-gray-900">
                        {category.title}
                      </span>
                      {isExpanded ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-800" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-white rounded-[22px] divide-y divide-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
                        {category.items.map((preset) => (
                          <button
                            type="button"
                            key={preset.name}
                            onClick={() =>
                              setHabitFormModal({
                                mode: 'create',
                                habitData: { ...preset }
                              })
                            }
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition text-left"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="text-xl w-7 text-center">
                                {preset.emoji}
                              </span>
                              <span className="text-[16px] font-normal text-gray-900">
                                {preset.name}
                              </span>
                            </div>
                            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCREEN 4: HABIT HISTORY & DETAIL VIEW                               */}
        {/* =================================================================== */}
        {detailHabit && (
          <HabitHistoryDetailView
            habit={detailHabit}
            calendarMonth={calendarMonth}
            setCalendarMonth={setCalendarMonth}
            onClose={() => setDetailHabitId(null)}
            onToggleCalendarDay={(dateStr) =>
              cycleHabitCalendarDay(detailHabit.id, dateStr)
            }
            onEdit={() =>
              setHabitFormModal({
                mode: 'edit',
                habitData: { ...detailHabit }
              })
            }
            onDelete={() => setDeleteConfirmHabit(detailHabit)}
          />
        )}

        {/* =================================================================== */}
        {/* BOTTOM NAVIGATION BAR (Habits | + FAB | Statistic)                  */}
        {/* =================================================================== */}
        {!detailHabit && activeTab !== 'add' && (
          <nav className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-8 py-2.5 flex items-center justify-between z-20">
            <button
              type="button"
              onClick={() => setActiveTab('today')}
              className="flex flex-col items-center justify-center gap-1 py-1 px-4 active:scale-95 transition"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke={activeTab === 'today' ? '#5D38F6' : '#635F76'}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7l1.5 1.5L8 6" />
                <path d="M4 12l1.5 1.5L8 11" />
                <path d="M4 17l1.5 1.5L8 16" />
                <line x1="11" y1="7" x2="20" y2="7" />
                <line x1="11" y1="12" x2="20" y2="12" />
                <line x1="11" y1="17" x2="20" y2="17" />
              </svg>
              <span
                className={`text-[11px] font-bold ${
                  activeTab === 'today' ? 'text-[#5D38F6]' : 'text-[#635F76]'
                }`}
              >
                Habits
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className="w-[56px] h-[56px] rounded-full bg-[#5D38F6] hover:bg-[#502CE3] text-white flex items-center justify-center shadow-[0_8px_22px_rgba(93,56,246,0.38)] active:scale-90 transition-transform"
              aria-label="Add Habit"
            >
              <PlusIcon className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('statistics')}
              className="flex flex-col items-center justify-center gap-1 py-1 px-4 active:scale-95 transition"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill={activeTab === 'statistics' ? '#5D38F6' : '#635F76'}
              >
                <rect x="5" y="13" width="3.2" height="7" rx="1.6" />
                <rect x="10.4" y="6" width="3.2" height="14" rx="1.6" />
                <rect x="15.8" y="10" width="3.2" height="10" rx="1.6" />
              </svg>
              <span
                className={`text-[11px] font-bold ${
                  activeTab === 'statistics' ? 'text-[#5D38F6]' : 'text-[#635F76]'
                }`}
              >
                Statistic
              </span>
            </button>
          </nav>
        )}

        {/* =================================================================== */}
        {/* MODAL: CREATE / EDIT HABIT                                          */}
        {/* =================================================================== */}
        {habitFormModal && (
          <HabitFormDialog
            mode={habitFormModal.mode}
            initialData={habitFormModal.habitData}
            onClose={() => setHabitFormModal(null)}
            onSave={handleSaveHabitForm}
          />
        )}

        {/* =================================================================== */}
        {/* MODAL: DELETE CONFIRMATION                                          */}
        {/* =================================================================== */}
        {deleteConfirmHabit && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6 z-50">
            <div className="bg-white w-full rounded-[26px] p-6 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                <Trash2Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete &ldquo;{deleteConfirmHabit.name} {deleteConfirmHabit.emoji}&rdquo;?
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                This will remove the habit and all of its tracked history from Bitry.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmHabit(null)}
                  className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteHabit(deleteConfirmHabit.id)}
                  className="py-2.5 rounded-xl bg-[#E74C3C] hover:bg-red-600 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: BITRY SETTINGS & HOME PAGE NAVIGATION                        */}
        {/* =================================================================== */}
        {settingsModalOpen && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4 z-50">
            <div className="bg-white w-full rounded-[28px] p-6 shadow-2xl max-h-[88vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#5D38F6] text-white flex items-center justify-center font-bold text-lg">
                    🌱
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Bitry Settings</h3>
                    <p className="text-[11px] text-gray-500">
                      Personal Habit & Streak Workspace
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsModalOpen(false);
                    onGoHome();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#5D38F6] hover:bg-[#4D29E3] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#5D38F6]/20 transition"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Home Page</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDemoData}
                  className="w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <RotateCcwIcon className="w-4 h-4 text-[#5D38F6]" />
                  <span>Load Sample Habits (Nov 2026 Demo)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAllHabits}
                  className="w-full py-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-600 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Trash2Icon className="w-4 h-4" />
                  <span>Reset to Blank Screen (Clear Habits)</span>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px] font-semibold text-gray-400">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsModalOpen(false);
                    onOpenLegal('privacy');
                  }}
                  className="hover:text-[#5D38F6]"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSettingsModalOpen(false);
                    onOpenLegal('terms');
                  }}
                  className="hover:text-[#5D38F6]"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENT: HABIT HISTORY & DETAIL VIEW
// ============================================================================

function HabitHistoryDetailView({
  habit,
  calendarMonth,
  setCalendarMonth,
  onClose,
  onToggleCalendarDay,
  onEdit,
  onDelete
}) {
  const { year, month } = calendarMonth;

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const prevMonthDays = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const dt = new Date(year, month - 1, dayNum, 12, 0, 0);
      cells.push({
        dateStr: formatDateStr(dt),
        dayNum,
        inCurrentMonth: false
      });
    }

    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dt = new Date(year, month, d, 12, 0, 0);
      cells.push({
        dateStr: formatDateStr(dt),
        dayNum: d,
        inCurrentMonth: true
      });
    }

    let nextMonthDay = 1;
    while (cells.length < 42) {
      const dt = new Date(year, month + 1, nextMonthDay, 12, 0, 0);
      cells.push({
        dateStr: formatDateStr(dt),
        dayNum: nextMonthDay,
        inCurrentMonth: false
      });
      nextMonthDay++;
    }

    return cells;
  }, [year, month]);

  const stats = useMemo(
    () => computeHabitStats(habit, year, month),
    [habit, year, month]
  );

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (stats.goalMetPercent / 100) * circumference;

  const stepMonth = (delta) => {
    setCalendarMonth((prev) => {
      const dt = new Date(prev.year, prev.month + delta, 1);
      return { year: dt.getFullYear(), month: dt.getMonth() };
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAFBFD] overflow-y-auto pb-8">
      <header className="px-5 pt-3 pb-4 bg-white flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-90 transition"
          aria-label="Close detail view"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <h1 className="text-[18px] font-bold text-gray-900">{habit.name}</h1>
          <span className="text-[19px]">{habit.emoji}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-90 transition"
            title="Edit Habit"
          >
            <Edit3Icon className="w-[19px] h-[19px]" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 active:scale-90 transition"
            title="Delete Habit"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="mx-5 mt-3 bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">
            {SHORT_MONTH_NAMES[month]} {year}
          </h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => stepMonth(-1)}
              className="p-1 text-gray-700 hover:text-black active:scale-90 transition"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => stepMonth(1)}
              className="p-1 text-gray-400 hover:text-black active:scale-90 transition"
              aria-label="Next month"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
            <span key={idx} className="text-[14px] font-medium text-gray-400">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((cell) => {
            const status = habit.logs?.[cell.dateStr];
            const isTodayCell = cell.dateStr === INITIAL_TODAY_STR;

            let borderClass = 'border-[#F1F2F6]';
            if (status === 'done') {
              borderClass = cell.inCurrentMonth
                ? 'border-[#32C759]'
                : 'border-[#A3E4B7]';
            } else if (status === 'missed') {
              borderClass = cell.inCurrentMonth
                ? 'border-[#E74C3C]'
                : 'border-[#F5B7B1]';
            }

            return (
              <button
                type="button"
                key={cell.dateStr}
                onClick={() => onToggleCalendarDay(cell.dateStr)}
                title={`${cell.dateStr}: Click to toggle Done / Missed / Clear`}
                className={`aspect-square rounded-[13px] border-[1.6px] p-[3px] flex items-center justify-center transition-all active:scale-90 ${borderClass}`}
              >
                <div
                  className={`w-full h-full rounded-[9px] flex items-center justify-center text-[15px] font-medium ${
                    isTodayCell
                      ? 'bg-[#D6C4FF] text-[#4A1FB8] font-bold'
                      : cell.inCurrentMonth
                      ? 'text-gray-900'
                      : 'text-gray-300'
                  }`}
                >
                  {cell.dayNum}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-center text-gray-400 mt-3">
          Tap any date to cycle: <span className="text-[#2ECC71] font-semibold">Done</span> →{' '}
          <span className="text-[#E74C3C] font-semibold">Missed</span> → Clear
        </p>
      </div>

      <div className="mx-5 mt-5 grid grid-cols-12 gap-3 items-center">
        <div className="col-span-5 flex items-center justify-center">
          <div className="relative w-[156px] h-[156px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 156 156">
              <circle
                cx="78"
                cy="78"
                r={radius}
                fill="white"
                stroke="#F0F1F6"
                strokeWidth="12"
              />
              <circle
                cx="78"
                cy="78"
                r={radius}
                fill="transparent"
                stroke="#A547F5"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[15px] font-bold text-[#6E6B7B]">Goal Met</span>
              <span className="text-[28px] font-bold text-[#A547F5] leading-tight mt-0.5">
                {stats.goalMetPercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-2.5">
          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#F2EBFF] text-[#6236FF] flex items-center justify-center text-[11px] font-bold">
                •••
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">Current streak</span>
            </div>
            <span className="text-[13px] font-bold text-[#6236FF]">
              {stats.currentStreak} times
            </span>
          </div>

          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#FFF4E5] text-[#F39C12] flex items-center justify-center">
                <FlameIcon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">Best streak</span>
            </div>
            <span className="text-[13px] font-bold text-[#F39C12]">
              {stats.bestStreak} times
            </span>
          </div>

          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#EBF5FB] text-[#2E86DE] flex items-center justify-center">
                <CalendarIcon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">Done in month</span>
            </div>
            <span className="text-[13px] font-bold text-[#2E86DE]">
              {stats.doneInMonth} days
            </span>
          </div>

          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#EAFAF1] text-[#2ECC71] flex items-center justify-center">
                <CheckCircle2Icon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">Total done</span>
            </div>
            <span className="text-[13px] font-bold text-[#2ECC71]">
              {stats.totalDone} days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENT: CREATE / EDIT HABIT MODAL
// ============================================================================

function HabitFormDialog({ mode, initialData, onClose, onSave }) {
  const [name, setName] = useState(initialData?.name || '');
  const [emoji, setEmoji] = useState(initialData?.emoji || '✨');
  const [theme, setTheme] = useState(initialData?.theme || 'purple');
  const [targetPerWeek, setTargetPerWeek] = useState(
    initialData?.targetPerWeek || 7
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: initialData?.id,
      name,
      emoji,
      theme,
      targetPerWeek
    });
  };

  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full rounded-[28px] p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Habit' : 'Configure Habit'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Habit Name
          </label>
          <div className="flex items-center gap-2.5 bg-[#F8F9FB] border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#5D38F6]">
            <span className="text-2xl">{emoji}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Walk, Read, Pray..."
              className="w-full bg-transparent text-sm font-semibold text-gray-900 focus:outline-none"
              autoFocus
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Choose Icon
          </label>
          <div className="grid grid-cols-7 gap-1.5 bg-[#F8F9FB] p-2.5 rounded-2xl max-h-32 overflow-y-auto">
            {EMOJI_OPTIONS.map((em) => (
              <button
                type="button"
                key={em}
                onClick={() => setEmoji(em)}
                className={`h-9 rounded-xl flex items-center justify-center text-lg transition ${
                  emoji === em
                    ? 'bg-[#5D38F6] text-white shadow-sm scale-105'
                    : 'hover:bg-white'
                }`}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Card Border & Check Theme
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.values(THEME_PALETTES).map((pal) => (
              <button
                type="button"
                key={pal.id}
                onClick={() => setTheme(pal.id)}
                style={{
                  borderColor: pal.activeBorder,
                  backgroundColor: theme === pal.id ? pal.lightBg : '#FFFFFF'
                }}
                className={`py-2 px-1 rounded-xl border-2 flex flex-col items-center gap-1 transition ${
                  theme === pal.id ? 'scale-105 shadow-sm' : 'opacity-70'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: pal.checkBg }}
                />
                <span className="text-[10px] font-bold text-gray-700">
                  {pal.name.split(' ')[1] || pal.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Weekly Goal
            </label>
            <span className="text-xs font-bold text-[#5D38F6]">
              {targetPerWeek} {targetPerWeek === 1 ? 'day' : 'days'} / week
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setTargetPerWeek(num)}
                className={`py-2 rounded-xl font-bold text-xs transition ${
                  targetPerWeek === num
                    ? 'bg-[#5D38F6] text-white shadow-sm'
                    : 'bg-[#F8F9FB] text-gray-600 hover:bg-gray-100'
                }`}
              >
                {num}x
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-3 rounded-2xl bg-[#5D38F6] hover:bg-[#4F2BE0] text-white font-bold text-sm shadow-lg shadow-[#5D38F6]/25 transition"
          >
            {mode === 'edit' ? 'Save Changes' : 'Create Habit'}
          </button>
        </div>
      </form>
    </div>
  );
}
