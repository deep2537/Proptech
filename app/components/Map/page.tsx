// pages/map.tsx or your relevant page file
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('../Map/MapComponent'), { ssr: false });

const Page: React.FC = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default Page;

