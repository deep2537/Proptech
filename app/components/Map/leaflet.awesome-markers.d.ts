// leaflet.awesome-markers.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace AwesomeMarkers {
    interface AwesomeMarkersIconOptions extends L.IconOptions {
      icon?: string;
      iconColor?: string;
      markerColor?: string;
      prefix?: string;
      extraClasses?: string;
    }

    function icon(options: AwesomeMarkersIconOptions): L.Icon;
  }
}
