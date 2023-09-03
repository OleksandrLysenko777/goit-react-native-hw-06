import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentsByPostId: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.commentsByPostId[postId] = comments;
    },
    addNewComment: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = [];
      }
      state.commentsByPostId[postId].push(comment);
    },
  },
});

export const { setComments, addNewComment } = commentsSlice.actions;
export default commentsSlice.reducer;