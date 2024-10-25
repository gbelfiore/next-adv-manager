import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import { AdvProps } from './Adv.tyeps';
import AdvManager from '../../utils/adv-manager/AdvManager';
import { useAppStore } from '../../state/app';

const Adv = ({ advConf, appendDivId, appendPath, defaultTargetingParams, otherTargetingParams }: AdvProps) => {
  const gptInit = useAppStore((state) => state.gptInit);
  const advRef = useRef<HTMLDivElement>(null);
  const interval = useRef<NodeJS.Timeout>();

  const advId = useMemo(() => {
    let advId = advConf.divId;
    appendDivId?.forEach((elem) => {
      advId += `-${elem}`;
    });
    return advId;
  }, [advConf.divId, appendDivId]);

  const advUnitPath = useMemo(() => {
    let advUnitPath = advConf.path;
    appendPath?.forEach((elem) => {
      advUnitPath += `/${elem}`;
    });
    return advUnitPath;
  }, [advConf.path, appendPath]);

  const setIntervalRefresh = useCallback(() => {
    if (advConf.refreshTime != undefined && advConf.refreshTime > 0) {
      interval.current = setInterval(() => {
        AdvManager.refreshSlot(advUnitPath);
      }, advConf.refreshTime * 1000);
    }
  }, [advConf.refreshTime, advUnitPath]);

  useEffect(() => {
    if (!gptInit) return;
    setIntervalRefresh();
    return () => {
      clearInterval(interval.current);
    };
  }, [gptInit, setIntervalRefresh]);

  const defineSlot = useCallback(() => {
    AdvManager.defineSlot(advUnitPath, advId, advConf.sizeMap, {
      defaultTargetingParams,
      otherTargetingParams,
    });
  }, [advConf.sizeMap, advId, advUnitPath, defaultTargetingParams, otherTargetingParams]);

  useEffect(() => {
    if (gptInit) defineSlot();
  }, [defineSlot, gptInit]);

  const getStyle = useMemo((): CSSProperties => {
    return {
      width: advConf.sizeMap[0],
      height: advConf.sizeMap[1],
    };
  }, [advConf.sizeMap]);

  if (!gptInit) return false;
  return <div id={advId} key={advId} ref={advRef} style={getStyle}></div>;
};

export default Adv;
