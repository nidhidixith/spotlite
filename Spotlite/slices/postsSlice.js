import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const userPostsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const otherUserPostsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const postLikesAdapter = createEntityAdapter();

const postCommentsAdapter = createEntityAdapter();

// Define initial states
const initialState = {
  posts: postsAdapter.getInitialState({ loading: false, error: null }),
  userPosts: userPostsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  otherUserPosts: otherUserPostsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  postLikes: postLikesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  postComments: postCommentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
};

// const initialState = postsAdapter.getInitialState({
//   fetchPostsStatus: "idle",
//   fetchPostsError: null,

//   fetchUserPostsStatus: "idle",
//   fetchUserPostsError: null,

//   fetchOtherUserPostsStatus: "idle",
//   fetchOtherUserPostsError: null,

//   likePostStatus: "idle",
//   likePostError: null,

//   unLikePostStatus: "idle",
//   unLikePostError: null,

//   fetchLikesStatus: "idle",
//   fetchLikesError: null,

//   addCommentStatus: "idle",
//   addCommentError: null,

//   fetchCommentsStatus: "idle",
//   fetchCommentsError: null,

//   addNewPostStatus: "idle",
//   addNewPostError: null,

//   likes: likesAdapter.getInitialState(),
//   comments: commentsAdapter.getInitialState(),
//   reposts: repostsAdapter.getInitialState(),
//   mediaReposts: mediaRepostsAdapter.getInitialState(),
//   taggedPosts: taggedPostsAdapter.getInitialState(),
// });

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await instance.get("/posts/get-posts/");
  // console.log("From postSlice:", response.data);
  return response.data;
});

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchUserPosts",
  async () => {
    const response = await instance.get("/posts/get-user-posts/");
    return response.data;
  }
);

export const fetchOtherUserPosts = createAsyncThunk(
  "otherUserPosts/fetchOtherUserPosts",
  async (userId, { rejectWithValue }) => {
    const response = await instance.get(
      `/posts/get-other-user-posts/${userId}/`
    );
    console.log("From slice", response.data);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const { text, mediaFiles } = initialPost;

      const formData = new FormData();
      formData.append("text", text);
      // Append mediaFiles under the key 'uploaded_files'
      if (Object.keys(mediaFiles).length > 0) {
        mediaFiles.forEach((file) => {
          formData.append("uploaded_files", file);
        });
      }
      console.log("Formdata is: ", formData);
      const response = await instance.post("/posts/add-post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

export const likePost = createAsyncThunk(
  "postLikes/likePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/posts/like-post/${postId}/`,
        null,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
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
        `/posts/like-post/${postId}/`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
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
    const response = await instance.get(`/posts/get-likes/${postId}/`, {});
    console.log(response.data);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "postComments/addComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    console.log("Comment data from postslice:", commentData);
    try {
      const response = await instance.post(
        `/posts/add-comment/${postId}/`,
        commentData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
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
    const response = await instance.get(`/posts/get-comments/${postId}/`, {});
    console.log(response.data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "userPosts/deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/posts/delete-post/${postId}/`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data);
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
      const response = await instance.delete("/posts/delete-post-comment/", {
        params: {
          postId,
          commentId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data);
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

    // clearPostLikes(state) {
    //   likesAdapter.removeAll(state.likes);
    // },
    // clearPostComments(state) {
    //   commentsAdapter.removeAll(state.comments);
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.loading = true;
        state.posts.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.loading = false;
        postsAdapter.setAll(state.posts, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.loading = false;
        state.posts.error = action.error.message;
      })

      // For userPosts
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.loading = true;
        state.userPosts.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.loading = false;
        userPostsAdapter.setAll(state.userPosts, action.payload);
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
      .addCase(fetchOtherUserPosts.fulfilled, (state, action) => {
        state.otherUserPosts.loading = false;
        otherUserPostsAdapter.setAll(state.otherUserPosts, action.payload);
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
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertMany(state.otherUserPosts, action.payload);
        // postCommentsAdapter.addOne(state.postComments, action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      // For AddNewPost
      .addCase(addNewPost.fulfilled, (state, action) => {
        // state.posts.loading = false;
        // Add the new post directly to state.posts
        userPostsAdapter.addOne(state.userPosts, action.payload);
      })

      // For DeletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const postId = action.meta.arg.postId; // Extract postId
        console.log("PostId to Remove:", postId);
        userPostsAdapter.removeOne(state.userPosts, postId); // Use the actual ID
        console.log("Existing Post IDs after Removal:", state.userPosts.ids);
      })

      // For DeletePostCOmment
      .addCase(deletePostComment.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const commentId = action.meta.arg.commentId; // Extract postId
        console.log("CommentId to Remove:", commentId);
        postCommentsAdapter.removeOne(state.postComments, commentId); // Use the actual ID
        console.log(
          "Existing Comment IDs after Removal:",
          state.postComments.ids
        );
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

    // .addCase(addNewPost.pending, (state, action) => {
    //   state.addNewPostStatus = "loading";
    // })
    // .addCase(addNewPost.fulfilled, (state, action) => {
    //   state.addNewPostStatus = "succeeded";
    //   // Add any fetched posts to the array
    //   // postsAdapter.upsertMany(state, action.payload);
    // })
    // .addCase(addNewPost.rejected, (state, action) => {
    //   state.addNewPostStatus = "failed";
    //   state.addNewPostError = action.error.message;
    // });

    // .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    // .addCase(addRepost.fulfilled, postsAdapter.addOne);
  },
});

export const {
  resetPosts,
  clearPosts,
  clearUserPosts,
  clearOtherUserPosts,
  clearPostLikes,
  clearPostComments,
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
