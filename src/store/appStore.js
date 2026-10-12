import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UPCOMING_CASE_LOOKAHEAD_DAYS } from "../constants/appConstants";

export const defaultProfile = {
  name: "",
  imageUri: "",
  practiceFrom: "",
  designation: "",
  enrollmentNumber: "",
  court: "",
  phone: "",
  email: "",
  address: ""
};

export const useAppStore = create(
  persist(
    (set) => ({
      lookaheadDays: UPCOMING_CASE_LOOKAHEAD_DAYS,
      profile: defaultProfile,
      refreshKey: 0,
      setLookaheadDays: (lookaheadDays) => set({ lookaheadDays }),
      setProfile: (profile) => set((state) => ({ profile: { ...defaultProfile, ...state.profile, ...profile } })),
      bumpRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 }))
    }),
    {
      name: "caseflow-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ lookaheadDays: state.lookaheadDays, profile: state.profile })
    }
  )
);
