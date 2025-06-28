import React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  
  return (
    <button
      className={`px-4 py-2 rounded-md transition-all duration-200 ${
        activeTab === value 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-slate-700'
      } ${className}`}
      onClick={() => setActiveTab(value)}
      data-state={activeTab === value ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, className, children }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};