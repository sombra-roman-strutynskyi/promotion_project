import {
  IChangePassword,
  IUpdateProfile,
  UpdateProfile,
} from '@modules/profile';

export const MOCK_CHANGE_PASSWORD: IChangePassword = {
  oldPassword: 'password',
  newPassword: 'password1',
  confirmPassword: 'password1',
};

export const MOCK_PROFILE: IUpdateProfile = {
  firstName: 'firstName',
  lastName: 'lastName',
  age: 22,
  photoURL: 'http://photo.url',
  photo: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
};
export const MOCK_UPDATED_PROFILE: IUpdateProfile = new UpdateProfile(
  MOCK_PROFILE
);
