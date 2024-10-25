import { IAdvConf } from '../../components/adv/Adv.tyeps';

interface AdvManagerConf {
  privacySettings?: Record<string, any>;
  enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number };
  enableSingleRequest?: boolean;
}
interface AdvManagerProps extends AdvManagerConf {
  advConf?: IAdvConf;
}

export type { AdvManagerProps, AdvManagerConf };
