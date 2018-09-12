import merge from 'lodash/merge';

let initialState = {};

export default function news(state = initialState, action = {}) {
    switch (action.type) {

        case 'SET_NEWS_LIST_BY_TYPE':
            var {
                newsType,
                data
            } = action;
            state[newsType] = data;
            return merge({}, state, {});

        case 'SET_NEWS_BY_UNIQUEKEY':
            var {
                uniquekey,
                data
            } = action;
            state[uniquekey] = data;
            return merge({}, state, {});

        default:
            return state;
    }
}

export const getNewsListByNewsType = (state, newsType) => {
    return (state.news[newsType] ? state.news[newsType] : []);
}

export const getNewsByUniqueKey = (state, uniquekey) => {
    return (state.news[uniquekey] ? state.news[uniquekey] : {});
}
