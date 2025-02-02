interface IAdvConf {
  divId?: string;
  path?: string;
  specializationDivId: string;
  specializationPath: string;
  sizeMap: [number, number];
  refreshTime?: number;
}

interface IDefaultTargetingParams {
  flyerId?: string;
  retailerId?: string;
  storeId?: string;
  platform?: string;
  placement?: string;
  trafficSourceType?: string;
  environment?: string;
  host?: string;
}

interface AdvProps {
  advConf?: IAdvConf;
  defaultTargetingParams?: IDefaultTargetingParams;
  additionalTargetingParams?: Record<string, string>;
}

export type { IAdvConf, AdvProps, IDefaultTargetingParams };
