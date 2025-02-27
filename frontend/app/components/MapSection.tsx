"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface HourData {
  id: number;
  Day: string;  
  Open: string; 
  Close: string; 
}

const convertTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes.slice(0,2)} ${ampm}`;
};

const MapAndContact = ({ hours }: { hours?: { hours: HourData[] } }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          version: "weekly",
          mapIds: ["de23510e8f28402f"], // Replace with your Map ID
        });

        const google = await loader.load();
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

        const mapOptions: google.maps.MapOptions = {
          center: { lat: 42.9972497, lng: -88.2089108 }, // Coordinates for Forever Faded Barber Shop
          zoom: 15,
          mapId: "de23510e8f28402f",
        };

        const map = new Map(mapRef.current as HTMLElement, mapOptions);

        new AdvancedMarkerElement({
          position: { lat: 42.9972497, lng: -88.2089108 },
          map: map,
          title: "Forever Faded Barber Shop",
        });

        console.log("Map initialized successfully");
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();
  }, []);

  const formattedHours = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ].map(day => {
    const dayData = hours?.hours?.find(h => h.Day === day);
    return {
      day: day.substring(0, 3),
      hours: dayData ? `${convertTo12Hour(dayData.Open)} - ${convertTo12Hour(dayData.Close)}` : "Closed"
    };
  });

  return (
    <div className="flex flex-col md:flex-row bg-black text-white">
      <div ref={mapRef} className="w-full md:w-1/2 h-96 md:h-auto" />
      <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-gold-dark via-gold to-gold-light">
        <h2 className="text-4xl font-bold mb-6 font-urbanist">Business Hours</h2>
        <table className="w-full">
          <tbody>
            {formattedHours.map((item, index) => (
              <tr key={index} className="border-b border-white/20 last:border-b-0">
                <td className="py-3 font-urbanist font-semibold">{item.day}</td>
                <td className="py-3 text-right font-roboto">{item.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MapAndContact;