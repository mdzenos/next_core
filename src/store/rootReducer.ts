// /src/store/rootReducer.ts
import dashboardReducer from '@app/dashboard/slices/DashboardSlice';
import loginReducer from '@app/auth/login/slices/LoginSlice';
import registerReducer from '@app/auth/register/slices/RegisterSlice';
import profileReducer from '@app/auth/profile/slices/ProfileSlice';
// -- IMPORT SLICES --

export const rootReducer = {
  dashboard: dashboardReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
// -- ADD TO ROOT REDUCER --
};
