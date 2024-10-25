'use client';
import { create } from 'zustand';
import { IApp } from './typings';
import { AdvManagerConf, AdvManagerProps } from '../../utils/adv-manager/AdvManager.types';
import { IAdvConf } from '../../components/adv/Adv.tyeps';

const useAppStore = create<IApp>()((set) => ({
  gptInit: false,
  privacySettings: undefined,
  enableLazyLoadConfig: undefined,
  enableSingleRequest: undefined,
  advConf: undefined,

  actions: {
    init: (initData: { gptInit: boolean } & AdvManagerProps) => {
      return set(initData);
    },
    update: (updateData: AdvManagerConf) => {
      return set((state) => ({ ...state, ...updateData }));
    },
    setGptInit: (gptInit: boolean) => {
      return set({ gptInit });
    },
    setPrivacySettings: (privacySettings?: Record<string, any>) => {
      return set({ privacySettings });
    },
    setEnableLazyLoadConfig: (enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number }) => {
      return set({ enableLazyLoadConfig });
    },
    setEnableSingleRequest: (enableSingleRequest?: boolean) => {
      return set({ enableSingleRequest });
    },
    setAdvConf: (advConf?: IAdvConf) => {
      return set({ advConf });
    },
  },
}));

export { useAppStore };
