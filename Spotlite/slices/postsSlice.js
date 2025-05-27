import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const postsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const userPostsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const otherUserPostsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const postLikesAdapter = createEntityAdapter();

const postCommentsAdapter = createEntityAdapter();

const specificPostAdapter = createEntityAdapter({});

// Define initial states
const initialState = {
  posts: postsAdapter.getInitialState({
    loading: false,
    error: null,
    nextPage: null,
  }),
  userPosts: userPostsAdapter.getInitialState({
    loading: false,
    error: null,
    nextPage: null,
  }),
  otherUserPosts: otherUserPostsAdapter.getInitialState({
    loading: false,
    error: null,
    nextPage: null,
  }),
  postLikes: postLikesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  postComments: postCommentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),

  specificPost: specificPostAdapter.getInitialState({
    loading: false,
    error: null,
  }),

  addPostStatus: "idle", // New state for add post status
  addPostError: null, // New state for add post error

  addCommentStatus: "idle", // New state for add post status
  addCommentError: null, // New state for add post error
};

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await instance.get("/posts/get-posts/");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      // const response = await instance.get(`/posts/get-posts/?page=${page}`);
      const response = await instance.get(`/posts/?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchUserPosts",
  async ({ page = 1 }, { rejectWithValue }) => {
    // const response = await instance.get(`/posts/get-user-posts/?page=${page}`);
    const response = await instance.get(`/posts/user/?page=${page}`);
    return response.data;
  }
);

export const fetchOtherUserPosts = createAsyncThunk(
  "otherUserPosts/fetchOtherUserPosts",
  async ({ userId, page = 1 }, { rejectWithValue }) => {
    // const response = await instance.get(
    //   `/posts/get-other-user-posts/${userId}/?page=${page}`
    // );
    const response = await instance.get(`/posts/user/${userId}/?page=${page}`);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "userPosts/addNewPost",
  async (formData, { rejectWithValue }) => {
    try {
      // const response = await instance.post("/posts/add-post/", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "postLikes/likePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      // const response = await instance.post(
      //   `/posts/like-post/${postId}/`,
      //   null,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post(`/posts/${postId}/like/`, null, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const unLikePost = createAsyncThunk(
  "postLikes/unLikePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        // `/posts/like-post/${postId}/`,
        `/posts/${postId}/like/`,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLikes = createAsyncThunk(
  "postLikes/fetchLikes",
  async ({ postId }, { rejectWithValue }) => {
    // const response = await instance.get(`/posts/get-likes/${postId}/`, {});
    const response = await instance.get(`/posts/${postId}/likes/`, {});
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "postComments/addComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      // const response = await instance.post(
      //   `/posts/add-comment/${postId}/`,
      //   commentData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post(
        `/posts/${postId}/comments/`,
        commentData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "postComments/fetchComments",
  async ({ postId }, { rejectWithValue }) => {
    // const response = await instance.get(`/posts/get-comments/${postId}/`, {});
    const response = await instance.get(`/posts/${postId}/comments/`, {});
    return response.data;
  }
);

export const fetchSpecificPost = createAsyncThunk(
  "specificPost/fetchSpecificPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      // const response = await instance.get(`/posts/get-post/${postId}/`);
      const response = await instance.get(`/posts/${postId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "userPosts/deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      // const response = await instance.delete(`/posts/delete-post/${postId}/`, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.delete(`/posts/${postId}/`, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePostComment = createAsyncThunk(
  "comments/deletePostComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      // const response = await instance.delete("/posts/delete-post-comment/", {
      //   params: {
      //     postId,
      //     commentId,
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // const response = await instance.delete("/posts/comments/delete/", {
      //   params: {
      //     postId,
      //     commentId,
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.delete(
        `/posts/${postId}/comments/${commentId}/`,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPosts(state) {
      return initialState;
    },
    clearPosts: (state) => {
      postsAdapter.removeAll(state.posts);
    },
    clearUserPosts: (state) => {
      userPostsAdapter.removeAll(state.userPosts);
    },
    clearOtherUserPosts: (state) => {
      otherUserPostsAdapter.removeAll(state.otherUserPosts);
    },
    clearPostLikes: (state) => {
      postLikesAdapter.removeAll(state.postLikes);
    },
    clearPostComments: (state) => {
      postCommentsAdapter.removeAll(state.postComments);
    },
    clearSpecificPost: (state) => {
      specificPostAdapter.removeAll(state.specificPost);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.loading = true;
        state.posts.error = null;
      })
      // .addCase(fetchPosts.fulfilled, (state, action) => {
      //   state.posts.loading = false;
      //   // postsAdapter.setAll(state.posts, action.payload);
      //   postsAdapter.setAll(state.posts, action.payload.results);
      // })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.loading = false;
        const { results, next } = action.payload;

        // Append new posts to the existing ones
        postsAdapter.addMany(state.posts, results);
        state.posts.nextPage = next; // Save the `next` URL or null if no more pages
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.loading = false;
        state.posts.error = action.payload.error || "Error fetching posts";
      })

      // For userPosts
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.loading = true;
        state.userPosts.error = null;
      })
      // .addCase(fetchUserPosts.fulfilled, (state, action) => {
      //   state.userPosts.loading = false;
      //   userPostsAdapter.setAll(state.userPosts, action.payload);
      // })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.loading = false;
        const { results, next } = action.payload;

        // Append new posts to the existing ones
        userPostsAdapter.addMany(state.userPosts, results);
        state.userPosts.nextPage = next; // Save the `next` URL or null if no more pages
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.userPosts.loading = false;
        state.userPosts.error = action.error.message;
      })

      // For otherUserPosts
      .addCase(fetchOtherUserPosts.pending, (state) => {
        state.otherUserPosts.loading = true;
        state.otherUserPosts.error = null;
      })
      // .addCase(fetchOtherUserPosts.fulfilled, (state, action) => {
      //   state.otherUserPosts.loading = false;
      //   otherUserPostsAdapter.setAll(state.otherUserPosts, action.payload);
      // })
      .addCase(fetchOtherUserPosts.fulfilled, (state, action) => {
        state.otherUserPosts.loading = false;
        const { results, next } = action.payload;

        // Append new posts to the existing ones
        otherUserPostsAdapter.addMany(state.otherUserPosts, results);
        state.otherUserPosts.nextPage = next; // Save the `next` URL or null if no more pages
      })
      .addCase(fetchOtherUserPosts.rejected, (state, action) => {
        state.otherUserPosts.loading = false;
        state.otherUserPosts.error = action.error.message;
      })

      // For Like
      .addCase(likePost.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
      })
      .addCase(likePost.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      // For UnLike
      .addCase(unLikePost.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
      })
      .addCase(unLikePost.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      // For AddComment
      .addCase(addComment.pending, (state) => {
        state.addCommentStatus = "loading";
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentStatus = "succeeded";
        // otherUserPostsAdapter.upsertMany(state.otherUserPosts, action.payload);
        // postCommentsAdapter.addOne(state.postComments, action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentStatus = "failed";
        state.addCommentError = action.error.message;
      })

      // Add new post
      .addCase(addNewPost.pending, (state) => {
        state.addPostStatus = "loading";
        state.addPostError = null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.addPostStatus = "succeeded";
        userPostsAdapter.addOne(state.userPosts, action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.addPostStatus = "failed";
        state.addPostError =
          action.payload ||
          action.payload.detail ||
          action.error.message ||
          "Failed to create post";
        console.log("Add post error: ", state.addPostError);
      })

      // For specific post
      .addCase(fetchSpecificPost.pending, (state) => {
        state.specificPost.loading = true;
        state.specificPost.error = null;
      })
      .addCase(fetchSpecificPost.fulfilled, (state, action) => {
        state.specificPost.loading = false;
        specificPostAdapter.setOne(state.specificPost, action.payload);
      })
      .addCase(fetchSpecificPost.rejected, (state, action) => {
        state.specificPost.loading = false;
        state.specificPost.error =
          action.payload.error || "Error fetching post";
      })

      // For DeletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const postId = action.meta.arg.postId; // Extract postId
        userPostsAdapter.removeOne(state.userPosts, postId); // Use the actual ID
        // console.log("Existing Post IDs after Removal:", state.userPosts.ids);
      })

      // For DeletePostCOmment
      .addCase(deletePostComment.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const commentId = action.meta.arg.commentId; // Extract postId
        postCommentsAdapter.removeOne(state.postComments, commentId); // Use the actual ID
        // console.log(
        //   "Existing Comment IDs after Removal:",
        //   state.postComments.ids
        // );
      })

      // For FetchLikes
      .addCase(fetchLikes.pending, (state) => {
        state.postLikes.loading = true;
        state.postLikes.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.postLikes.loading = false;
        postLikesAdapter.upsertMany(state.postLikes, action.payload);
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.postLikes.loading = false;
        state.postLikes.error = action.error.message;
      })

      // For FetchComments
      .addCase(fetchComments.pending, (state) => {
        state.postComments.loading = true;
        state.postComments.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.postComments.loading = false;
        postCommentsAdapter.upsertMany(state.postComments, action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.postComments.loading = false;
        state.postComments.error = action.error.message;
      });
  },
});

export const {
  resetPosts,
  clearPosts,
  clearUserPosts,
  clearOtherUserPosts,
  clearPostLikes,
  clearPostComments,
  clearSpecificPost,
} = postsSlice.actions;

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.post.posts);

export const {
  selectAll: selectAllUserPosts,
  selectById: selectUserPostById,
  selectIds: selectUserPostIds,
} = userPostsAdapter.getSelectors((state) => state.post.userPosts);

export const {
  selectAll: selectAllOtherUserPosts,
  selectById: selectOtherUserPostById,
  selectIds: selectOtherUserPostIds,
} = otherUserPostsAdapter.getSelectors((state) => state.post.otherUserPosts);

export const {
  selectAll: selectAllPostLikes,
  selectById: selectPostLikesById,
  selectIds: selectPostLikesIds,
} = postLikesAdapter.getSelectors((state) => state.post.postLikes);

export const {
  selectAll: selectAllPostComments,
  selectById: selectPostCommentsById,
  selectIds: selectPostCommentsIds,
} = postCommentsAdapter.getSelectors((state) => state.post.postComments);

export const {
  selectAll: selectAllSpecificPosts,
  selectById: selectSpecificPostById,
  selectIds: selectSpecificPostIds,
} = specificPostAdapter.getSelectors((state) => state.post.specificPost);

export const selectLikesByPost = createSelector(
  [selectAllPostLikes, (state, postId) => postId],
  (likes, postId) => likes.filter((like) => like.post === postId)
);

export const selectCommentsByPost = createSelector(
  [selectAllPostComments, (state, postId) => postId],
  (comments, postId) => comments.filter((comment) => comment.post === postId)
);

export const selectPostsByUser = createSelector(
  [selectAllOtherUserPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
