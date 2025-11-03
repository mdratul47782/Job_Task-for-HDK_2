import FobReport from "@/app/models/FobReport";

import { dbConnect } from "@/app/service/mongo";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { date, monthlyUptoFOB, yearlyUptoFOB, runday } = body;

    if (!date || !monthlyUptoFOB || !yearlyUptoFOB || !runday) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const report = new FobReport({
      date,
      monthlyUptoFOB,
      yearlyUptoFOB,
      runday,
    });

    await report.save();

    return NextResponse.json(
      { message: "Saved successfully", report },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
