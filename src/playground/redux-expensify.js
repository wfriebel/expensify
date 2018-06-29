import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Add Expense
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// Remove Expense
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Set text filter
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// Sort by amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// Sort by date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// Set start date
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// Set end date
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state;
    }
}

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text}
        case 'SORT_BY_AMOUNT':
            return{...state, sortBy: 'amount'}
        case 'SORT_BY_DATE':
            return{...state, sortBy: 'date'}
        case 'SET_START_DATE':
            return{...state, startDate: action.startDate}
        case 'SET_END_DATE':
            return{...state, endDate: action.endDate}
        default:
            return state;
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) || expense.note.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? 1 : -1;
        }
    })
}

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// Driver Code
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 100 }));
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: 200 }));
// store.dispatch(removeExpense({ id: expense1.expense.id }));
// store.dispatch(editExpense(expense2.expense.id, {amount: 500} ));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(1))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(4))


// Demo State
const demoState = {
    expenses: [
        {
            id: 'sodif',
            description: 'January Rent',
            note: 'This was the final payment for that address',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',  // Date or amount
        startDate: undefined,
        endDate: undefined
    }
}
