import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
})

test('should add expense', () => {
    const expense = expenses[0];
    const action = {
        type: 'ADD_EXPENSE',
        expense 
    }

    const state = expensesReducer(undefined, action);
    expect(state).toEqual([ expense ]);
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ expenses[1], expenses[2] ])
})

test('should not remove expense by id if not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 'not an id'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should edit expense', () => {
    const newDescription = 'soda';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {description: newDescription}
    }
    const state = expensesReducer(expenses, action);
    const editedExpense = {
       ...expenses[0],
       description: newDescription
    }
    expect(state[0]).toEqual(editedExpense)
})

test('should not edit expense if not found', () => {
    const newDescription = 'soda';
    const action = {
        type: 'EDIT_EXPENSE',
        id: 'not an id',
        updates: {description: newDescription}
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses
    }
    const state = expensesReducer([expenses[0]], action);
    expect(state).toEqual(expenses);
})