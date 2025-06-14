
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => google.maps.Map;
        Marker: new (options: any) => google.maps.Marker;
        InfoWindow: new (options: any) => google.maps.InfoWindow;
      };
    };
  }
}

declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: any);
  }
  
  class Marker {
    constructor(options: any);
    addListener(event: string, handler: () => void): void;
  }
  
  class InfoWindow {
    constructor(options: any);
    open(map: Map, marker: Marker): void;
  }
}

export {};
