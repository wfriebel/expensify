import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, wrapper, history, editExpense, removeExpense;

beforeEach(() => {
    expense = expenses[0];
    history = { push: jest.fn() };
    editExpense = jest.fn();
    removeExpense = jest.fn();
    wrapper = shallow(<EditExpensePage
        expense={expense}
        history={history}
        editExpense={editExpense}
        removeExpense={removeExpense}
        />);
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
})

test('should handle removeExpense', () => {
    wrapper.find('button').prop('onClick')();
    expect(removeExpense).toHaveBeenLastCalledWith(expense.id);
    expect(history.push).toHaveBeenLastCalledWith('/');
})