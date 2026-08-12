"use server";

import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const login = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!login || !password) {
    return { success: false, message: "Vui lòng nhập đầy đủ thông tin." };
  }

  // TODO: gọi trực tiếp Auth Service hoặc xây session flow hoàn chỉnh.
  redirect("/dashboard");
}
