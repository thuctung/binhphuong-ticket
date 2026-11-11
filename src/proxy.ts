import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";

import i18nConfig from "../i18nConfig";
import { createSupabaseServerClient } from "./lib/supabase/server-ssr";
import { DB_TABLE_NAME } from "./commons/constant";

const isUnder = (path: string, base: string) => path === base || path.startsWith(`${base}/`);

export async function proxy(req: NextRequest) {
  // 1.Handle i18 first
  const res = i18nRouter(req, i18nConfig);

  // Nếu i18n yêu cầu redirect (vd: "/" -> "/vi") thì trả về luôn
  if (res.headers.get("location")) return res;

  // 2. Tách locale khỏi pathname
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const hasLocale = i18nConfig.locales.includes(segments[1]);
  const locale = hasLocale ? segments[1] : i18nConfig.defaultLocale;
  const path = hasLocale ? "/" + segments.slice(2).join("/") : pathname;

  const isAdminPath = isUnder(path, "/admin");
  const isAffiliatePath = isUnder(path, "/affiliate");

  // Route không cần bảo vệ thì bỏ qua, không gọi Supabase
  if (!isAdminPath && !isAffiliatePath) return res;

  // 3. Kiểm tra auth + role
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  const { data: profile } = await supabase
    .from(DB_TABLE_NAME.PROFILES)
    .select("role")
    .eq("user_id", user.id)
    .single();

  const role = profile?.role;

  if (role === "admin" && isAffiliatePath) {
    return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
  }

  if (role === "affiliate" && isAdminPath) {
    return NextResponse.redirect(new URL(`/${locale}/affiliate`, req.url));
  }

  return res;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
