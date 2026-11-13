import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Plus, Trash2, Check, RotateCcw, Play, CheckCircle2 } from 'lucide-react';
import { ProjectData } from '../data/portfolioData';
import {
  TaskItem,
  addTaskItem,
  filterTasksByDate,
  toggleTaskItem,
  deleteTaskItem,
  getMonthMatrix,
  evaluateExpression,
} from '../utils/portfolioLogic';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ==========================================
  // 1. DAILY TASK TRACKER & CALENDAR STATE
  // ==========================================
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('jk_daily_task_tracker');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial seed tasks
    return [
      {
        id: 'seed_1',
        date: todayStr,
        title: 'Review Python & Web Architecture',
        time: '09:00',
        hour: 9,
        completed: true,
        priority: 'high',
      },
      {
        id: 'seed_2',
        date: todayStr,
        title: 'Daily Task Tracker App Sprint',
        time: '11:00',
        hour: 11,
        completed: false,
        priority: 'high',
      },
      {
        id: 'seed_3',
        date: todayStr,
        title: 'Ideathon Project Documentation',
        time: '16:00',
        hour: 16,
        completed: false,
        priority: 'medium',
      },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskHour, setNewTaskHour] = useState(10);
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // Persist tasks
  useEffect(() => {
    try {
      localStorage.setItem('jk_daily_task_tracker', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  // Calendar navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const timeFormatted = `${String(newTaskHour).padStart(2, '0')}:00`;
    const updated = addTaskItem(tasks, {
      date: selectedDate,
      title: newTaskTitle,
      time: timeFormatted,
      hour: newTaskHour,
      priority: newTaskPriority,
    });
    setTasks(updated);
    setNewTaskTitle('');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) => toggleTaskItem(prev, id));
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => deleteTaskItem(prev, id));
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const calendarDays = getMonthMatrix(currentYear, currentMonth);
  const filteredTasksForDate = filterTasksByDate(tasks, selectedDate);
  const currentSystemHour = new Date().getHours();

  // ==========================================
  // 2. WEB-BASED CALCULATOR STATE
  // ==========================================
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcExpression, setCalcExpression] = useState('');
  const [calcHistory, setCalcHistory] = useState<string[]>(['100 + 25 = 125', '64 * 8 = 512']);
  const [calcError, setCalcError] = useState<string | null>(null);

  const handleCalcClick = (val: string) => {
    setCalcError(null);
    if (val === 'AC') {
      setCalcDisplay('0');
      setCalcExpression('');
    } else if (val === 'C') {
      if (calcExpression.length <= 1) {
        setCalcExpression('');
        setCalcDisplay('0');
      } else {
        const sliced = calcExpression.slice(0, -1);
        setCalcExpression(sliced);
        setCalcDisplay(sliced);
      }
    } else if (val === '=') {
      if (!calcExpression) return;
      const { result, error } = evaluateExpression(calcExpression);
      if (error) {
        setCalcError(error);
        setCalcDisplay(error);
      } else if (result !== null) {
        const item = `${calcExpression} = ${result}`;
        setCalcHistory((prev) => [item, ...prev.slice(0, 4)]);
        setCalcDisplay(String(result));
        setCalcExpression(String(result));
      }
    } else {
      // Append number or operator
      const isOperator = ['+', '-', '*', '/'].includes(val);
      const lastChar = calcExpression.slice(-1);
      if (isOperator && ['+', '-', '*', '/'].includes(lastChar)) {
        // replace last operator
        const updated = calcExpression.slice(0, -1) + val;
        setCalcExpression(updated);
        setCalcDisplay(updated);
        return;
      }
      const next = (calcExpression === '0' && val !== '.' ? '' : calcExpression) + val;
      setCalcExpression(next);
      setCalcDisplay(next);
    }
  };

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-box max-w-4xl!" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[var(--accent-color)] tracking-wider">
                {project.number}
              </span>
              <span className="text-[10px] font-mono uppercase bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded">
                {project.badgeCategory}
              </span>
            </div>
            <h3 id="modal-project-title" className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition cursor-pointer text-neutral-600 dark:text-neutral-400"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Project Summary */}
          <div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-body">
              "{project.description}"
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="inline-block px-2.5 py-1 text-xs font-mono uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ==================================================== */}
          {/* SIMULATOR 01: DAILY TASK TRACKER & CALENDAR */}
          {/* ==================================================== */}
          {project.type === 'tasktracker' && (
            <div className="border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex flex-wrap justify-between items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                  <CalendarIcon className="w-4 h-4 text-[var(--accent-color)]" />
                  Live Prototype: Daily Task Tracker &amp; Calendar
                </span>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  ● Local Storage Connected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
                
                {/* Left Sub-Column: Interactive Calendar (5 cols) */}
                <div className="md:col-span-5 p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-[var(--border-color)]">
                    <span className="font-heading font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="px-2 py-1 text-xs font-mono border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] rounded transition cursor-pointer"
                        title="Previous Month"
                      >
                        ⟨
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentMonth(today.getMonth());
                          setCurrentYear(today.getFullYear());
                          setSelectedDate(todayStr);
                        }}
                        className="px-2 py-1 text-[10px] font-mono border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] rounded transition cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="px-2 py-1 text-xs font-mono border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] rounded transition cursor-pointer"
                        title="Next Month"
                      >
                        ⟩
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 text-center font-mono text-[10px] text-neutral-400 font-semibold">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>

                  {/* Calendar Matrix */}
                  <div className="grid grid-cols-7 gap-1 text-center font-body text-xs">
                    {calendarDays.map((item, idx) => {
                      const isSelected = item.dateStr === selectedDate;
                      const isCurrentDay = item.dateStr === todayStr;
                      const hasTasks = tasks.some((t) => t.date === item.dateStr);

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`h-8 rounded relative flex items-center justify-center transition cursor-pointer ${
                            isSelected
                              ? 'bg-[var(--accent-color)] text-[#131314] font-bold shadow'
                              : item.isCurrentMonth
                              ? 'hover:bg-[var(--bg-secondary)] text-neutral-800 dark:text-neutral-200'
                              : 'text-neutral-400 dark:text-neutral-600'
                          } ${isCurrentDay && !isSelected ? 'border border-[var(--accent-color)]' : ''}`}
                        >
                          <span>{item.day}</span>
                          {hasTasks && !isSelected && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Date Summary Box */}
                  <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs space-y-1 font-mono">
                    <div className="flex justify-between items-center text-neutral-500 text-[11px]">
                      <span>SELECTED DATE:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{selectedDate}</span>
                    </div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                      {filteredTasksForDate.length} Task(s) Scheduled
                    </div>
                  </div>
                </div>

                {/* Right Sub-Column: Hourly Schedule & Task Manager (7 cols) */}
                <div className="md:col-span-7 p-4 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-heading font-semibold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        Hourly Schedule (06:00 – 22:00)
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        Current Hour: {String(currentSystemHour).padStart(2, '0')}:00
                      </span>
                    </div>

                    {/* Task List / Timeline View */}
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {filteredTasksForDate.length === 0 ? (
                        <div className="py-8 text-center text-neutral-400 font-mono text-xs border border-dashed border-[var(--border-color)] rounded">
                          No tasks scheduled for {selectedDate}.
                          <br />
                          Add your first task below!
                        </div>
                      ) : (
                        filteredTasksForDate.map((task) => {
                          const isHourNow = task.hour === currentSystemHour;

                          return (
                            <div
                              key={task.id}
                              className={`p-2.5 rounded border transition flex items-center justify-between gap-3 ${
                                task.completed
                                  ? 'bg-neutral-100 dark:bg-neutral-900/60 border-[var(--border-color)] opacity-60'
                                  : isHourNow
                                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-700'
                                  : 'bg-[var(--bg-secondary)] border-[var(--border-color)]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => handleToggleTask(task.id)}
                                  className={`w-5 h-5 rounded flex items-center justify-center border transition cursor-pointer shrink-0 ${
                                    task.completed
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'border-neutral-400 hover:border-neutral-700'
                                  }`}
                                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                                >
                                  {task.completed && <Check className="w-3.5 h-3.5" />}
                                </button>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                                      {task.time}
                                    </span>
                                    {isHourNow && (
                                      <span className="font-mono text-[9px] px-1 py-0.2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-bold">
                                        CURRENT
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className={`text-xs font-body font-medium truncate ${
                                      task.completed
                                        ? 'line-through text-neutral-400 dark:text-neutral-500'
                                        : 'text-neutral-900 dark:text-neutral-100'
                                    }`}
                                  >
                                    {task.title}
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-neutral-400 hover:text-red-500 p-1 transition cursor-pointer"
                                title="Delete Task"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Add New Task Form */}
                  <form onSubmit={handleAddTask} className="pt-3 border-t border-[var(--border-color)] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase font-semibold">
                        + Add Task for {selectedDate}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task title (e.g. Code Review)..."
                        className="col-span-7 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs outline-none focus:border-[var(--accent-color)] text-neutral-900 dark:text-neutral-100"
                      />
                      <select
                        value={newTaskHour}
                        onChange={(e) => setNewTaskHour(Number(e.target.value))}
                        className="col-span-3 px-2 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs outline-none text-neutral-900 dark:text-neutral-100 font-mono"
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 6).map((h) => (
                          <option key={h} value={h}>
                            {String(h).padStart(2, '0')}:00 {h >= 12 ? 'PM' : 'AM'}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="col-span-2 btn-primary py-1.5 px-2 text-xs font-mono cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* SIMULATOR 02: WEB-BASED CALCULATOR */}
          {/* ==================================================== */}
          {project.type === 'calculator' && (
            <div className="border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex justify-between items-center">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                  <Play className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  Live Prototype: Web-Based Calculator
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  Pure JavaScript • Error Trapping
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Calculator Hardware Interface (7 cols) */}
                <div className="md:col-span-7 max-w-xs mx-auto w-full bg-neutral-950 p-4 rounded-xl border border-neutral-800 shadow-xl">
                  {/* LCD Display */}
                  <div className="bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 text-right mb-4">
                    <div className="font-mono text-[11px] text-neutral-400 h-4 truncate">
                      {calcExpression || ' '}
                    </div>
                    <div
                      className={`font-mono text-2xl font-bold tracking-tight truncate ${
                        calcError ? 'text-red-400 text-lg' : 'text-white'
                      }`}
                    >
                      {calcDisplay}
                    </div>
                  </div>

                  {/* Keypad Grid */}
                  <div className="grid grid-cols-4 gap-2 font-mono text-sm">
                    {/* Row 1 */}
                    <button
                      type="button"
                      onClick={() => handleCalcClick('AC')}
                      className="p-3 bg-red-950/40 text-red-400 hover:bg-red-900/60 font-bold rounded cursor-pointer transition border border-red-900/30"
                    >
                      AC
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('C')}
                      className="p-3 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded cursor-pointer transition"
                    >
                      C
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('(')}
                      className="p-3 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded cursor-pointer transition"
                    >
                      (
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('/')}
                      className="p-3 bg-neutral-800 text-[var(--accent-color)] hover:bg-neutral-700 font-bold rounded cursor-pointer transition"
                    >
                      ÷
                    </button>

                    {/* Row 2 */}
                    <button
                      type="button"
                      onClick={() => handleCalcClick('7')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      7
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('8')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      8
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('9')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      9
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('*')}
                      className="p-3 bg-neutral-800 text-[var(--accent-color)] hover:bg-neutral-700 font-bold rounded cursor-pointer transition"
                    >
                      ×
                    </button>

                    {/* Row 3 */}
                    <button
                      type="button"
                      onClick={() => handleCalcClick('4')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('5')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      5
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('6')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      6
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('-')}
                      className="p-3 bg-neutral-800 text-[var(--accent-color)] hover:bg-neutral-700 font-bold rounded cursor-pointer transition"
                    >
                      −
                    </button>

                    {/* Row 4 */}
                    <button
                      type="button"
                      onClick={() => handleCalcClick('1')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('2')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('3')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('+')}
                      className="p-3 bg-neutral-800 text-[var(--accent-color)] hover:bg-neutral-700 font-bold rounded cursor-pointer transition"
                    >
                      +
                    </button>

                    {/* Row 5 */}
                    <button
                      type="button"
                      onClick={() => handleCalcClick('0')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded col-span-2 cursor-pointer transition"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('.')}
                      className="p-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded cursor-pointer transition"
                    >
                      .
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalcClick('=')}
                      className="p-3 bg-[var(--accent-color)] text-[#131314] font-bold hover:opacity-90 rounded cursor-pointer transition"
                    >
                      =
                    </button>
                  </div>
                </div>

                {/* Right Side: Operation History & Verification (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block mb-2">
                      Recent Calculation Log
                    </span>
                    <div className="space-y-1.5 font-mono text-xs text-neutral-600 dark:text-neutral-300">
                      {calcHistory.map((item, idx) => (
                        <div key={idx} className="p-1.5 bg-[var(--bg-primary)] rounded border border-[var(--border-color)]">
                          &gt; {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs space-y-1 font-mono text-neutral-500">
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300">Features Validated:</p>
                    <p>✓ Addition, subtraction, multiplication, division</p>
                    <p>✓ Decimal floating-point accuracy</p>
                    <p>✓ Error handling for zero division</p>
                    <p>✓ All Clear (AC) display reset</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Modal Footer Links */}
          <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-link text-xs hover:underline flex items-center gap-1.5"
            >
              <span>GitHub Repository</span>
              <span>↗</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary py-1.5 px-4 text-xs font-mono cursor-pointer"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
