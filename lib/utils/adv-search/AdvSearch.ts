import { useAppStore } from '../../state/app';
import AdvManager from '../adv-manager/AdvManager';

class AdvSearch {
  static observer: MutationObserver;

  public static init() {
    AdvSearch.searchDivSlot();
    const config = { childList: true, subtree: true };
    AdvSearch.observer = new MutationObserver(AdvSearch.callbackRenderBlockAdv);
    AdvSearch.observer.observe(document.body, config);
  }

  public static searchDivSlot() {
    const divs = document.querySelectorAll('div[data-sf-adv="true"]');
    divs.forEach((div) => {
      if (div instanceof HTMLElement) {
        AdvSearch.defineDivSlot(div);
      }
    });
  }

  public static callbackRenderBlockAdv(mutationsList: MutationRecord[]) {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node: Node) => {
          if (node instanceof HTMLElement && node.tagName === 'DIV' && node.dataset.sfAdv == 'true') {
            AdvSearch.defineDivSlot(node);
          }
        });
      }
    });
  }

  public static defineDivSlot(node: Node) {
    if (node instanceof HTMLElement) {
      const appendDivId = node.dataset.appendDivId;
      const appendPath = node.dataset.appendPath;

      if (!appendDivId || appendDivId == '' || !appendPath || appendPath == '') {
        console.error('ERROR ADV: data-append-div-id and data-append-path is required for node', node);
        return null;
      }

      const advId = AdvSearch.getAdvId(appendDivId, node.dataset.divId);
      const advUnitPath = AdvSearch.getAdvUnitPath(appendPath, node.dataset.path);

      const sizeMap = AdvSearch.getSizeMap(node.dataset.size);
      if (!sizeMap) {
        console.error('ERROR ADV: sizeMap is required in slot or general configuration. Node:', node);
        return null;
      }

      const refreshTime = AdvSearch.getRefreshTime(node.dataset.refreshTime);

      const targetingParams = AdvSearch.getTargetingParams(node.dataset.targetingParams);

      if (!advUnitPath || !advId || !sizeMap) {
        console.error('ERROR ADV: advUnitPath, advId, sizeMap is required in slot or general configuration', { advUnitPath, advId, sizeMap });
        return null;
      }

      node.id = advId;
      node.style.width = `${sizeMap[0]}px`;
      node.style.height = `${sizeMap[1]}px`;

      AdvManager.defineSlot(advUnitPath, advId, sizeMap, targetingParams);

      AdvSearch.setIntervalRefresh(advUnitPath, refreshTime);
    }
  }

  private static getAdvId(appendDivId: string, divId?: string) {
    const advConfGeneric = useAppStore.getState().advConf;
    let advId = divId || advConfGeneric?.divId;
    try {
      if (!advId) return null;
      const listAppendDivId = JSON.parse(appendDivId);
      if (!Array.isArray(listAppendDivId) || listAppendDivId.length == 0) return null;

      listAppendDivId?.forEach((elem: string) => {
        advId += `-${elem}`;
      });
    } catch (error) {
      console.error(error);
      return null;
    }

    return advId;
  }

  private static getAdvUnitPath(appendPath: string, path?: string) {
    const advConfGeneric = useAppStore.getState().advConf;

    let advUnitPath = path || advConfGeneric?.path;

    try {
      if (!advUnitPath) return null;
      const listAppendPath = JSON.parse(appendPath);
      if (!Array.isArray(listAppendPath) || listAppendPath.length == 0) return null;
      listAppendPath?.forEach((elem: string) => {
        advUnitPath += `/${elem}`;
      });
    } catch (error) {
      console.error(error);
      return null;
    }

    return advUnitPath;
  }

  private static getSizeMap(size?: string): [number, number] | undefined {
    const advConfGeneric = useAppStore.getState().advConf;

    let sizeMap: [number, number] | undefined = undefined;

    try {
      if (size) {
        const sizeSplit = JSON.parse(size);
        sizeMap = [0, 0];
        sizeMap[0] = parseInt(sizeSplit[0]);
        sizeMap[1] = parseInt(sizeSplit[1]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!sizeMap && advConfGeneric?.sizeMap) {
        sizeMap = advConfGeneric.sizeMap;
      }
    }

    return sizeMap;
  }

  private static getRefreshTime(rt?: string): number {
    const advConfGeneric = useAppStore.getState().advConf;
    let refreshTime: number | undefined = 0;

    try {
      refreshTime = rt ? parseInt(rt) : undefined;
    } catch (error) {
      console.error(error);
    } finally {
      if ((refreshTime == undefined || isNaN(refreshTime)) && advConfGeneric?.refreshTime != undefined) {
        refreshTime = advConfGeneric.refreshTime;
      }
    }

    return refreshTime ?? 0;
  }

  private static getTargetingParams(targetingParams?: string) {
    if (targetingParams) {
      try {
        return JSON.parse(targetingParams);
      } catch (error) {
        console.log('targetingParams', error);
      }
    }

    return undefined;
  }

  private static setIntervalRefresh(advUnitPath: string, refreshTime: number) {
    if (refreshTime > 0) {
      setInterval(() => {
        AdvManager.refreshSlot(advUnitPath);
      }, refreshTime * 1000);
    }
  }
}

export default AdvSearch;
