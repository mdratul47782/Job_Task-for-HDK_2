import { dbConnect } from "@/app/service/mongo";
import FloorReport from "@/app/models/FloorReport";
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

    const report = new FloorReport({ date, data });
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

// 🔹 PATCH — update existing floor report
export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { date, data } = body;

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const updated = await FloorReport.findOneAndUpdate(
      { date },
      { data, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "No record found for this date" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Updated successfully", updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
