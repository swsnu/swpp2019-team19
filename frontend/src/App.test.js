import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  beforeEach(() => {
    appLogIn = (
      <Provider store={mockStoreLogIn}>
        <App history={history} />
      </Provider>
    );
  });
  it('should render App at Login state', () => {
    const component = mount(appLogIn);
    expect(component.find('.App').length).toBe(1);
  });
});
