'use client';
import { create } from 'zustand';
import { IApp } from './typings';

const useAppStore = create<IApp>()((set) => ({
  gptInit: false,

  actions: {
    setGptInit: (state: boolean) => {
      return set({ gptInit: state });
    },
  },
}));

export { useAppStore };
