import { usePathname, useRouter } from "next/navigation";

import { ThemeProvider } from "next-themes";
import { NavBar } from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import { Toaster } from "~/components/ui/toaster";
import useIsCollapsed from "~/hooks/useIsCollapsed";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {pathName.includes("auth") ? (
          children
        ) : (
          <div className="relative h-full overflow-hidden bg-background">
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={
                setIsCollapsed as React.Dispatch<React.SetStateAction<boolean>>
              }
            />
            <main
              className={`overflow-x-hidden p-6 pt-16 transition-[margin] md:overflow-y-hidden md:pt-6 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
            >
              {/* <DataProvider> */}
              <NavBar router={router}>{children}</NavBar>
              {/* </DataProvider> */}
            </main>
          </div>
        )}
      </ThemeProvider>
      <Toaster />
    </>
  );
}
