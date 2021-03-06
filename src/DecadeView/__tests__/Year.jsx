import React from 'react';
import { mount } from 'enzyme';

import Year from '../Year';

/* eslint-disable comma-dangle, jsx-a11y/mouse-events-have-key-events */

const tileProps = {
  classes: ['react-calendar__tile'],
  date: new Date(2018, 0, 1),
  point: 2018,
};

describe('Year', () => {
  it('applies given classNames properly', () => {
    const component = mount(
      <Year
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__tile')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__tile--flag')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__decade-view__years__year')).toBe(true);
    expect(wrapperClassName.includes('testFunctionClassName')).toBe(true);
  });

  it('renders time component with proper dateTime arguments', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        year={2018}
      />
    );

    const time = component.find('time');

    expect(time).toHaveLength(1);
    expect(time.prop('dateTime')).toBe('2018T00:00:00.000');
    expect(time.text()).toBe('2018');
  });

  it('is disabled when date is before beginning of minDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2019, 0, 1)}
      />
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBe(true);
  });

  it('is not disabled when date is after beginning of minDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2018, 0, 1)}
      />
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('is disabled when date is after end of maxDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        maxDate={new Date(2017, 0, 1)}
      />
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBe(true);
  });

  it('is not disabled when date is before end of maxDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        maxDate={new Date(2018, 0, 1)}
      />
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = jest.fn();

    const component = mount(
      <Year
        {...tileProps}
        date={date}
        onClick={onClick}
      />
    );

    component.find('.react-calendar__tile').simulate('click');

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(
      <Year
        {...tileProps}
        date={date}
        onMouseOver={onMouseOver}
      />
    );

    component.find('.react-calendar__tile').simulate('mouseOver');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(
      <Year
        {...tileProps}
        date={date}
        onMouseOver={onMouseOver}
      />
    );

    component.find('.react-calendar__tile').simulate('focus');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const component = mount(
      <Year
        {...tileProps}
        tileContent={<div className="testContent" />}
      />
    );

    const testContent = component.find('.testContent');

    expect(testContent).toHaveLength(1);
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = jest.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const component = mount(
      <Year
        {...tileProps}
        date={date}
        tileContent={tileContent}
      />
    );

    const testContent = component.find('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({ date, view: 'decade' });
    expect(testContent).toHaveLength(1);
  });
});
