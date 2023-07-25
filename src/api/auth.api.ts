import { httpApi } from '@app/api/http.api';
import { UserModel } from '@app/domain/UserModel';

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginResponse {
  token: string;
  user: UserModel;
}

export interface Exercise {
  id: number;
  participantName: string;
  startTime: string;
  trainingsSeconds: number;
  distance?: number;
  calories?: number;
  sourceId: string;
  averageHeartRate?: string;
  maximumHeartRate?: string;
  activity: string;
}

type DataProvider = 'POLAR' | 'GARMIN';

export interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  fetchingData: boolean;
  exerciseCount: number;
  dataProvider: DataProvider;
}

export interface ParticipantList {
  participants: Participant[];
}

export interface ExerciseList {
  trainings: Exercise[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> => {
  return httpApi.post<LoginResponse>('login', { ...loginPayload }).then(({ data }) => data);
};

export const getExercises = (): Promise<ExerciseList> => {
  return httpApi.get<ExerciseList>('exercises').then(({ data }) => data);
};

export const getParticipants = (): Promise<ParticipantList> => {
  return httpApi.get<ParticipantList>('participants').then(({ data }) => data);
};

export const deleteParticipant = (id: number): Promise<void> => {
  return httpApi.delete<void>(`participants/${id}`).then(() => {
    console.log('deleted participant with id ' + id);
  });
};

export const refreshExercises = (id: number): Promise<void> => {
  return httpApi.post<void>(`participants/${id}/exercises`).then();
};

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);
