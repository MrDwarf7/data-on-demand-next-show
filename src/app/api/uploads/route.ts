import { type NextRequest, NextResponse } from "next/server";
import { uploadFiles } from "@/actions/upload";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const result = await uploadFiles(formData);

		if (!result.success) {
			return NextResponse.json({ success: false, errors: result.errors }, { status: 400 });
		}

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error("[API/UPLOAD] Error:", error);
		return NextResponse.json(
			{ success: false, errors: { general: ["Internal server error"] } },
			{ status: 500 }
		);
	}
}
