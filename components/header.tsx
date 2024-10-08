import { HeaderLogo } from "@/components/headerlogo";
import Navigation from "@/components/navigation";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "@/components/welcome-msg";
import { Filters } from "@/components/filters/filters";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-700 px-4 lg:px-14 py-8 pb-36">
        <div className="max-w-screen-2xl mx-auto">
            <div className="w-full flex items-center justify-between mb-14">
                <div className="lg:flex items-center gap-x-32 lg:gap-x-16">
                    <HeaderLogo/>
                    <Navigation/>
                </div>
                <ClerkLoaded>
                <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="size-8 animate-spin text-slate-400"/>
                </ClerkLoading>
            </div>
            <WelcomeMsg/>
            <Filters/>
        </div>
    </header>
  );
};
 