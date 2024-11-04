import { IAdvConf } from '../../components/adv/Adv.tyeps';

interface AdvManagerConf {
  privacySettings?: Record<string, any>;
  enableLazyLoadConfig?: { fetchMarginPercent: number; mobileScaling: number; renderMarginPercent: number };
  enableSingleRequest?: boolean;
}

interface AdvManagerSlotsConf extends Omit<IAdvConf, 'sizeMap'> {
  sizeMap?: [number, number]; // `sizeMap` è opzionale qui
}

interface AdvManagerProps extends AdvManagerConf {
  advConf?: AdvManagerSlotsConf;
}

export type { AdvManagerProps, AdvManagerConf, AdvManagerSlotsConf };
