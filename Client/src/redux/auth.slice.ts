import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InitialStateAuthSlice {
      user: User.UserSchema | null
      isLogin: boolean
}

const initialState: InitialStateAuthSlice = {
      user: null,
      isLogin: false
}

export const authSlice = createSlice({
      name: 'counter',
      initialState,
      reducers: {
            fetchUser: (state, data: PayloadAction<{ user: User.UserSchema | null; isLogin: boolean }>) => {
                  state.isLogin = data.payload.isLogin
                  state.user = data.payload.user
            },
            doChangeIsLogin: (state, data: PayloadAction<{ isLogin: boolean }>) => {
                  state.isLogin = data.payload.isLogin
            }
      }
})

// Action creators are generated for each case reducer function
export const { fetchUser, doChangeIsLogin } = authSlice.actions

export default authSlice.reducer
