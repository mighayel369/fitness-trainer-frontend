import { PiLineVerticalThin } from "react-icons/pi";


const LogoHeader: React.FC = () => (
  <div className="flex items-center justify-center mb-6 text-black">
    <span className="text-6xl font-bold">e</span>
    <PiLineVerticalThin className="text-4xl mt-5 mx-2" />
    <div className="mt-4 text-left">
      <span className="tracking-wider font-semibold">FITCONNECT</span>
      <p className="text-xs mt-1 text-gray-500 font-medium tracking-wider">
        Gym Management
      </p>
    </div>
  </div>
);

export default LogoHeader;