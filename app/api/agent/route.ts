/**
 * Agent API Route
 * 
 * Handles POST requests with user questions and returns AI-generated answers
 * with Wikipedia sources.
 */

import { NextRequest, NextResponse } from "next/server";
import { processQuestion } from "@/lib/agent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    // Validate input
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a valid question." },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      );
    }

    // Process the question
    const response = await processQuestion(question);

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    
    // Return user-friendly error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred. Please try again.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
