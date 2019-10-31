/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ArticleDetail from './ArticleDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as ActionCreators from '../../../../store/actions/article';

const stubArticleInitialState = {
	article: {
		id: 1,
		author: 1,
		title: 'ARTICLE_TEST_TITLE_1',
		content: 'TEST_CONTENT_1',
		like: 1,
		dislike: 1,
	},
	articleAck: true,
};

const mockStore = getMockStore(stubArticleInitialState);

describe('<ArticleDetail />', () => {
	let articleDetail;
	let spyFetchArticle;
	beforeEach(() => {
		articleDetail = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact component={ArticleDetail} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		spyFetchArticle = jest
			.spyOn(ActionCreators, 'fetchArticle')
			.mockImplementation(() => dispatch => {});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const component = mount(articleDetail);
		const wrapper = component.find('.ArticleDetail');
		expect(wrapper.length).toBe(1);
	});
});
