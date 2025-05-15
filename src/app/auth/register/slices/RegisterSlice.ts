import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State interface cho AuthRegister module
interface AuthRegisterState {
  data: any;                // Data chung, tùy chỉnh type khi dùng
  loading: boolean;         // Trạng thái loading
  error?: string;           // Lỗi nếu có
}

const initialState: AuthRegisterState = {
  data: null,
  loading: false,
  error: undefined,
};

const authRegisterSlice = createSlice({
  name: 'authRegister',
  initialState,
  reducers: {
    // Bắt đầu fetch data
    fetchStart(state) {
      state.loading = true;
      state.error = undefined;
    },

    // Fetch thành công, cập nhật data
    fetchSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.loading = false;
    },

    // Fetch lỗi, ghi lỗi vào state
    fetchError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Thêm data mới (tuỳ chỉnh khi dùng)
    addData(state, action: PayloadAction<any>) {
      if (Array.isArray(state.data)) {
        state.data.push(action.payload);
      } else {
        state.data = action.payload;
      }
    },

    // Cập nhật data (tuỳ chỉnh khi dùng)
    updateData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },

    // Xoá data (tuỳ chỉnh khi dùng)
    removeData(state, action: PayloadAction<any>) {
      if (Array.isArray(state.data)) {
        state.data = state.data.filter(item => item.id !== action.payload);
      } else {
        state.data = null;
      }
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  addData,
  updateData,
  removeData,
} = authRegisterSlice.actions;

export default authRegisterSlice.reducer;
