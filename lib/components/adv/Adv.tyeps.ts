interface IAdvConf {
  divId: string;
  path: string;
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
  advConf: IAdvConf;
  appendDivId?: Array<string>;
  appendPath?: Array<string>;
  defaultTargetingParams?: IDefaultTargetingParams;
  otherTargetingParams?: Record<string, string>;
}

export type { IAdvConf, AdvProps, IDefaultTargetingParams };
