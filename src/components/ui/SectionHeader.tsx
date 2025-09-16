import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return (
    <div>
      <div className="md:hidden flex flex-col gap-8 py-12">
        <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600" />
        <h1 className="text-4xl md:text-6xl font-bold text-center whitespace-nowrap">
          {children}
        </h1>
        <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600" />
      </div>
      <div className="hidden md:flex items-center justify-center gap-10 mb-14 md:mb-28">
        <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600 mx-4" />
        <h1 className="text-4xl md:text-6xl font-bold text-center whitespace-nowrap">
          {children}
        </h1>
        <div className="flex-grow border-t-4 border-gray-300 dark:border-gray-600 mx-4" />
      </div>
    </div>
  );
};

export default SectionHeader;
