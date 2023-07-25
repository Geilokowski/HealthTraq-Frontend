import { Participant, deleteParticipant, getParticipants, refreshExercises } from '@app/api/auth.api';
import { persistParticipants, readParticipants } from '@app/services/localStorage.service';
import { PrepareAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doLogout } from './authSlice';
import { SimpleFetchError } from '@app/api/http.api';

export interface ParticipantState {
  participants: Participant[] | null;
}

const initialState: ParticipantState = {
  participants: readParticipants(),
};

export const doParticipantsFetch = createAsyncThunk('participants/getParticipants', async (_, { dispatch }) =>
  getParticipants()
    .then((res) => {
      dispatch(setParticipants(res.participants));
      return res.participants;
    })
    .catch((error: SimpleFetchError) => {
      if (error.options?.status == 403) {
        dispatch(doLogout());
      }
    }),
);

export const doParticipantDeletion = createAsyncThunk('participants/delete', async (id: number, { dispatch }) =>
  deleteParticipant(id)
    .then((res) => {
      dispatch(doParticipantsFetch());
      return res;
    })
    .catch((error: SimpleFetchError) => {
      if (error.options?.status == 403) {
        dispatch(doLogout());
      }
    }),
);

export const doExerciseRefresh = createAsyncThunk('participants/refresh/exercises', async (id: number, { dispatch }) =>
  refreshExercises(id)
    .then((res) => {
      dispatch(doParticipantsFetch());
      return res;
    })
    .catch((error: SimpleFetchError) => {
      if (error.options?.status == 403) {
        dispatch(doLogout());
      }
    }),
);

export const setParticipants = createAction<PrepareAction<Participant[]>>(
  'participants/setParticipants',
  (participants) => {
    persistParticipants(participants);

    return {
      payload: participants,
    };
  },
);

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setParticipants, (state, action) => {
      state.participants = action.payload;
    });
  },
});

export default participantsSlice.reducer;
