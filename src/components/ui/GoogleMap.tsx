
import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    infoWindow?: string;
  }>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center = { lat: 40.7128, lng: -74.0060 }, // Default to New York
  zoom = 14,
  height = "400px",
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    // Load Google Maps script
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.google.maps);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadGoogleMaps()
      .then(() => {
        // Initialize the map
        mapInstanceRef.current = new google.maps.Map(mapRef.current!, {
          center,
          zoom,
          styles: [
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#f8f9fa" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9ecef" }]
            }
          ]
        });

        // Add markers
        markers.forEach(marker => {
          const mapMarker = new google.maps.Marker({
            position: marker.position,
            map: mapInstanceRef.current,
            title: marker.title || 'Location'
          });

          if (marker.infoWindow) {
            const infoWindow = new google.maps.InfoWindow({
              content: marker.infoWindow
            });

            mapMarker.addListener('click', () => {
              infoWindow.open(mapInstanceRef.current, mapMarker);
            });
          }
        });
      })
      .catch(error => {
        console.error('Error loading Google Maps:', error);
      });

    return () => {
      // Cleanup if needed
    };
  }, [apiKey, center.lat, center.lng, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }} 
      className="rounded-lg shadow-lg"
    />
  );
};

export default GoogleMap;
