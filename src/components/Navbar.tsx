import { ArrowLeft } from "lucide-react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";
import { Layout } from "~/components/custom/layout";
import { UserNav } from "~/components/custom/UserNav";
import { ThemeToggle } from "~/components/ThemToggle";
import { Button } from "~/components/ui/button";
import { NavSearch } from "./NavSearch";

export const NavBar = ({
  children,
  router,
  isBackButton = false,
}: {
  children: React.ReactNode;
  router?: AppRouterInstance;
  isBackButton?: boolean;
}) => {
  return (
    <Layout>
      <Layout.Header sticky>
        <div className="flex items-center">
          <NavSearch />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="mb-2 flex items-center space-y-2">
          {isBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router?.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="-mx-6 flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {children}
        </div>
      </Layout.Body>
    </Layout>
  );
};
