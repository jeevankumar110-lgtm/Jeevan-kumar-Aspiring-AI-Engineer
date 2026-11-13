import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkVotingEligibility,
  evaluateGrade,
  executeAtmTransaction,
  evaluateArithmetic,
  addTaskItem,
  filterTasksByDate,
  toggleTaskItem,
  deleteTaskItem,
  getMonthMatrix,
  evaluateExpression,
  TaskItem,
} from './portfolioLogic';

test('checkVotingEligibility accurately detects adult voter (18+)', () => {
  const result = checkVotingEligibility(19);
  assert.equal(result.isEligible, true);
  assert.equal(result.status, 'VERIFIED_ELIGIBLE');
  assert.equal(result.yearsRemaining, 0);
});

test('checkVotingEligibility accurately calculates remaining years for minor', () => {
  const result = checkVotingEligibility(15);
  assert.equal(result.isEligible, false);
  assert.equal(result.status, 'UNDERAGE');
  assert.equal(result.yearsRemaining, 3);
});

test('checkVotingEligibility rejects invalid ages', () => {
  const result = checkVotingEligibility(-5);
  assert.equal(result.status, 'INVALID');
  assert.equal(result.isEligible, false);
});

test('evaluateGrade calculates honors average and grade tier', () => {
  const marks = {
    programming: 94,
    math: 88,
    physics: 90,
    web: 92,
  };
  const result = evaluateGrade(marks);
  assert.equal(result.courseCount, 4);
  assert.equal(result.average, 91);
  assert.equal(result.letterGrade, 'A+');
  assert.equal(result.academicStanding, 'Exemplary Distinction');
});

test('executeAtmTransaction successfully deposits and withdraws funds', () => {
  const deposit = executeAtmTransaction(1000, 'deposit', 250);
  assert.equal(deposit.success, true);
  assert.equal(deposit.newBalance, 1250);

  const withdraw = executeAtmTransaction(1250, 'withdraw', 200);
  assert.equal(withdraw.success, true);
  assert.equal(withdraw.newBalance, 1050);

  const overdraw = executeAtmTransaction(1050, 'withdraw', 2000);
  assert.equal(overdraw.success, false);
  assert.equal(overdraw.newBalance, 1050);
});

test('evaluateArithmetic performs precision arithmetic', () => {
  assert.equal(evaluateArithmetic(10, '+', 5), 15);
  assert.equal(evaluateArithmetic(10, '-', 4), 6);
  assert.equal(evaluateArithmetic(6, '*', 7), 42);
  assert.equal(evaluateArithmetic(100, '/', 4), 25);
  assert.throws(() => evaluateArithmetic(5, '/', 0), /Division by zero/);
});

test('Task Tracker adds, filters, toggles, and deletes tasks', () => {
  const initial: TaskItem[] = [];
  const added = addTaskItem(initial, {
    date: '2026-11-12',
    title: 'Review Project Architecture',
    time: '10:00',
    hour: 10,
    priority: 'high',
  });
  assert.equal(added.length, 1);
  assert.equal(added[0].title, 'Review Project Architecture');
  assert.equal(added[0].completed, false);

  const filtered = filterTasksByDate(added, '2026-11-12');
  assert.equal(filtered.length, 1);
  const emptyFilter = filterTasksByDate(added, '2026-11-13');
  assert.equal(emptyFilter.length, 0);

  const toggled = toggleTaskItem(added, added[0].id);
  assert.equal(toggled[0].completed, true);

  const deleted = deleteTaskItem(toggled, toggled[0].id);
  assert.equal(deleted.length, 0);
});

test('getMonthMatrix generates valid calendar grid days', () => {
  const matrix = getMonthMatrix(2026, 10); // Nov 2026
  assert.ok(matrix.length >= 35);
  const currentMonthDays = matrix.filter((d) => d.isCurrentMonth);
  assert.equal(currentMonthDays.length, 30); // 30 days in November
});

test('evaluateExpression evaluates mathematical strings safely and catches errors', () => {
  assert.equal(evaluateExpression('12 + 8 * 2').result, 28);
  assert.equal(evaluateExpression('100 / 4 - 5').result, 20);
  assert.equal(evaluateExpression('0.1 + 0.2').result, 0.3);
  assert.equal(evaluateExpression('10 / 0').error, 'Cannot divide by zero');
  assert.equal(evaluateExpression('invalid_text').error, 'Invalid expression');
});
