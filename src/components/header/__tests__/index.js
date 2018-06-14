import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Header from '../';

describe('<Header />', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.Header').length).toBe(1);
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    const links = wrapper.find('Link');
    expect(links.length).toBe(5);
    expect(links.at(0).prop('to')).toEqual('/resources');
    expect(links.at(1).prop('to')).toEqual('/teams/generate');
    expect(links.at(2).prop('to')).toEqual('/events/score');
    expect(links.at(3).prop('to')).toEqual('/events/ranking');
    expect(links.at(4).prop('to')).toEqual('/teams/score');
  });
});
