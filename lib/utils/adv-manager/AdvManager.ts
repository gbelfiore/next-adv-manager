import { IDefaultTargetingParams } from '../../components/adv/Adv.tyeps';
import { useAppStore } from '../../state/app';
import { AdvManagerProps } from './AdvManager.types';

declare global {
  interface Window {
    googletag: any;
  }
}

class AdvManager {
  public static init(props: AdvManagerProps) {
    const existsScript = document.querySelector("[data-type='gpt_script']");

    if (!existsScript) {
      const gptUrl = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = gptUrl;
      script.dataset.type = 'gpt_script';
      document.head.appendChild(script);

      window.googletag = window.googletag || { cmd: [] };

      window.googletag.cmd.push(() => {
        props.enableLazyLoadConfig && window.googletag.pubads().enableLazyLoad(props.enableLazyLoadConfig);
        props.enableSingleRequest && window.googletag.pubads().enableSingleRequest();
        props.privacySettings && window.googletag.pubads().setPrivacySettings(props.privacySettings);
        window.googletag.enableServices();
      });

      useAppStore.getState().actions.init({ gptInit: true, ...props });
    }
  }

  public static update(props: AdvManagerProps) {
    const existsScript = document.querySelector("[data-type='gpt_script']");
    if (!existsScript) {
      AdvManager.init(props);
    } else {
      window.googletag.cmd.push(() => {
        props.enableLazyLoadConfig && window.googletag.pubads().enableLazyLoad(props.enableLazyLoadConfig);
        props.enableSingleRequest && window.googletag.pubads().enableSingleRequest();
        props.privacySettings && window.googletag.pubads().setPrivacySettings(props.privacySettings);
        window.googletag.enableServices();
      });

      useAppStore.getState().actions.update(props);
    }
  }

  public static getSlot(advUnitPath: string) {
    const slots = window.googletag.pubads().getSlotIdMap();
    const slotKey = Object.keys(slots).find((key) => key.includes(advUnitPath));
    return slotKey ? slots[slotKey] : undefined;
  }

  public static destroySlot(advUnitPath: string) {
    const slot = AdvManager.getSlot(advUnitPath);
    if (slot) {
      window.googletag?.cmd.push(() => {
        window.googletag.destroySlots([slot]);
      });
    }
  }

  public static refreshSlot(advUnitPath: string) {
    const slot = AdvManager.getSlot(advUnitPath);
    if (slot) {
      window.googletag?.cmd.push(() => {
        window.googletag.pubads().refresh([slot]);
      });
    }
  }

  public static defineSlot(
    advUnitPath: string,
    advId: string,
    sizeMap: [number, number],
    {
      defaultTargetingParams,
      additionalTargetingParams,
    }: { defaultTargetingParams?: IDefaultTargetingParams; additionalTargetingParams?: Record<string, string> }
  ) {
    window.googletag.cmd.push(() => {
      let slot = AdvManager.getSlot(advUnitPath);
      if (slot) {
        window.googletag?.cmd.push(() => {
          window.googletag.destroySlots([slot]);
        });
      }

      slot = window.googletag.defineSlot(advUnitPath, sizeMap, advId)?.setForceSafeFrame(true)?.addService(window.googletag.pubads());

      //--- default params ----
      const { environment, flyerId, retailerId, trafficSourceType, placement, platform, storeId, host } = defaultTargetingParams || {};
      flyerId && slot.setTargeting('flyerId', flyerId);
      retailerId && slot.setTargeting('retailerId', retailerId);
      environment && slot.setTargeting('environment', environment);
      trafficSourceType && slot.setTargeting('traffic_source_type', trafficSourceType);
      placement && slot.setTargeting('placement', placement);
      platform && slot.setTargeting('platform', platform);
      host && slot.setTargeting('next-domain', host);
      storeId && slot.setTargeting('storeId', storeId);

      //--- other params ----
      additionalTargetingParams &&
        Object.keys(additionalTargetingParams).forEach((key) => {
          const value = additionalTargetingParams[key];
          slot.setTargeting(key, value);
        });

      window.googletag.display(advId);
    });
  }
}

export default AdvManager;
