import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user.interface";

export const loadUserData = createAction("[User] Load User Data");
export const loadUserDataSuccess = createAction(
  "[User] Load User Data Success",
  props<{ userData: any }>()
);
export const loadUserDataFailure = createAction(
  "[User] Load User Data Failure",
  props<{ error: any }>()
);
export const loadAllUsers = createAction("[User] Load All Users");
export const loadAllUsersSuccess = createAction(
  "[User] Load All Users Success",
  props<{ users: any[] }>()
);
export const loadAllUsersFailure = createAction(
  "[User] Load All Users Failure",
  props<{ error: any }>()
);

export const loadSingleUserData = createAction(
  "[User] Load Single User Data",
  props<{ userId: number }>()
);
export const loadSingleUserDataSuccess = createAction(
  "[User] Load Single User Data Success",
  props<{ user: any }>()
);
export const loadSingleUserDataFailure = createAction(
  "[User] Load Single User Data Failure",
  props<{ error: any }>()
);

export const sendPasswordResetLink = createAction(
  "[User] Send Password Reset Link",
  props<{ email: string }>()
);
export const sendPasswordResetLinkSuccess = createAction(
  "[User] Send Password Reset Link Success"
);
export const sendPasswordResetLinkFailure = createAction(
  "[User] Send Password Reset Link Failure",
  props<{ error: any }>()
);

export const updateProfile = createAction(
  "[User] Update Profile",
  props<{ user: any }>()
);

export const updateProfileSuccess = createAction(
  "[User] Update Profile Success",
  props<{ user: any }>()
);

export const updateProfileFailure = createAction(
  "[User] Update Profile Failure",
  props<{ error: any }>()
);
