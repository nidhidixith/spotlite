import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const eventsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const userEventsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const otherUserEventsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const userInterestedEventsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const eventInterestsAdapter = createEntityAdapter();

const eventCommentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const specificEventAdapter = createEntityAdapter({});

// Define initial states
const initialState = {
  events: eventsAdapter.getInitialState({
    loading: false,
    error: null,
    currentFilter: null,
  }),
  userEvents: userEventsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  otherUserEvents: otherUserEventsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  userInterestedEvents: userInterestedEventsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  eventInterests: eventInterestsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  eventComments: eventCommentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  specificEvent: specificEventAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  addEventStatus: "idle", // New state for add post status
  addEventError: null, // New state for add post error

  addEventCommentStatus: "idle", // New state for add post status
  addEventCommentError: null, // New state for add post error
};

// export const fetchEvents = createAsyncThunk(
//   "events/fetchEvents",
//   async (filter) => {
//     // const response = await instance.get(`/events/get-events/?filter=${filter}`);
//     const response = await instance.get(`/events/?filter=${filter}`);
//     return response.data;
//   }
// );

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ filter, userLocation = null }) => {
    const params = { filter };

    if (userLocation) {
      params.lat = userLocation.latitude;
      params.lon = userLocation.longitude;
      params.full_address = userLocation.address;
    }
    console.log("Params from slice: ", params);
    const response = await instance.get("/events/", { params });
    return response.data;
  }
);

export const fetchUserEvents = createAsyncThunk(
  "userEvents/fetchUserEvents",
  async () => {
    // const response = await instance.get("/events/get-user-events/");
    const response = await instance.get("/events/user/");
    return response.data;
  }
);

export const fetchOtherUserEvents = createAsyncThunk(
  "otherUserEvents/fetchOtherUserEvents",
  async (userId, { rejectWithValue }) => {
    // const response = await instance.get(
    //   `/events/get-other-user-events/${userId}/`
    // );
    const response = await instance.get(`/events/user/${userId}/`);
    return response.data;
  }
);

export const fetchUserInterestedEvents = createAsyncThunk(
  "userInterestedEvents/fetchUserInterestedEvents",
  async () => {
    // const response = await instance.get("/events/get-user-interested-events/");
    const response = await instance.get("/events/user/interested/");
    return response.data;
  }
);

export const addNewEvent = createAsyncThunk(
  "events/addNewEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      // const response = await instance.post("/events/add-event/", eventData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.post("/events/", eventData, {
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

export const addInterestInEvent = createAsyncThunk(
  "eventInterests/addInterestInEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      // const response = await instance.post(
      //   `/events/interested-in-event/${eventId}/`,
      //   null,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post(
        `/events/${eventId}/interest/`,
        null,
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

export const removeInterestInEvent = createAsyncThunk(
  "eventInterests/removeInterestInEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      // const response = await instance.delete(
      //   `/events/interested-in-event/${eventId}/`,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.delete(`/events/${eventId}/interest/`, {
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

export const fetchInterests = createAsyncThunk(
  "eventInterests/fetchInterests",
  async ({ eventId }, { rejectWithValue }) => {
    // const response = await instance.get(
    //   `/events/get-event-interests/${eventId}/`,
    //   {}
    // );
    const response = await instance.get(`/events/${eventId}/interests/`, {});
    return response.data;
  }
);

export const fetchSpecificEvent = createAsyncThunk(
  "specificEvent/fetchSpecificEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      // const response = await instance.get(`/events/get-event/${eventId}/`);
      const response = await instance.get(`/events/${eventId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addEventComment = createAsyncThunk(
  "eventComments/addEventComment",
  async ({ eventId, commentData }, { rejectWithValue }) => {
    try {
      // const response = await instance.post(
      //   `/events/add-event-comment/${eventId}/`,
      //   commentData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post(
        `/events/${eventId}/comments/`,
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

export const fetchEventComments = createAsyncThunk(
  "eventComments/fetchEventComments",
  async ({ eventId }, { rejectWithValue }) => {
    // const response = await instance.get(
    //   `/events/get-event-comments/${eventId}/`,
    //   {}
    // );
    const response = await instance.get(`/events/${eventId}/comments/`, {});
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "userEvents/deleteEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      // const response = await instance.delete(
      //   `/events/delete-event/${eventId}/`,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.delete(`/events/${eventId}/`, {
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

export const deleteEventComment = createAsyncThunk(
  "eventComments/deleteEventComment",
  async ({ eventId, commentId }, { rejectWithValue }) => {
    try {
      // const response = await instance.delete("/events/delete-event-comment/", {
      //   params: {
      //     eventId,
      //     commentId,
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // const response = await instance.delete("/events/comments/delete/", {
      //   params: {
      //     eventId,
      //     commentId,
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.delete(
        `/events/${eventId}/comments/${commentId}/`,
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

const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEvents(state) {
      return initialState;
    },
    clearEvents: (state) => {
      eventsAdapter.removeAll(state.events);
    },
    clearUserEvents: (state) => {
      userEventsAdapter.removeAll(state.userEvents);
    },
    clearOtherUserEvents: (state) => {
      otherUserEventsAdapter.removeAll(state.otherUserEvents);
    },
    clearEventInterests: (state) => {
      eventInterestsAdapter.removeAll(state.eventInterests);
    },
    clearEventComments: (state) => {
      eventCommentsAdapter.removeAll(state.eventComments);
    },
    clearSpecificEvent: (state) => {
      specificEventAdapter.removeAll(state.specificEvent);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
        state.events.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events.loading = false;
        eventsAdapter.setAll(state.events, action.payload);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.events.error = action.error.message;
      })

      // For userEvents
      .addCase(fetchUserEvents.pending, (state) => {
        state.userEvents.loading = true;
        state.userEvents.error = null;
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.userEvents.loading = false;
        userEventsAdapter.setAll(state.userEvents, action.payload);
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.userEvents.loading = false;
        state.userEvents.error = action.error.message;
      })

      // For otherUserEvents
      .addCase(fetchOtherUserEvents.pending, (state) => {
        state.otherUserEvents.loading = true;
        state.otherUserEvents.error = null;
      })
      .addCase(fetchOtherUserEvents.fulfilled, (state, action) => {
        state.otherUserEvents.loading = false;
        otherUserEventsAdapter.setAll(state.otherUserEvents, action.payload);
      })
      .addCase(fetchOtherUserEvents.rejected, (state, action) => {
        state.otherUserEvents.loading = false;
        state.otherUserEvents.error = action.error.message;
      })

      // For User Interested Events
      .addCase(fetchUserInterestedEvents.pending, (state) => {
        state.userInterestedEvents.loading = true;
        state.userInterestedEvents.error = null;
      })
      .addCase(fetchUserInterestedEvents.fulfilled, (state, action) => {
        state.userInterestedEvents.loading = false;
        userInterestedEventsAdapter.setAll(
          state.userInterestedEvents,
          action.payload
        );
      })
      .addCase(fetchUserInterestedEvents.rejected, (state, action) => {
        state.userInterestedEvents.loading = false;
        state.userInterestedEvents.error = action.error.message;
      })

      // For AddInterest
      .addCase(addInterestInEvent.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(addInterestInEvent.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);

        const fullEvent = state.events.entities[action.payload.id];
        const fullUserEvent = state.userEvents.entities[action.payload.id];
        const fullOtherUserEvent =
          state.otherUserEvents.entities[action.payload.id];

        if (fullEvent) {
          fullEvent.is_interested = true;
          fullEvent.interested_count += 1;
        }
        if (fullUserEvent) {
          fullUserEvent.is_interested = true;
          fullUserEvent.interested_count += 1;
        }
        if (fullOtherUserEvent) {
          fullOtherUserEvent.is_interested = true;
          fullOtherUserEvent.interested_count += 1;
        }
      })

      .addCase(addInterestInEvent.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      // For RemoveInterest
      .addCase(removeInterestInEvent.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(removeInterestInEvent.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
        const fullEvent = state.events.entities[action.payload.id];
        const fullUserEvent = state.userEvents.entities[action.payload.id];
        const fullOtherUserEvent =
          state.otherUserEvents.entities[action.payload.id];

        // console.log("Event IDs:", state.events.ids);
        // console.log("User Event IDs:", state.userEvents.ids);
        // console.log("Other User Event IDs:", state.otherUserEvents.ids);

        if (fullEvent) {
          fullEvent.is_interested = false;
          fullEvent.interested_count -= 1;
        }
        if (fullUserEvent) {
          fullUserEvent.is_interested = false;
          fullUserEvent.interested_count -= 1;
        }
        if (fullOtherUserEvent) {
          fullOtherUserEvent.is_interested = false;
          fullOtherUserEvent.interested_count -= 1;
        }
      })

      .addCase(removeInterestInEvent.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      .addCase(addNewEvent.pending, (state) => {
        state.addEventStatus = "loading";
        state.addEventError = null;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.addEventStatus = "succeeded";
        userEventsAdapter.addOne(state.userEvents, action.payload);
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.addEventStatus = "failed";

        state.addEventError =
          action.payload ||
          action.payload.detail ||
          action.error.message ||
          "Failed to create event";
      })

      // For specific event
      .addCase(fetchSpecificEvent.pending, (state) => {
        state.specificEvent.loading = true;
        state.specificEvent.error = null;
      })
      .addCase(fetchSpecificEvent.fulfilled, (state, action) => {
        state.specificEvent.loading = false;
        // postsAdapter.setAll(state.posts, action.payload);
        specificEventAdapter.setOne(state.specificEvent, action.payload);
      })
      .addCase(fetchSpecificEvent.rejected, (state, action) => {
        state.specificEvent.loading = false;
        state.specificEvent.error =
          action.payload.error || "Error fetching event";
      })

      // For DeleteEvent
      .addCase(deleteEvent.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const eventId = action.meta.arg.eventId; // Extract postId
        userEventsAdapter.removeOne(state.userEvents, eventId); // Use the actual ID
        // console.log("Existing Event IDs after Removal:", state.userEvents.ids);
      })

      // For DeletePostCOmment
      .addCase(deleteEventComment.fulfilled, (state, action) => {
        // state.posts.loading = false;
        const commentId = action.meta.arg.commentId; // Extract postId
        eventCommentsAdapter.removeOne(state.eventComments, commentId); // Use the actual ID
        // console.log(
        //   "Existing Comment IDs after Removal:",
        //   state.postComments.ids
        // );
      })
      // For FetchInterests
      .addCase(fetchInterests.pending, (state) => {
        state.eventInterests.loading = true;
        state.eventInterests.error = null;
      })
      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.eventInterests.loading = false;
        eventInterestsAdapter.setAll(state.eventInterests, action.payload);
      })
      .addCase(fetchInterests.rejected, (state, action) => {
        state.eventInterests.loading = false;
        state.eventInterests.error = action.error.message;
      })

      // For AddComment
      .addCase(addEventComment.pending, (state) => {
        state.addEventCommentStatus = "loading";
        state.addEventCommentError = null;
      })
      .addCase(addEventComment.fulfilled, (state, action) => {
        state.addEventCommentStatus = "succeeded";
        // otherUserPostsAdapter.upsertMany(state.otherUserPosts, action.payload);
        console.log("Comments data: ", action.payload);
        eventCommentsAdapter.addOne(state.eventComments, action.payload);
      })
      .addCase(addEventComment.rejected, (state, action) => {
        state.addEventCommentStatus = "failed";
        state.addEventCommentError = action.error.message;
      })

      // For FetchComments
      .addCase(fetchEventComments.pending, (state) => {
        state.eventComments.loading = true;
        state.eventComments.error = null;
      })
      .addCase(fetchEventComments.fulfilled, (state, action) => {
        state.eventComments.loading = false;
        eventCommentsAdapter.upsertMany(state.eventComments, action.payload);
      })
      .addCase(fetchEventComments.rejected, (state, action) => {
        state.eventComments.loading = false;
        state.eventComments.error = action.error.message;
      });
  },
});

export const {
  resetEvents,
  clearEvents,
  clearUserEvents,
  clearOtherUserEvents,
  clearEventInterests,
  clearEventComments,
  clearSpecificEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
} = eventsAdapter.getSelectors((state) => state.event.events);

export const {
  selectAll: selectAllUserEvents,
  selectById: selectUserEventById,
  selectIds: selectUserEventIds,
} = userEventsAdapter.getSelectors((state) => state.event.userEvents);

export const {
  selectAll: selectAllOtherUserEvents,
  selectById: selectOtherUserEventById,
  selectIds: selectOtherUserEventIds,
} = otherUserEventsAdapter.getSelectors((state) => state.event.otherUserEvents);

export const {
  selectAll: selectAllUserInterestedEvents,
  selectById: selectUserInterestedEventById,
  selectIds: selectUserInterestedEventIds,
} = userInterestedEventsAdapter.getSelectors(
  (state) => state.event.userInterestedEvents
);

export const {
  selectAll: selectAllEventInterests,
  selectById: selectEventInterestsById,
  selectIds: selectEventInterestsIds,
} = eventInterestsAdapter.getSelectors((state) => state.event.eventInterests);

export const {
  selectAll: selectAllEventComments,
  selectById: selectEventCommentsById,
  selectIds: selectEventCommentsIds,
} = eventCommentsAdapter.getSelectors((state) => state.event.eventComments);

export const {
  selectAll: selectAllSpecificEvents,
  selectById: selectSpecificEventById,
  selectIds: selectSpecificEventIds,
} = specificEventAdapter.getSelectors((state) => state.event.specificEvent);

export const selectInterestsByEvent = createSelector(
  [selectAllEventInterests, (state, eventId) => eventId],
  (interests, eventId) =>
    interests.filter((interest) => interest.event === eventId)
);

export const selectCommentsByEvent = createSelector(
  [selectAllEventComments, (state, eventId) => eventId],
  (comments, eventId) => comments.filter((comment) => comment.event === eventId)
);

export const selectEventsByUser = createSelector(
  [selectAllOtherUserEvents, (state, userId) => userId],
  (events, userId) => events.filter((event) => event.user === userId)
);
