"use server";
import { redirect } from "next/navigation";
import {  findUserByCredentials } from "@/db/queries";


async function performLogin(formData) {
  const credentials = {};
  credentials.email = formData.get("email");
  credentials.password = formData.get("password");
  const found = await findUserByCredentials(credentials);

  if (found) {
    redirect("/DashboardClient");
  } else {
    throw new Error(`User with email ${formData.get("email")} not found`);
  }
}




export { performLogin };