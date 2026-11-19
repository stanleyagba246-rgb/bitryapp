import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Settings,
  Calendar as CalendarIcon,
  Plus,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Trash2,
  Edit3,
  History,
  RotateCcw,
  Award,
  Flame,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

// ============================================================================
// CONSTANTS & THEME PALETTES
// ============================================================================

// Reference "Today" anchor matching the user's screenshots: Monday, Nov 9, 2026
const INITIAL_TODAY_STR = '2026-11-09';

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

// Preset Categories matching Screenshot 4
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

// ============================================================================
// DATE UTILITY FUNCTIONS
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

// Get Monday of the week for any date string
function getMondayOfWeek(dateStr) {
  const dt = parseDateStr(dateStr);
  const day = dt.getDay(); // 0 = Sun, 1 = Mon, ...
  const diff = day === 0 ? -6 : 1 - day;
  dt.setDate(dt.getDate() + diff);
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

// ============================================================================
// INITIAL SEED DATA (Matches Screenshots 1, 2, and 3)
// ============================================================================

function buildInitialHabits() {
  // Build Pray history so that on Nov 9, 2026:
  // - Current streak: 4 times (Nov 6, 7, 8, 9)
  // - Done in month (Nov 2026): 7 days (Nov 2, 3, 4, 6, 7, 8, 9) -> 7/30 = 23% Goal Met
  // - Missed in Nov 2026: Nov 1, Nov 5 (red borders in Screenshot 3)
  // - Best streak: 21 times (Oct 6 through Oct 26 = 21 consecutive days)
  // - Total done: 29 days (21 in Oct streak + Oct 28 + 7 in Nov = 29 days)
  const prayLogs = {
    '2026-10-06': 'done',
    '2026-10-07': 'done',
    '2026-10-08': 'done',
    '2026-10-09': 'done',
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
    '2026-10-26': 'done', // 21-day best streak
    '2026-10-27': 'done', // 22nd day in Oct (Wait: let's keep Oct 6..26 = 21 streak, skip Oct 27, mark Oct 29 done -> 22 days in Oct + 7 in Nov = 29 total!)
  };
  delete prayLogs['2026-10-27'];
  prayLogs['2026-10-27'] = 'done'; // Wait: if Oct 6-26 is 21, and Oct 27 is done, streak would be 22. So let's mark Oct 4 done instead!
  delete prayLogs['2026-10-27'];
  prayLogs['2026-10-04'] = 'done';
  prayLogs['2026-10-27'] = 'done'; // Let's keep Oct 6-26 as 21 days, and Oct 2, 3 as 2 days -> 2 + 21 = 23? Wait: 22 in Oct + 7 in Nov = 29 total!
  delete prayLogs['2026-10-27'];
  // Let's also mark Oct 26, 27, 28, 29, 30 as done (green border in top row of Nov calendar) and Oct 31 as missed (red border in top row of Nov calendar)
  // To make sure Best Streak is 21 and Total Done is 29:
  // Suppose Oct 10 to Oct 30 is 21 consecutive days! (30 - 10 + 1 = 21 days!)
  // Plus Oct 8 is 1 day -> 22 days in October!
  // And Oct 31 is 'missed' (red border), Nov 1 is 'missed' (red border)!
  // Let's verify:
  // Oct 10..30 = 21 days streak!
  // Oct 26, 27, 28, 29, 30 are all in Oct 10..30, so they naturally have green borders in the first row of the Nov 2026 calendar!
  // Oct 31 has a red border!
  // Nov 1 has a red border!
  // Nov 2, 3, 4 have green borders!
  // Nov 5 has a red border!
  // Nov 6, 7, 8, 9 have green borders!
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

// ============================================================================
// STREAK & ANALYTICS CALCULATOR
// ============================================================================

function computeHabitStats(habit, year, monthZeroIndexed) {
  const logs = habit.logs || {};
  const doneDates = Object.keys(logs)
    .filter((d) => logs[d] === 'done')
    .sort();

  const totalDone = doneDates.length;

  // Done in selected month
  const monthPrefix = `${year}-${String(monthZeroIndexed + 1).padStart(2, '0')}-`;
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  const doneInMonth = doneDates.filter((d) => d.startsWith(monthPrefix)).length;

  // Goal met % for the month (based on days in month or monthly target)
  const monthlyGoalDays = Math.round((habit.targetPerWeek / 7) * daysInMonth) || daysInMonth;
  const goalMetPercent = Math.min(100, Math.round((doneInMonth / monthlyGoalDays) * 100));

  // Best streak calculation across all doneDates
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

  // Current streak (counting backward from INITIAL_TODAY_STR or latest done day if today/yesterday)
  let currentStreak = 0;
  let cursor = logs[INITIAL_TODAY_STR] === 'done'
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
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Start with a completely blank habit state by default
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('bitree_habits_blank_v1');
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
      localStorage.setItem('bitree_habits_blank_v1', JSON.stringify(habits));
    } catch (e) {
      console.error('Failed to save habits to localStorage:', e);
    }
  }, [habits]);

  // Navigation & UI state
  // Tabs: 'today' | 'statistics' | 'add'
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState(INITIAL_TODAY_STR);

  // Horizontal strip offset (centered around the 7-day window starting Friday Nov 6, 2026 to Thursday Nov 12, 2026 as shown in Screenshot 1)
  const [stripStartDate, setStripStartDate] = useState('2026-11-06');

  // Detail modal state (Screenshot 3)
  const [detailHabitId, setDetailHabitId] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState({ year: 2026, month: 10 }); // 10 = November (0-indexed)

  // Statistics week start (Monday Nov 9, 2026 as shown in Screenshot 2: 9 Nov - 15 Nov)
  const [statsWeekMonday, setStatsWeekMonday] = useState('2026-11-09');

  // Action menu state for a habit card's `⋮` button
  const [openMenuHabitId, setOpenMenuHabitId] = useState(null);

  // Add / Edit Habit modal & accordion state
  const [expandedCategory, setExpandedCategory] = useState('sport');
  const [habitFormModal, setHabitFormModal] = useState(null); // { mode: 'create' | 'edit', habitData }
  const [deleteConfirmHabit, setDeleteConfirmHabit] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // Close 3-dots menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuHabitId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // ============================================================================
  // HABIT ACTIONS
  // ============================================================================

  // Toggle completion on Today screen
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

  // Cycle status on Detail Calendar (done -> missed -> clear -> done)
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
    showToast('Loaded sample Bitree habits & history');
  };

  // ============================================================================
  // DERIVED DATA FOR TODAY VIEW
  // ============================================================================

  const stripDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const dStr = addDays(stripStartDate, i);
      const dt = parseDateStr(dStr);
      const dayLabel = SHORT_DAY_NAMES[dt.getDay()];
      const dayNum = dt.getDate();

      // Calculate how many habits were completed on dStr
      const doneCount = habits.filter((h) => h.logs?.[dStr] === 'done').length;
      const totalCount = habits.length;

      return {
        dateStr: dStr,
        dayLabel,
        dayNum,
        doneCount,
        totalCount
      };
    });
  }, [stripStartDate, habits]);

  const selectedDayProgress = useMemo(() => {
    const total = habits.length;
    const completed = habits.filter((h) => h.logs?.[selectedDate] === 'done').length;
    // Notice in Screenshot 1: 4 habits are visible in the viewport (Work, Plan, Pray, Journal) with 2 checked = 50% bar width.
    // Let's compute exact percentage so when 2 are checked it fills smoothly.
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }, [habits, selectedDate]);

  // ============================================================================
  // DERIVED DATA FOR STATISTICS VIEW (Screenshot 2)
  // ============================================================================

  const statsData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const dStr = addDays(statsWeekMonday, i);
      const dt = parseDateStr(dStr);
      const label = `${dt.getDate()} ${SHORT_MONTH_NAMES[dt.getMonth()]}`;
      const doneCount = habits.filter((h) => h.logs?.[dStr] === 'done').length;
      const ratio = habits.length > 0 ? doneCount / habits.length : 0;
      return {
        dateStr: dStr,
        label,
        doneCount,
        ratio
      };
    });

    const totalTargetInWeek = habits.reduce((acc, h) => acc + (h.targetPerWeek || 7), 0);
    let totalDoneInWeek = 0;

    const perHabitStats = habits.map((h) => {
      const doneInWeek = days.filter((d) => h.logs?.[d.dateStr] === 'done').length;
      totalDoneInWeek += doneInWeek;
      const target = h.targetPerWeek || 7;
      const pct = target > 0 ? Math.round((doneInWeek / target) * 100) : 0;
      return {
        ...h,
        doneInWeek,
        target,
        pct
      };
    });

    // Sort per-habit breakdown so completed habits appear at the top (matching Screenshot 2: Pray 14%, Journal 14%, Exercise 0%, Work 0%, Plan 0%)
    const sortedHabits = [...perHabitStats].sort((a, b) => b.pct - a.pct);

    const overallPercent =
      totalTargetInWeek > 0 ? Math.round((totalDoneInWeek / totalTargetInWeek) * 100) : 0;

    // Format range label (e.g., "Today - 15 November" when week starts on INITIAL_TODAY_STR)
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

  // Active habit for History & Detail Modal (Screenshot 3)
  const detailHabit = useMemo(
    () => habits.find((h) => h.id === detailHabitId) || null,
    [habits, detailHabitId]
  );

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const openHabitDetail = (habitId) => {
    setDetailHabitId(habitId);
    const dt = parseDateStr(selectedDate);
    setCalendarMonth({ year: dt.getFullYear(), month: dt.getMonth() });
  };

  return (
    <div className="min-h-screen bg-[#ECEEF4] flex flex-col items-center justify-start sm:justify-center sm:py-6 font-sans text-[#1C1C28] select-none">
      {/* Mobile Phone Frame Container */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[900px] bg-[#FAFBFD] sm:rounded-[42px] sm:shadow-[0_24px_70px_rgba(20,20,45,0.16)] sm:border-[6px] sm:border-white flex flex-col relative overflow-hidden">
        
        {/* Subtle Bitree Brand Pill + Simulated Status Bar on Desktop Frame */}
        <div className="px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-gray-800 bg-white">
          <div className="flex items-center gap-1.5">
            <span>17:55</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#6236FF]/10 text-[#6236FF] tracking-tight">
              🌱 Bitree
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[3px] h-1.5 bg-gray-900 rounded-full"></span>
              <span className="w-[3px] h-2 bg-gray-900 rounded-full"></span>
              <span className="w-[3px] h-2.5 bg-gray-900 rounded-full"></span>
              <span className="w-[3px] h-3 bg-gray-900 rounded-full"></span>
            </div>
            <span className="text-[11px] font-bold tracking-tight">LTE</span>
            <div className="w-6 h-3 rounded-[4px] border border-gray-400 p-[1.5px] flex items-center">
              <div className="w-3.5 h-full bg-gray-800 rounded-[2px]"></div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SCREEN 1: TODAY / HABITS VIEW                                       */}
        {/* =================================================================== */}
        {activeTab === 'today' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="px-5 pt-3 pb-4 bg-white flex items-center justify-between">
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Bitree Settings"
              >
                <Settings className="w-[22px] h-[22px] stroke-[2.2]" />
              </button>

              <div className="flex flex-col items-center">
                <h1 className="text-[19px] font-bold tracking-tight text-gray-900">
                  {selectedDate === INITIAL_TODAY_STR
                    ? 'Today'
                    : `${ parseDateStr(selectedDate).getDate() } ${ SHORT_MONTH_NAMES[parseDateStr(selectedDate).getMonth()] }`}
                </h1>
              </div>

              <button
                onClick={() => {
                  setSelectedDate(INITIAL_TODAY_STR);
                  setStripStartDate('2026-11-06');
                  showToast('Jumped to Today (Mon, 9 Nov)');
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Jump to Today"
              >
                <CalendarIcon className="w-[21px] h-[21px] stroke-[2.2]" />
              </button>
            </header>

            {/* Horizontal 7-Day Week Strip */}
            <div className="bg-white px-2 pb-3 relative">
              <div className="flex items-center justify-between gap-1.5">
                <button
                  onClick={() => setStripStartDate((prev) => addDays(prev, -7))}
                  className="p-1 text-gray-400 hover:text-gray-700 active:scale-90 transition"
                  title="Previous Week"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex-1 grid grid-cols-7 gap-1.5">
                  {stripDays.map((item) => {
                    const isSelected = item.dateStr === selectedDate;
                    const isPastOrToday = item.dateStr <= INITIAL_TODAY_STR;

                    // Determine border style matching Screenshot 1 when habits exist
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
                        {/* Active indicator dot underneath selected day */}
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
                  onClick={() => setStripStartDate((prev) => addDays(prev, 7))}
                  className="p-1 text-gray-400 hover:text-gray-700 active:scale-90 transition"
                  title="Next Week"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Card - Only shown once the user has added at least 1 habit */}
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

            {/* Main Content Area: Clean Blank Screen with little "Start Habit" button when 0 habits */}
            {habits.length === 0 ? (
              <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 pb-28">
                <button
                  onClick={() => setActiveTab('add')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5E2CED] hover:bg-[#4F23CC] text-white text-xs font-bold tracking-wide shadow-[0_8px_20px_rgba(94,44,237,0.28)] active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.8]" />
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
                        {/* Circular Checkbox */}
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
                          {isDone && <Check className="w-4 h-4 text-white stroke-[3]" />}
                        </button>

                        {/* Habit Title + Emoji */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[16px] font-bold text-gray-900 tracking-tight">
                            {habit.name}
                          </span>
                          <span className="text-[18px] leading-none">{habit.emoji}</span>
                        </div>
                      </div>

                      {/* Right 3-Dots Button */}
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
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Action Popover Menu */}
                        {openMenuHabitId === habit.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-11 w-44 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.14)] border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
                          >
                            <button
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                openHabitDetail(habit.id);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"
                            >
                              <History className="w-3.5 h-3.5 text-[#5D38F6]" />
                              View History & Calendar
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                setHabitFormModal({
                                  mode: 'edit',
                                  habitData: { ...habit }
                                });
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                              Edit Habit
                            </button>
                            <div className="my-1 border-t border-gray-100" />
                            <button
                              onClick={() => {
                                setOpenMenuHabitId(null);
                                setDeleteConfirmHabit(habit);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
        {/* SCREEN 2: STATISTICS VIEW (Matches Screenshot 2)                    */}
        {/* =================================================================== */}
        {activeTab === 'statistics' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="px-5 pt-3 pb-3 bg-white flex items-center justify-between">
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
                title="Settings"
              >
                <Settings className="w-[22px] h-[22px] stroke-[2.2]" />
              </button>
              <h1 className="text-[19px] font-bold tracking-tight text-gray-900">
                Statistics
              </h1>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto pb-28">
              {/* Top Chart Card */}
              <div className="bg-white px-5 pt-2 pb-5 shadow-[0_4px_14px_rgba(0,0,0,0.02)]">
                {/* Total Done Header Row */}
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
                  {/* 5 Horizontal Dashed Grid Lines */}
                  <div className="absolute inset-x-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((lineIdx) => (
                      <div
                        key={lineIdx}
                        className="w-full border-b border-dashed border-gray-200"
                      />
                    ))}
                  </div>

                  {/* 7 Rounded Bar Pillars */}
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
                          {/* Full height gray track */}
                          <div className="w-6 h-full bg-[#F5F6F8] rounded-full flex flex-col justify-end overflow-hidden p-0">
                            {/* Animated Emerald Green Fill */}
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

                  {/* X-Axis Labels */}
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

                {/* Week Switcher Row */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <button
                    onClick={() => setStatsWeekMonday((prev) => addDays(prev, -7))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-700 active:scale-90 transition"
                    aria-label="Previous week"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setStatsWeekMonday(INITIAL_TODAY_STR)}
                    className="flex items-center gap-1.5 text-[16px] font-bold text-gray-900 hover:opacity-80 transition"
                  >
                    <span>{statsData.rangeLabel}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  <button
                    onClick={() => setStatsWeekMonday((prev) => addDays(prev, 7))}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-700 active:scale-90 transition"
                    aria-label="Next week"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Per-Habit Breakdown List */}
              <div className="px-5 pt-4 space-y-3">
                {statsData.sortedHabits.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-gray-400 mb-3">
                      No habits tracked yet
                    </p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5E2CED] hover:bg-[#4F23CC] text-white text-xs font-bold shadow-md shadow-[#5E2CED]/20 active:scale-95 transition"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
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
                          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
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
        {/* SCREEN 3: ADD HABIT SCREEN (Matches Screenshot 4)                   */}
        {/* =================================================================== */}
        {activeTab === 'add' && !detailHabit && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FB]">
            {/* Top Bar */}
            <header className="px-5 pt-3 pb-4 bg-white rounded-b-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between">
              <button
                onClick={() => setActiveTab('today')}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-95 transition"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h1 className="text-[18px] font-bold text-gray-900">Add Habit</h1>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28 space-y-5">
              {/* Custom Habit Pill Button */}
              <button
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
                <Plus className="w-5 h-5 text-[#5D38F6] stroke-[2.2]" />
              </button>

              {/* Preset Categories Accordion */}
              {PRESET_CATEGORIES.map((category) => {
                const isExpanded = expandedCategory === category.id;
                return (
                  <div key={category.id} className="space-y-3">
                    <button
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
                        <ChevronUp className="w-5 h-5 text-gray-800" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-800" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-white rounded-[22px] divide-y divide-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
                        {category.items.map((preset) => (
                          <button
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
                            <ChevronRight className="w-4 h-4 text-gray-400" />
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
        {/* SCREEN 4: HABIT HISTORY & DETAIL VIEW (Matches Screenshot 3)        */}
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
            {/* Left Tab: Habits */}
            <button
              onClick={() => setActiveTab('today')}
              className="flex flex-col items-center justify-center gap-1 py-1 px-4 active:scale-95 transition"
            >
              {/* Custom Checklist Icon matching Screenshot 1 */}
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

            {/* Center Purple Floating Action Button (+) */}
            <button
              onClick={() => setActiveTab('add')}
              className="w-[56px] h-[56px] rounded-full bg-[#5D38F6] hover:bg-[#502CE3] text-white flex items-center justify-center shadow-[0_8px_22px_rgba(93,56,246,0.38)] active:scale-90 transition-transform"
              aria-label="Add Habit"
            >
              <Plus className="w-7 h-7 stroke-[2.8]" />
            </button>

            {/* Right Tab: Statistic */}
            <button
              onClick={() => setActiveTab('statistics')}
              className="flex flex-col items-center justify-center gap-1 py-1 px-4 active:scale-95 transition"
            >
              {/* Custom Bar Chart Icon matching Screenshot 1 & 2 */}
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 animate-in fade-in duration-150">
            <div className="bg-white w-full rounded-[26px] p-6 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete "{deleteConfirmHabit.name} {deleteConfirmHabit.emoji}"?
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                This will remove the habit and all of its tracked history from Bitree.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setDeleteConfirmHabit(null)}
                  className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
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
        {/* MODAL: BITREE SETTINGS & DEMO RESET                                 */}
        {/* =================================================================== */}
        {settingsModalOpen && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white w-full rounded-[28px] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#5D38F6] text-white flex items-center justify-center font-bold text-lg">
                    🌱
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Bitree</h3>
                    <p className="text-[11px] text-gray-400">
                      Personal Habit & Streak Tracker
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSettingsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F8F9FB] rounded-2xl p-4 space-y-2 text-xs text-gray-600 mb-5">
                <p className="font-semibold text-gray-800">Quick Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Tap <strong>Start Habit</strong> or the purple <strong>+</strong> button to create habits.</li>
                  <li>Tap the circle on the left of a habit card to check it off.</li>
                  <li>Tap a habit card to view its monthly calendar & streak stats.</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={handleClearAllHabits}
                  className="w-full py-3 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-600 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset to Blank Screen (Clear All Habits)
                </button>
                <button
                  onClick={handleResetDemoData}
                  className="w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4 text-[#5D38F6]" />
                  Load Sample Habits (Nov 2026 Demo)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Feedback Banner */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENT: HABIT HISTORY & DETAIL VIEW (Matches Screenshot 3)
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

  // Build 42-cell (6 rows x 7 cols, Mon-Sun) calendar grid for the selected month
  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    // Convert JS Sunday=0..Saturday=6 into Monday=0..Sunday=6
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const prevMonthDays = new Date(year, month, 0).getDate();
    const cells = [];

    // Leading days from previous month
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const dt = new Date(year, month - 1, dayNum, 12, 0, 0);
      cells.push({
        dateStr: formatDateStr(dt),
        dayNum,
        inCurrentMonth: false
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dt = new Date(year, month, d, 12, 0, 0);
      cells.push({
        dateStr: formatDateStr(dt),
        dayNum: d,
        inCurrentMonth: true
      });
    }

    // Trailing days from next month to fill 6 rows (42 cells)
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

  // SVG Ring Gauge parameters
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
    <div className="flex-1 flex flex-col bg-[#FAFBFD] overflow-y-auto pb-8 animate-in fade-in duration-150">
      {/* Top Bar matching Screenshot 3 */}
      <header className="px-5 pt-3 pb-4 bg-white flex items-center justify-between">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-90 transition"
          aria-label="Close detail view"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="flex items-center gap-1.5">
          <h1 className="text-[18px] font-bold text-gray-900">{habit.name}</h1>
          <span className="text-[19px]">{habit.emoji}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-90 transition"
            title="Edit Habit"
          >
            <Edit3 className="w-[19px] h-[19px] stroke-[2.1]" />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 active:scale-90 transition"
            title="Delete Habit"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Calendar Card */}
      <div className="mx-5 mt-3 bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Month Title & Arrows */}
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">
            {SHORT_MONTH_NAMES[month]} {year}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => stepMonth(-1)}
              className="p-1 text-gray-700 hover:text-black active:scale-90 transition"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              onClick={() => stepMonth(1)}
              className="p-1 text-gray-400 hover:text-black active:scale-90 transition"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Weekday Headers: M T W T F S S */}
        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
            <span
              key={idx}
              className="text-[14px] font-medium text-gray-400"
            >
              {d}
            </span>
          ))}
        </div>

        {/* 6x7 Day Cells Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((cell) => {
            const status = habit.logs?.[cell.dateStr]; // 'done' | 'missed' | undefined
            const isTodayCell = cell.dateStr === INITIAL_TODAY_STR;

            // Border styling matching Screenshot 3:
            // - Done: Green outline (#2ECC71)
            // - Missed: Coral Red outline (#E74C3C)
            // - Unmarked: Light gray outline (#F0F1F5)
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

      {/* Bottom Analytics Summary: Circular Ring Gauge + 4 Stat Pills */}
      <div className="mx-5 mt-5 grid grid-cols-12 gap-3 items-center">
        {/* Left: Goal Met Circular Ring Gauge */}
        <div className="col-span-5 flex items-center justify-center">
          <div className="relative w-[156px] h-[156px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 156 156">
              {/* Track Ring */}
              <circle
                cx="78"
                cy="78"
                r={radius}
                fill="white"
                stroke="#F0F1F6"
                strokeWidth="12"
              />
              {/* Progress Arc */}
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

        {/* Right: 4 Stacked Stat Pill Cards */}
        <div className="col-span-7 space-y-2.5">
          {/* Current streak */}
          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#F2EBFF] text-[#6236FF] flex items-center justify-center text-[11px] font-bold">
                •••
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">
                Current streak
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#6236FF]">
              {stats.currentStreak} times
            </span>
          </div>

          {/* Best streak */}
          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#FFF4E5] text-[#F39C12] flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">
                Best streak
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#F39C12]">
              {stats.bestStreak} times
            </span>
          </div>

          {/* Done in month */}
          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#EBF5FB] text-[#2E86DE] flex items-center justify-center">
                <CalendarIcon className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">
                Done in month
              </span>
            </div>
            <span className="text-[13px] font-bold text-[#2E86DE]">
              {stats.doneInMonth} days
            </span>
          </div>

          {/* Total done */}
          <div className="bg-white rounded-[14px] px-3.5 py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#EAFAF1] text-[#2ECC71] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13px] font-bold text-[#6E6B7B]">
                Total done
              </span>
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
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4 z-50 animate-in fade-in duration-150">
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
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Habit Name Input */}
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

        {/* Emoji Picker Grid */}
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

        {/* Card Accent Color Theme */}
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

        {/* Weekly Frequency Target (1 - 7 days) */}
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

        {/* Submit & Cancel Buttons */}
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