import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    expenseFormOnSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    removeOnClick = (e) => {
        this.props.startRemoveExpense(this.props.expense.id)
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
            <ExpenseForm 
                expense={this.props.expense}
                onSubmit={this.expenseFormOnSubmit}
            />
            <button onClick={this.removeOnClick} 
            >Remove</button>
        </div>
        );
    };
};

const mapStateToProps = (state, props) => {
   return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id)
   }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);