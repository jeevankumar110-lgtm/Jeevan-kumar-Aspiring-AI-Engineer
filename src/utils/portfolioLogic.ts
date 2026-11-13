/**
 * Core domain logic for portfolio calculators, simulators, and project utilities.
 * Decoupled from UI to enable pure-logic testing with node:test.
 */

export interface VotingEligibilityResult {
  isEligible: boolean;
  age: number;
  yearsRemaining: number;
  status: 'VERIFIED_ELIGIBLE' | 'UNDERAGE' | 'INVALID';
  message: string;
}

export function checkVotingEligibility(age: number): VotingEligibilityResult {
  if (isNaN(age) || age <= 0 || age > 125) {
    return {
      isEligible: false,
      age,
      yearsRemaining: 0,
      status: 'INVALID',
      message: 'Invalid age specified. Please enter a valid age between 1 and 125.',
    };
  }

  const isEligible = age >= 18;
  const yearsRemaining = isEligible ? 0 : 18 - age;

  return {
    isEligible,
    age,
    yearsRemaining,
    status: isEligible ? 'VERIFIED_ELIGIBLE' : 'UNDERAGE',
    message: isEligible
      ? 'Applicant satisfies constitutional voting age criteria (18+).'
      : `Applicant must wait ${yearsRemaining} year(s) to register for voting.`,
  };
}

export interface GradeResult {
  courseCount: number;
  average: number;
  letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  academicStanding: string;
}

export function evaluateGrade(marks: Record<string, number>): GradeResult {
  const scores = Object.values(marks).filter((s) => typeof s === 'number' && !isNaN(s));
  if (scores.length === 0) {
    return {
      courseCount: 0,
      average: 0,
      letterGrade: 'F',
      academicStanding: 'No data provided',
    };
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  const avg = Math.round((total / scores.length) * 10) / 10;

  let letterGrade: GradeResult['letterGrade'] = 'F';
  let academicStanding = 'Needs Improvement';

  if (avg >= 90) {
    letterGrade = 'A+';
    academicStanding = 'Exemplary Distinction';
  } else if (avg >= 80) {
    letterGrade = 'A';
    academicStanding = 'Honors Standing';
  } else if (avg >= 70) {
    letterGrade = 'B';
    academicStanding = 'Good Standing';
  } else if (avg >= 60) {
    letterGrade = 'C';
    academicStanding = 'Satisfactory';
  } else if (avg >= 50) {
    letterGrade = 'D';
    academicStanding = 'Passing';
  }

  return {
    courseCount: scores.length,
    average: avg,
    letterGrade,
    academicStanding,
  };
}

export interface AtmTransactionResult {
  success: boolean;
  newBalance: number;
  message: string;
}

export function executeAtmTransaction(
  currentBalance: number,
  type: 'deposit' | 'withdraw',
  amount: number
): AtmTransactionResult {
  if (isNaN(amount) || amount <= 0) {
    return {
      success: false,
      newBalance: currentBalance,
      message: 'Amount must be greater than zero.',
    };
  }

  if (type === 'deposit') {
    const updated = Math.round((currentBalance + amount) * 100) / 100;
    return {
      success: true,
      newBalance: updated,
      message: `Successfully deposited $${amount.toFixed(2)}. Updated balance: $${updated.toFixed(2)}.`,
    };
  }

  if (type === 'withdraw') {
    if (amount > currentBalance) {
      return {
        success: false,
        newBalance: currentBalance,
        message: `Declined: Insufficient funds. Available balance: $${currentBalance.toFixed(2)}.`,
      };
    }
    const updated = Math.round((currentBalance - amount) * 100) / 100;
    return {
      success: true,
      newBalance: updated,
      message: `Dispense approved: $${amount.toFixed(2)}. Remaining balance: $${updated.toFixed(2)}.`,
    };
  }

  return {
    success: false,
    newBalance: currentBalance,
    message: 'Unknown transaction type.',
  };
}

export interface TaskItem {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time: string; // HH:MM
  hour: number; // 6 to 22
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export function filterTasksByDate(tasks: TaskItem[], dateStr: string): TaskItem[] {
  return tasks.filter((t) => t.date === dateStr);
}

export function addTaskItem(
  tasks: TaskItem[],
  newTask: { date: string; title: string; time: string; hour: number; priority?: 'high' | 'medium' | 'low' }
): TaskItem[] {
  if (!newTask.title.trim()) return tasks;
  const created: TaskItem = {
    id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    date: newTask.date,
    title: newTask.title.trim(),
    time: newTask.time || `${String(newTask.hour).padStart(2, '0')}:00`,
    hour: newTask.hour,
    completed: false,
    priority: newTask.priority || 'medium',
  };
  return [...tasks, created];
}

export function toggleTaskItem(tasks: TaskItem[], taskId: string): TaskItem[] {
  return tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
}

export function deleteTaskItem(tasks: TaskItem[], taskId: string): TaskItem[] {
  return tasks.filter((t) => t.id !== taskId);
}

export function getMonthMatrix(year: number, monthIndex: number) {
  // monthIndex: 0-11
  const firstDay = new Date(year, monthIndex, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const prevMonth = monthIndex === 0 ? 12 : monthIndex;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ day: d, dateStr, isCurrentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ day: d, dateStr, isCurrentMonth: true });
  }

  // Next month padding to fill out 35 or 42 grid cells
  const remaining = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = monthIndex === 11 ? 1 : monthIndex + 2;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ day: d, dateStr, isCurrentMonth: false });
  }

  return days;
}

export function evaluateExpression(expr: string): { result: number | null; error: string | null } {
  const clean = expr.trim();
  if (!clean) return { result: 0, error: null };

  // Only allow valid mathematical characters: digits, +, -, *, /, ., (, )
  if (!/^[0-9+\-*/. ()]+$/.test(clean)) {
    return { result: null, error: 'Invalid expression' };
  }

  // Check for division by zero like /0 or / 0
  if (/\/0(?![.0-9])|\/\s*0(?![.0-9])/.test(clean)) {
    return { result: null, error: 'Cannot divide by zero' };
  }

  try {
    // Standard safe computation
    const evalFn = new Function(`"use strict"; return (${clean});`);
    const val = evalFn();
    if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
      return { result: null, error: 'Math Error' };
    }
    const rounded = Math.round(val * 10000000) / 10000000;
    return { result: rounded, error: null };
  } catch {
    return { result: null, error: 'Syntax Error' };
  }
}

export function evaluateArithmetic(a: number, op: string, b: number): number {
  switch (op) {
    case '+':
      return Math.round((a + b) * 1000000) / 1000000;
    case '-':
      return Math.round((a - b) * 1000000) / 1000000;
    case '*':
      return Math.round((a * b) * 1000000) / 1000000;
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return Math.round((a / b) * 1000000) / 1000000;
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}
