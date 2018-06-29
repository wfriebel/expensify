import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters.js';
import moment from 'moment';


test('should setup a text filter action object with provided text', () => {
    expect(setTextFilter('some text')).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'some text'
    })
})

test('should setup a text filter action object with default text', () => {
    expect(setTextFilter()).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should setup sort by amount action object', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should setup sort by date action object', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should setup set start date action object', () => {
    expect(setStartDate(moment(1000))).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(1000)
    })
})

test('should setup set end date action object', () => {
    expect(setEndDate(moment(1000))).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(1000)
    })
})