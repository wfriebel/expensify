import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => (
    {
        type: 'INCREMENT',
        incrementBy
    }
);

const decrementCount = ({ decrementBy = 1 } = {}) => (
    {
        type: 'DECREMENT',
        decrementBy
    }
);

const set = ({ count }) => (
    {
        type: 'SET',
        count
    }
);

const reset = () => (
    {
        type: 'RESET'
    }
)

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state;
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(set({ count: 5 }));
store.dispatch(reset());


