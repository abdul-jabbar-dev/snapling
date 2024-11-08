import { RootState, AppDispatch, AppStore } from "./../store";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch =()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>  = useSelector
export const useAppStore =()=> useStore<AppStore>();
// reduxHooks.ts
 