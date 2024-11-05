import { AdvManagerConf, AdvManagerProps, AdvManagerSlotsConf } from '../../utils/adv-manager/AdvManager.types';

interface IApp extends AdvManagerProps {
  gptInit: boolean;
  actions: IAppActions;
}

interface IAppActions {
  init: (initData: { gptInit: boolean } & AdvManagerProps) => void;
  update: (updateData: AdvManagerConf) => void;
  setGptInit: (gptInit: boolean) => void;
  setPrivacySettings: (privacySettings?: Record<string, any>) => void;
  setEnableLazyLoadConfig: (enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number }) => void;
  setEnableSingleRequest: (enableSingleRequest?: boolean) => void;
  setAdvConf: (advConf?: AdvManagerSlotsConf) => void;
}

export type { IApp, IAppActions };
