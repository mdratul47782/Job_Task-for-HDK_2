import { dbConnect } from "@/app/service/mongo";
import HourlyReport from "@/app/models/HourlyReport";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { date, data } = body;

    if (!date || !data) {
      return NextResponse.json(
        { error: "Date and data are required" },
        { status: 400 }
      );
    }

    const report = new HourlyReport({ date, data });
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
