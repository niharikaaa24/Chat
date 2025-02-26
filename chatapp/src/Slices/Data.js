import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    id: 0,
    image:""
  },
  reducers: {
    setId: (state,action) => {
      state.id = action.payload
    },
    setImage: (state,action) => {
      state.image = action.payload
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setId,setImage, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer