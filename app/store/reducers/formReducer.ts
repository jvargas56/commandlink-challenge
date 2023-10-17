import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//create form slice
const formSlice = createSlice({
    name: 'form',
    initialState: {} as Record<string, string>,
    reducers: {
        updateFormData: (state, action: PayloadAction<Record<string, string>>) => {
            return {...state, ...action.payload}
        }
    }
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;