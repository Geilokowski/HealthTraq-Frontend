import { Exercise, Participant } from '@app/api/auth.api';
import { UserModel } from '@app/domain/UserModel';
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';

export const testUser: UserModel = {
  id: 1,
  firstName: 'Chris',
  lastName: 'Johnson',
  imgUrl: avatarImg,
  userName: '@john1989',
  email: {
    name: 'chris.johnson@altence.com',
    verified: true,
  },
  phone: {
    number: '+18143519459',
    verified: false,
  },
  sex: 'male',
  birthday: '01/26/2022',
  lang: 'en',
  country: 'GB',
  city: 'London',
  address1: '14 London Road',
  zipcode: 5211,
  website: 'altence.com',
  socials: {
    twitter: '@altence_team',
    facebook: 'https://facebook.com/groups/1076577369582221',
    linkedin: 'https://linkedin.com/company/altence',
  },
};

export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const persistParticipants = (participants: Participant[]): void => {
  localStorage.setItem('participants', JSON.stringify(participants));
};

export const persistExercises = (exercises: Exercise[]): void => {
  localStorage.setItem('exercises', JSON.stringify(exercises));
};

export const readParticipants = (): Participant[] | null => {
  const userStr = localStorage.getItem('participants');
  return userStr && userStr !== 'undefined' ? JSON.parse(userStr) : [];
};

export const readExercises = (): Exercise[] | null => {
  const userStr = localStorage.getItem('exercises');
  return userStr && userStr !== 'undefined' ? JSON.parse(userStr) : [];
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem('user');
  return userStr && userStr !== 'undefined' ? JSON.parse(userStr) : testUser;
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
