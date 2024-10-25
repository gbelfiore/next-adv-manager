import { IDefaultTargetingParams } from '../../components/adv/Adv.tyeps';
import { useAppStore } from '../../state/app';

declare global {
  interface Window {
    googletag: any;
  }
}

class AdvManager {
  private static initConfiguration(isCookieAccepted: boolean) {
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

      useAppStore.getState().actions.setGptInit(true);
    }

    window.googletag.cmd.push(() => {
      // window.googletag.pubads().enableLazyLoad()
      // window.googletag.pubads().enableSingleRequest()
      window.googletag.pubads().setPrivacySettings({
        nonPersonalizedAds: !isCookieAccepted,
      });
      window.googletag.enableServices();
    });
  }

  public static init(isCookieAccepted: boolean) {
    AdvManager.initConfiguration(isCookieAccepted);
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
      otherTargetingParams,
    }: { defaultTargetingParams?: IDefaultTargetingParams; otherTargetingParams?: Record<string, string> }
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
      otherTargetingParams &&
        Object.keys(otherTargetingParams).forEach((key) => {
          const value = otherTargetingParams[key];
          slot.setTargeting(key, value);
        });

      window.googletag.display(advId);
    });
  }
}

export default AdvManager;
