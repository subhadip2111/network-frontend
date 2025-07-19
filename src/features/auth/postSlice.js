import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null, 
    isPostStateUpdate: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      const existingIds = new Set(state.posts.map(post => post.id));
      const newPosts = action.payload.filter(post => !existingIds.has(post.id));
      state.posts = [...state.posts, ...newPosts];
    },
    updatePostFlag: (state, action) => {
      state.isPostStateUpdate = action.payload;
    },
    updatePostTostore: (state, action) => {
      state.post = action.payload;
    },
    updateSinglePostInArray: (state, action) => {
      const { postId, updatedPost } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          ...updatedPost,
          id: postId
        };
      } else {
        console.warn(`Post with id ${postId} not found in posts array`);
      }
    },
    clearSinglePost: (state) => {
      state.post = null;
    }
  },
});

export const { 
  setPosts, 
  addPosts, 
  updatePostFlag, 
  updatePostTostore,
  updateSinglePostInArray,
  clearSinglePost
} = postSlice.actions;

export default postSlice.reducer;