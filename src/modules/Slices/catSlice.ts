import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/modules/store";
import { http, errorHandler } from "src/api/http";
import { CatItem, CatReduce } from "./types";

const name = "catReduce";

const initialState: CatReduce = {
  photoList: [],
  autoCompleteContent: [],
  error: null,
  status: "loading",
};

export const catListAsync = createAsyncThunk<CatItem[], void>(`${name}/List`, async (_, { rejectWithValue }) => {
  try {
    const { data } = await http.get("/breeds?limit=20&page=0");
    return data;
  } catch (e) {
    const message = errorHandler(e);
    return rejectWithValue(message);
  }
});

export const catAutoCompleteAsync = createAsyncThunk<CatItem[], string>(
  `${name}/AutoComplete`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/breeds/search?q=${query}`);
      return data;
    } catch (e) {
      const message = errorHandler(e);
      return rejectWithValue(message);
    }
  },
);

export const catSearchAsync = createAsyncThunk<CatItem[], string>(
  `${name}/catSearch`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/breeds/search?q=${query}`);
      return data;
    } catch (e) {
      const message = errorHandler(e);
      return rejectWithValue(message);
    }
  },
);

export const catSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitAutocomplete: state => {
      state.autoCompleteContent = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(catListAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(catListAsync.fulfilled, (state, { payload }) => {
        state.photoList = payload;
        state.status = "idle";
      })
      .addCase(catListAsync.rejected, state => {
        state.status = "idle";
        alert("클라이언트에서 문제가 발생했습니다.");
      })
      .addCase(catAutoCompleteAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(catAutoCompleteAsync.fulfilled, (state, { payload }) => {
        state.autoCompleteContent = payload;
        state.status = "idle";
      })
      .addCase(catAutoCompleteAsync.rejected, state => {
        state.status = "idle";
        alert("클라이언트에서 문제가 발생했습니다.");
      })
      .addCase(catSearchAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(catSearchAsync.fulfilled, (state, { payload }) => {
        state.photoList = payload;
        state.status = "idle";
      })
      .addCase(catSearchAsync.rejected, state => {
        state.status = "idle";
        alert("클라이언트에서 문제가 발생했습니다.");
      });
  },
});

export const catReduceSelector = ({ catReduce }: RootState) => catReduce;
export const { setInitAutocomplete } = catSlice.actions;
export default catSlice;
