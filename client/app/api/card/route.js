import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "public/mock/mockUsers.json");

export async function GET() {
  try {
    const cards = await fsPromises.readFile(usersFilePath, "utf-8");
    const json = JSON.parse(cards);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No users found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}
