import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expensesTotal';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const amount = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{amount}</span>
                 </h1>
                 <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                 </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: expenses.length,
        expensesTotal: expensesTotal(expenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);