import { Exercise, getExercises } from '@app/api/auth.api';
import { persistParticipants, readExercises } from '@app/services/localStorage.service';
import { PrepareAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doLogout } from './authSlice';
import { ApiError } from '@app/api/ApiError';
import { SimpleFetchError } from '@app/api/http.api';

export interface ExercisetState {
  exercises: Exercise[] | null;
}

const initialState: ExercisetState = {
  exercises: readExercises(),
};

export const doExercisesFetch = createAsyncThunk('exercises/getExercises', async (_, { dispatch }) =>
  getExercises()
    .then((res) => {
      dispatch(setExercises(res.trainings));
      return res.trainings;
    })
    .catch((error: SimpleFetchError) => {
      if (error.options?.status == 403) {
        dispatch(doLogout());
      }
    }),
);

export const setExercises = createAction<PrepareAction<Exercise[]>>('participants/setExercises', (participants) => {
  persistParticipants(participants);

  return {
    payload: participants,
  };
});

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setExercises, (state, action) => {
      state.exercises = action.payload;
    });
  },
});

export default exercisesSlice.reducer;
