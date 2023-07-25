import userReducer from '@app/store/slices/userSlice';
import authReducer from '@app/store/slices/authSlice';
import participantsReducer from '@app/store/slices/participantsSlice';
import exerciseReducer from '@app/store/slices/exerciseSlice';
import nightModeReducer from '@app/store/slices/nightModeSlice';
import themeReducer from '@app/store/slices/themeSlice';
import pwaReducer from '@app/store/slices/pwaSlice';

export default {
  user: userReducer,
  auth: authReducer,
  nightMode: nightModeReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  participants: participantsReducer,
  exercises: exerciseReducer,
};
