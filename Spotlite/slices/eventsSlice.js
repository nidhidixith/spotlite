import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const eventsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const userEventsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const otherUserEventsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const eventInterestsAdapter = createEntityAdapter();

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
  eventInterests: eventInterestsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  specificEvent: specificEventAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  addEventStatus: "idle", // New state for add post status
  addEventError: null, // New state for add post error
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (filter) => {
    const response = await instance.get(`/events/get-events/?filter=${filter}`);
    return response.data;
  }
);

export const fetchUserEvents = createAsyncThunk(
  "userEvents/fetchUserEvents",
  async () => {
    const response = await instance.get("/events/get-user-events/");
    return response.data;
  }
);

export const fetchOtherUserEvents = createAsyncThunk(
  "otherUserEvents/fetchOtherUserEvents",
  async (userId, { rejectWithValue }) => {
    const response = await instance.get(
      `/events/get-other-user-events/${userId}/`
    );
    return response.data;
  }
);

export const addNewEvent = createAsyncThunk(
  "events/addNewEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/events/add-event/", eventData, {
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
      const response = await instance.post(
        `/events/interested-in-event/${eventId}/`,
        null,
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

export const removeInterestInEvent = createAsyncThunk(
  "eventInterests/removeInterestInEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/events/interested-in-event/${eventId}/`,

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

export const fetchInterests = createAsyncThunk(
  "eventInterests/fetchInterests",
  async ({ eventId }, { rejectWithValue }) => {
    const response = await instance.get(
      `/events/get-event-interests/${eventId}/`,
      {}
    );
    return response.data;
  }
);

export const fetchSpecificEvent = createAsyncThunk(
  "specificEvent/fetchSpecificEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/events/get-event/${eventId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "userEvents/deleteEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/events/delete-event/${eventId}/`,
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
      });
  },
});

export const {
  resetEvents,
  clearEvents,
  clearUserEvents,
  clearOtherUserEvents,
  clearEventInterests,
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
  selectAll: selectAllEventInterests,
  selectById: selectEventInterestsById,
  selectIds: selectEventInterestsIds,
} = eventInterestsAdapter.getSelectors((state) => state.event.eventInterests);

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

export const selectEventsByUser = createSelector(
  [selectAllOtherUserEvents, (state, userId) => userId],
  (events, userId) => events.filter((event) => event.user === userId)
);
