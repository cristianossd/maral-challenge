import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Spinner from '../';

describe('<Spinner />', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper.find('.Spinner').length).toBe(1);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
