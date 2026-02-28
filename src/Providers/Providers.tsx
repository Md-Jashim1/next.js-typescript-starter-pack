"use client";

import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
// import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import MyContextProvider from "@/lib/MyContextProvider";
import SessionProviderForNextAuth from "@/nextAuth/SessionProviderForNextAuth";
import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyContextProvider>
      <SessionProviderForNextAuth>
        <UserProvider>
          <ReduxStoreProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ReduxStoreProvider>
        </UserProvider>
      </SessionProviderForNextAuth>
    </MyContextProvider>
  );
};

export default Providers;
