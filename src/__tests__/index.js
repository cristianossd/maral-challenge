import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;
const httpLink = new HttpLink({ uri: 'http://endpoint' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('render properly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('.App').length).toBe(1);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render two routes without authentication', () => {
    const wrapper = shallow(<App />);

    const routes = wrapper.find('Route');
    expect(routes.length).toBe(2);
    expect(routes.at(0).prop('path')).toBe('/');
    expect(routes.at(1).prop('path')).toBe('/login');
  });

  it('should render routes with authentication', () => {
    global.localStorage.setItem('auth-token', 'aif1n209amsd');
    const wrapper = shallow(<App />);

    const routes = wrapper.find('Route');
    expect(routes.length).toBe(7);
    expect(routes.at(0).prop('path')).toBe('/');
    expect(routes.at(1).prop('path')).toBe('/login');
    expect(routes.at(2).prop('path')).toBe('/resources');
    expect(routes.at(3).prop('path')).toBe('/teams/generate');
    expect(routes.at(4).prop('path')).toBe('/teams/score');
    expect(routes.at(5).prop('path')).toBe('/events/score');
    expect(routes.at(6).prop('path')).toBe('/events/ranking');
  });
});
