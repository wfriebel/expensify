import React from 'react';
import ExpenseList from './ExpenseList.js'
import ExpenseListFilters from './ExpenseListFilters.js';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;