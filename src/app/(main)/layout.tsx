import MobileHeader from "@/components/mobile-header";
import MobileSideBar from "@/components/mobile-side-bar";
import SideBar from "@/components/side-bar-wrapper";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileHeader />
      <SideBar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    </>
  );
}
