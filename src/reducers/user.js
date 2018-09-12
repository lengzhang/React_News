import merge from 'lodash/merge';

let initialState = {
    accessToken: null,
    userinfo: null,
}

export default function user(state = initialState, action = {}) {

    switch (action.type) {

        case 'SAVE_ACCESS_TOKEN':
            state.accessToken = action.accessToken;
            return merge({}, state, {});

        case 'SAVE_USERINFO':
            state.userinfo = action.userinfo;
            return merge({}, state, {});

        case 'SAVE_USERCOMMENTS':
            state.comments = action.comments;
            return merge({}, state, {});

        case 'SAVE_USERCOLLECTIONS':
            state.collections = action.collections;
            return merge({}, state, {});

        default:
            return state;
    }

}

// 获取 access token
export const getAccessToken = (state) => state.user.accessToken;

// 获取用户信息
export const getUserInfo = (state) => state.user.userinfo || {};

// 获取用户评论
export const getUserComments = (state) => state.user.comments || [];

// 获取用户收藏
export const getUserCollections = (state) => state.user.collections || [];
