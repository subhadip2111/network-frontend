import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        post: {},
        isPostStateUpdate: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        addPosts: (state, action) => {
            const existingIds = state.posts.map(post => post.id);
            const newPosts = action.payload.filter(post => !existingIds.includes(post.id));
            state.posts = [...state.posts, ...newPosts];
            state.loading = false;
            state.error = null;
        },
        updatePostTostore: (state, action) => {
            const { id } = action.payload;
            console.log("Looking for post with id:", id);

            const postIndex = state.posts.findIndex((post) => post.id === id);

            if (postIndex !== -1) {
                const updatedPost = state.posts[postIndex]; // Assuming you want to treat this as the "latest"
                state.post = updatedPost;

                // Optional: if action.payload includes newer post data, update it in place
                state.posts[postIndex] = { ...state.posts[postIndex], ...action.payload };
                state.isPostStateUpdate = true
                console.log("Post found and updated in posts array:", JSON.parse(JSON.stringify(state.posts[postIndex])));
            } else {
                console.log("Post not found");
                state.post = null;
            }
        },
        updatePostFlag: (state, action) => {
            console.log('state is goone update ', action.payload)
            state.isPostStateUpdate = action.payload
        }


        ,
        deletePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
        },
        likePost: (state, action) => {
            const postId = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = (post.likes || 0) + 1;
            }
        },
        unlikePost: (state, action) => {
            const postId = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post && post.likes > 0) {
                post.likes = post.likes - 1;
            }
        },
        incrementComments: (state, action) => {
            const postId = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.comments = (post.comments || 0) + 1;
            }
        },

        postDetails: (state, action) => {
            const postId = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                let obj = Object.assign(state.post, post)
                state.post = obj;
            } else {
                state.post = null;
            }
        }
        ,
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        resetPosts: (state) => {
            state.posts = [];
            state.page = 1;
            state.hasMore = true;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { addPosts, updatePostTostore, resetPosts, setPosts, postDetails, updatePostFlag } = postSlice.actions;
export default postSlice.reducer;