"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ACC_STATUS, ROLES } from "@/commons/constant";
import { ProfileStoteType, useProfileStore } from "@/stores/useProfileStore";
import ForgotPassword from "@/components/site/ForgotPassword";
import { sv_Login } from "./api";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import EyeIcon from "@/components/ui/eye-icon";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPass, setOpenForgotpass] = useState(false);
  const { setErrorMessage }: any = useProfileStore.getState();

  const { profile, errorMessage, isLogin }: ProfileStoteType = useProfileStore(
    (state: any) => state
  );

  const handleAfterLogin = () => {
    if (profile.role === ROLES.ADMIN) {
      router.push("/admin");
    } else if (profile.status === ACC_STATUS.APPROVED) {
      router.push("/affiliate");
    }
  };

  useEffect(() => {
    if (profile.role) {
      handleAfterLogin();
    }
  }, [profile]);

  const signIn = async () => {
    sv_Login({
      email,
      password,
    });
  };

  const closeDialog = (value: boolean) => {
    setOpenForgotpass(value);
  };
  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b1020] px-4 py-10 text-neutral-100 antialiased [background-image:radial-gradient(circle_at_50%_-5%,rgba(250,204,21,0.35)_0%,rgba(250,204,21,0.1)_30%,transparent_60%),radial-gradient(rgba(253,230,138,0.35)_1px,transparent_1px)] [background-size:100%_100%,28px_28px] before:pointer-events-none before:absolute before:left-1/2 before:top-8 before:-z-10 before:h-24 before:w-24 before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_35%_35%,#fffbeb,#fde68a_55%,#facc15)] before:shadow-[0_0_100px_40px_rgba(250,204,21,0.4)] before:content-['']">
      {/* Card */}
      <section className="w-full max-w-[380px] rounded-2xl border border-neutral-200 bg-white px-6 pb-6 pt-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center text-center my-4">
          <Image
            src="/moonlogo.png"
            alt="Moon Price"
            width={48}
            height={48}
            className="object-contain mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <h1 className="mt-4 text-[17px] font-semibold tracking-tight text-slate-900">
            Chào mừng trở lại
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-semibold tracking-tight text-slate-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 tracking-tight text-slate-900"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[11px] font-semibold tracking-tight text-slate-900"
              >
                Mật khẩu
              </label>
              {/* <p
                className="text-[11px] font-semibold underline underline-offset-2 hover:text-neutral-600  cursor-pointer"
                onClick={() => setOpenForgotpass(true)}
              >
                Quên mật khẩu?
              </p> */}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-3 pr-10 text-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 tracking-tight text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-500 hover:text-neutral-900"
              >
                <EyeIcon off={showPassword} className="h-4 w-4" />
              </button>
            </div>
          </div>
          {errorMessage ? <p className="text-sm text-destructive  mt-4">{errorMessage}</p> : null}
          <button
            disabled={isLogin}
            onClick={signIn}
            type="submit"
            className="h-10 w-full rounded-lg bg-[#61a05e] text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            {isLogin ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <Link href="/">
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 hover:text-neutral-600">
            <ArrowLeftIcon size={14} /> Trang chủ
          </div>
        </Link>
      </section>

      {/* Footer */}
      <p className="mt-5 text-xs text-neutral-600 text-[#ffcb00]">
        Chưa có tài khoản?{" "}
        <Link
          href="/dai-ly"
          className="font-semibold  underline-offset-2 text-[#ffff] hover:underline "
        >
          Đăng kí đại lý
        </Link>
      </p>

      {openForgotPass && <ForgotPassword openForgotPass={openForgotPass} setOpen={closeDialog} />}
    </main>
  );
}
