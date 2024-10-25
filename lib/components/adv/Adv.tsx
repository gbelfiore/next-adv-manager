import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import { AdvProps } from './Adv.tyeps';
import AdvManager from '../../utils/adv-manager/AdvManager';
import { useAppStore } from '../../state/app';

const Adv = ({ advConf, appendDivId, appendPath, defaultTargetingParams, additionalTargetingParams }: AdvProps) => {
  const gptInit = useAppStore((state) => state.gptInit);
  const advRef = useRef<HTMLDivElement>(null);
  const interval = useRef<NodeJS.Timeout>();

  const advConfGeneric = useAppStore((state) => state.advConf);

  const advId = useMemo(() => {
    let advId = advConf?.divId || advConfGeneric?.divId;
    if (!advId) return null;
    appendDivId?.forEach((elem) => {
      advId += `-${elem}`;
    });
    return advId;
  }, [advConf?.divId, advConfGeneric?.divId, appendDivId]);

  const advUnitPath = useMemo(() => {
    let advUnitPath = advConf?.path || advConfGeneric?.path;
    if (!advUnitPath) return null;
    appendPath?.forEach((elem) => {
      advUnitPath += `/${elem}`;
    });
    return advUnitPath;
  }, [advConf?.path, advConfGeneric?.path, appendPath]);

  const sizeMap = useMemo(() => {
    const sizeMap = advConf?.sizeMap || advConfGeneric?.sizeMap;
    return sizeMap;
  }, [advConf?.sizeMap, advConfGeneric?.sizeMap]);

  console.log({ advId, advUnitPath, sizeMap });

  const setIntervalRefresh = useCallback(() => {
    const refreshTime = advConf?.refreshTime || advConfGeneric?.refreshTime;
    if (refreshTime != undefined && refreshTime > 0 && advUnitPath) {
      interval.current = setInterval(() => {
        AdvManager.refreshSlot(advUnitPath);
      }, refreshTime * 1000);
    }
  }, [advConf?.refreshTime, advConfGeneric?.refreshTime, advUnitPath]);

  // useEffect(() => {
  //   if (!gptInit) return;
  //   setIntervalRefresh();
  //   return () => {
  //     clearInterval(interval.current);
  //   };
  // }, [gptInit, setIntervalRefresh]);

  const defineSlot = useCallback(() => {
    if (!advUnitPath || !advId || !sizeMap) return null;
    AdvManager.defineSlot(advUnitPath, advId, sizeMap, {
      defaultTargetingParams,
      additionalTargetingParams,
    });
  }, [advUnitPath, advId, sizeMap, defaultTargetingParams, additionalTargetingParams]);

  useEffect(() => {
    if (gptInit) {
      defineSlot();
      setIntervalRefresh();
      return () => {
        clearInterval(interval.current);
      };
    }
  }, [defineSlot, gptInit, setIntervalRefresh]);

  const getStyle = useMemo((): CSSProperties => {
    if (!sizeMap) return {};

    return {
      width: sizeMap[0],
      height: sizeMap[1],
    };
  }, [sizeMap]);

  if (!gptInit || !advId || !advUnitPath || !sizeMap) return <div>ciaooooooo</div>;
  return <div id={advId} key={advId} ref={advRef} style={getStyle}></div>;
};

export default Adv;
