import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />)
})

test('should render ExpenseListFileters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFileters with alt data correctly', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
})

// should handle text change

test('should handle text change', () => {
    const value = 'some text';
    const e = { 
        target: { value } 
    }
    wrapper.find('input').simulate('change', e);
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

// should sort by date

test('should sort by date', () => {
    wrapper.setProps({ filters: altFilters });
    const value = 'date';
    const e = { 
        target: { value } 
    }
    wrapper.find('select').simulate('change', e);
    expect(sortByDate).toHaveBeenCalled();
})

// should sort by amount

test('should sort by amount', () => {
    const value = 'amount';
    const e = { 
        target: { value } 
    }
    wrapper.find('select').simulate('change', e);
    expect(sortByAmount).toHaveBeenCalled();
})

// should handle date changes

test('should handle date changes', () => {
    const dates = {
        startDate: moment(0),
        endDate: moment(0).add(3, 'days')
    }
    wrapper.childAt(2).prop('onDatesChange')(dates);
    expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
})

// should handle date focus changes

test('should handle date focus changes', () => {
    const calendarFocused = 'startDate';
    wrapper.childAt(2).prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})