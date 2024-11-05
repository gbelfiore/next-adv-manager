import { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import { AdvProps } from './Adv.tyeps';
import AdvManager from '../../utils/adv-manager/AdvManager';
import { useAppStore } from '../../state/app';

const Adv = ({ advConf, defaultTargetingParams, additionalTargetingParams }: AdvProps) => {
  const gptInit = useAppStore((state) => state.gptInit);
  const advRef = useRef<HTMLDivElement>(null);
  const interval = useRef<NodeJS.Timeout>();

  const advConfGeneric = useAppStore((state) => state.advConf);

  const advId = useMemo(() => {
    if (!advConf?.specializationDivId) return null;
    let advId = advConf?.divId || advConfGeneric?.divId;
    advId += `-${advConf.specializationDivId}`;
    if (!advId) return null;

    return advId;
  }, [advConf?.divId, advConf?.specializationDivId, advConfGeneric?.divId]);

  const advUnitPath = useMemo(() => {
    if (!advConf?.specializationPath) return null;

    let advUnitPath = advConf?.path || advConfGeneric?.path;
    advUnitPath += `/${advConf.specializationPath}`;

    if (!advUnitPath) return null;

    return advUnitPath;
  }, [advConf?.path, advConf?.specializationPath, advConfGeneric?.path]);

  const sizeMap = useMemo(() => {
    const sizeMap = advConf?.sizeMap || advConfGeneric?.sizeMap;
    return sizeMap;
  }, [advConf?.sizeMap, advConfGeneric?.sizeMap]);

  const setIntervalRefresh = useCallback(() => {
    const refreshTime = advConf?.refreshTime || advConfGeneric?.refreshTime;
    if (refreshTime != undefined && refreshTime > 0 && advUnitPath) {
      interval.current = setInterval(() => {
        AdvManager.refreshSlot(advUnitPath);
      }, refreshTime * 1000);
    }
  }, [advConf?.refreshTime, advConfGeneric?.refreshTime, advUnitPath]);

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

  if (!gptInit || !advId || !advUnitPath || !sizeMap) return null;
  return <div id={advId} key={advId} ref={advRef} style={getStyle}></div>;
};

export default Adv;
