/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ArticleCreate from './ArticleCreate';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as ActionCreators from '../../store/actions/article';


const stubArticleInitialState = {};

const mockStore = getMockStore(stubArticleInitialState, {}, {}, {});

describe('<ArticleCreate />', () => {
  let articleCreate;
  let spyCreate;
  const spyHide = jest.fn();
  beforeEach(() => {
    articleCreate = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <ArticleCreate
              show
              onHide={spyHide}
              title="title"
              content="content"
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyCreate = jest
      .spyOn(ActionCreators, 'postArticle')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(articleCreate);
    const wrapper = component.find('.ArticleCreate');
    expect(wrapper.length).toBe(4);
  });

  it('create article', () => {
    const wrapper = mount(articleCreate);
    // expect(wrapper.find('#write-preview-tab')).toHaveLength(2);
    const titleInput = wrapper.find('#article-title-input').at(1);
    const contentInput = wrapper.find('#article-content-input').at(1);
    const createButton = wrapper.find('#create-article-button').at(0);

    titleInput.instance().value = 'some title';
    titleInput.simulate('change');
    contentInput.instance().value = 'some content';
    contentInput.simulate('change');

    expect(titleInput.instance().value).toEqual('some title');
    expect(contentInput.instance().value).toEqual('some content');

    expect(createButton.exists()).toBeTruthy();
    expect(spyCreate).toHaveBeenCalledTimes(0);
    createButton.simulate('click');
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
