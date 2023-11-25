import Sidebar from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full pt-2 md:pt-4 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
