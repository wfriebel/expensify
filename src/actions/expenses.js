import database from '../firebase/firebase';

// Add Expense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// This function returned below will be called by redux and will be passed the dispatch method
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt }
        return database.ref('expenses').push(expense)
            .then((ref) => {
                const expenseWithId = {
                    id: ref.key,
                    ...expense
                }
                dispatch(addExpense(expenseWithId));
            });
    }
}

// Remove Expense
export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});