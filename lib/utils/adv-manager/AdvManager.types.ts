import { IAdvConf } from '../../components/adv/Adv.tyeps';

interface AdvManagerConf {
  privacySettings?: Record<string, any>;
  enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number };
  enableSingleRequest?: boolean;
}

interface AdvManagerSlotsConf extends Omit<IAdvConf, 'sizeMap' | 'specializationDivId' | 'specializationPath'> {
  sizeMap?: [number, number];
}

interface AdvManagerProps extends AdvManagerConf {
  advConf?: AdvManagerSlotsConf;
}

export type { AdvManagerProps, AdvManagerConf, AdvManagerSlotsConf };
