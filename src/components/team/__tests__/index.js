import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Team from '../';

const teamMock = {
  name: 'Team mock',
  finalScore: 2,
  events: [
    { order: 1, time: '04:20', ranking: 1 },
  ],
};

describe('<Team />', () => {
  it('render correctly', () => {
    const wrapper = shallow(
      <Team
        attributes={teamMock}
        pos={1}
        hidden={false}
      />
    );

    expect(wrapper.find('.Team').length).toBe(1);
    expect(wrapper.find('th').text()).toBe('2');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
