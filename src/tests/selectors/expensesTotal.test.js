import expensesTotal from '../../selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('should return zero when no expenses are provided', () => {
    expect(expensesTotal([])).toBe(0);
})

test('should return the amount of one expense if only one is given', () => {
    expect(expensesTotal([expenses[0]])).toBe(expenses[0].amount);
})

test('should return the sum of all expenses given', () => {
    expect(expensesTotal(expenses)).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
})