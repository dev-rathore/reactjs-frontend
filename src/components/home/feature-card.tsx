interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
}

const FeatureCard = ({
  title,
  icon
}: FeatureCardProps) => {
  return (
    <div className="w-full sm:w-[240px] flex flex-col justify-center items-center border border-gray-200 p-6 gap-4 rounded-lg shadow-md hover:border-primary hover:text-white hover:bg-primary">
      {icon}
      <p className="text-lg">
        {title}
      </p>
    </div>
  );
}

export default FeatureCard;
