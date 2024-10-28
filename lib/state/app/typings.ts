import { IAdvConf } from '../../components/adv/Adv.tyeps';
import { AdvManagerConf, AdvManagerProps } from '../../utils/adv-manager/AdvManager.types';

interface IApp extends AdvManagerConf {
  gptInit: boolean;
  advConf?: IAdvConf;
  privacySettings?: Record<string, any>;
  enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number };
  enableSingleRequest?: boolean;

  actions: IAppActions;
}

interface IAppActions {
  init: (initData: { gptInit: boolean } & AdvManagerProps) => void;
  update: (updateData: AdvManagerConf) => void;
  setGptInit: (gptInit: boolean) => void;
  setPrivacySettings: (privacySettings?: Record<string, any>) => void;
  setEnableLazyLoadConfig: (enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number }) => void;
  setEnableSingleRequest: (enableSingleRequest?: boolean) => void;
  setAdvConf: (advConf?: IAdvConf) => void;
}

export type { IApp, IAppActions };
