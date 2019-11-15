declare module 'react-google-tag-manager' {
  export interface IConfig {
    dataLayerName?: string;
    scriptId?: string;
    gtmId?: string;
    additionalEvents?: object;
    previewVariables?: boolean;
    scheme?: string;
  }
  export interface  IGTMParts {
    noScriptAsReact: () => HTMLElement;
    noScriptAsHTML: () => string;
    scriptAsReact: () => HTMLScriptElement;
    scriptAsHTML: () => string;
  }
  export default function GTMParts(...IConfig): IGTMParts;
}
