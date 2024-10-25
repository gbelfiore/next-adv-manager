interface IApp {
  gptInit: boolean;
  actions: IAppActions;
}

interface IAppActions {
  setGptInit: (state: boolean) => void;
}

export type { IApp, IAppActions };
