"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useLang } from "@/lib/useLang";

import {
  Compass,
  Sparkles,
  Ticket,
  Award,
  HelpCircle,
  Store,
  ChevronRight,
  X,
  Plane,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { t } from "@/lib/i18n/t";

import { useProfileStore } from "@/stores/useProfileStore";
import { CommonType, ProfileType } from "@/types";

import { MENUS } from "@/commons/constant";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useCommonStore } from "@/stores/useCommonStore";
import Image from "next/image";
import { sv_getCurrentProfile } from "@/app-controler/login/api";
import { UserPopup } from "./PopupUser";
import { HeaderMobile } from "./HeaderMobile";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const profile: ProfileType = useProfileStore((state: any) => state.profile);
  const supabase = createSupabaseBrowserClient();

  const { logout }: any = useProfileStore.getState();
  const { setGlobalLoading, setToastMessage }: CommonType | any = useCommonStore.getState();

  const displayName = profile ? profile.username : "User";
  const initials = (() => {
    const base = displayName ?? "U";
    const parts = base.trim().split(/\s+/).slice(0, 2);
    return parts.map((p: any) => p[0]?.toUpperCase()).join("");
  })();

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    supabase.auth.signOut();
    router.push("/");
  };

  const loadUser = async () => {
    try {
      setGlobalLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const user = session.user;
        const { error }: any = await sv_getCurrentProfile(user.id);
        if (error) {
          setToastMessage(error);
          return;
        }
      }
    } catch (e) {
      setToastMessage("Có lỗi xảy ra");
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-[#FFFF] backdrop-blur-md">
        <div className=" flex  items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform group-hover:scale-105">
              <a href="#" className="font-display text-2xl font-extrabold text-ocean">
                <Image alt="" src="/moonlogo.png" width={52} height={44} />
              </a>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
            {MENUS.map((item, idx) => (
              <Link
                key={idx}
                onClick={(e) => {
                  if (item.link === "/#experiences")
                    if (pathname === "/") {
                      e.preventDefault();
                      const el = document.getElementById("experiences");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                }}
                href={item.link}
                className={`relative pb-1 text-[15px] font-[600] transition-colors ${
                  item.link === pathname ? "text-[#1c5b41]" : "text-[#1c5b41] hover:text-[#fe9614]"
                }`}
              >
                {item.name}
                {item.link === pathname && (
                  <span className="absolute -bottom-[13px] left-0 right-0 h-0.5 rounded-full bg-[#fe9614]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language */}
            {/* <Languages /> */}

            {!profile.user_id ? (
              <Link href="/login">
                <User />
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2  px-2 py-1 hover:bg-muted/30"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium md:inline">{displayName}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <UserPopup profile={profile} handleLogout={handleLogout} />
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu */}
            <HeaderMobile pathname={pathname} />
          </div>
        </div>
      </header>
    </>
  );
}
