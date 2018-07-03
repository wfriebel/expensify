import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary with a count of 1', () => {
    const expensesCount = 1;
    const expensesTotal = 200;
    const wrapper = shallow(<ExpensesSummary
        expensesCount={expensesCount} 
        expensesTotal={expensesTotal}
    />);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpensesSummary with a count of 0', () => {
    const expensesCount = 0;
    const expensesTotal = 200;
    const wrapper = shallow(<ExpensesSummary
        expensesCount={expensesCount} 
        expensesTotal={expensesTotal}
    />);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpensesSummary with a count of 2', () => {
    const expensesCount = 2;
    const expensesTotal = 200;
    const wrapper = shallow(<ExpensesSummary
        expensesCount={expensesCount} 
        expensesTotal={expensesTotal}
    />);
    expect(wrapper).toMatchSnapshot();
})