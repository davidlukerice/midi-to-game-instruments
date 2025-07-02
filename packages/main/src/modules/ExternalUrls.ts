import { AppModule } from '../AppModule.js';
import { ModuleContext } from '../ModuleContext.js';
import { shell } from 'electron';
import { URL } from 'node:url';

const meta = import.meta as unknown as { env: Record<string, string> }
const metaEnv = meta.env

export class ExternalUrls implements AppModule {

  readonly #externalUrls: Set<string>;

  constructor(externalUrls: Set<string>) {
    this.#externalUrls = externalUrls;
  }

  enable({ app }: ModuleContext): Promise<void> | void {
    app.on('web-contents-created', (_, contents) => {
      contents.setWindowOpenHandler(({ url }) => {
        const { origin } = new URL(url);

        if (this.#externalUrls.has(origin)) {
          shell.openExternal(url).catch(console.error);
        } else if (metaEnv.DEV) {
          console.warn(`Blocked the opening of a disallowed external origin: ${origin}`);
        }

        // Prevent creating a new window.
        return { action: 'deny' };
      });
    });
  }
}


export function allowExternalUrls(...args: ConstructorParameters<typeof ExternalUrls>) {
  return new ExternalUrls(...args);
}
