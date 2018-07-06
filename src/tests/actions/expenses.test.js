import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup a remove expense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup an edit expense action object', () => {
    const action = editExpense('123abc', {
        description: 'Water bill',
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'Water bill'
        }
    })
})

test('should setup an add expense action object with provided values', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'this one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

            return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        }).then( snapshot => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});
    const defaultExpenseData = {
        description: '',
            note: '',
            amount: 0,
            createdAt: 0
    }
    store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultExpenseData
                }
            })

            return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        }).then( snapshot => {
            expect(snapshot.val()).toEqual(defaultExpenseData);
            done();
        })
});

// test('should setup an add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })