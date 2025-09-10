interface BackgroundImageWrapperProps {
  image: string;
  children: React.ReactNode;
}

const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({ image, children }) => (
  <div className="relative w-full overflow-hidden p-6">
    <img src={image} alt="Background" className="w-full h-full object-cover rounded-lg"/>
    <div className="absolute top-0 left-0 w-full h-full flex justify-end items-center p-4 md:p-12">
      {children}
    </div>
  </div>
);

export default BackgroundImageWrapper