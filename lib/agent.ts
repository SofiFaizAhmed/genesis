/**
 * Chain-of-Thought Agent Logic
 * 
 * Implements an AI agent that uses chain-of-thought reasoning
 * to answer questions using Wikipedia and OpenAI GPT.
 */

import OpenAI from "openai";
import {
  searchWikipedia,
  fetchMultipleWikipediaPages,
  WikipediaPageContent,
} from "./wikipedia";

export interface AgentResponse {
  answer: string;
  sources: string[];
  reasoning: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a search query based on the user's question
 * @param question - The user's question
 * @returns A Wikipedia search query
 */
async function generateSearchQuery(question: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates Wikipedia search queries. Given a question, extract the key topics or entities that should be searched on Wikipedia. Return only the search query, nothing else.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nGenerate a Wikipedia search query:`,
      },
    ],
    temperature: 0.3,
    max_tokens: 50,
  });

  return completion.choices[0]?.message?.content?.trim() || question;
}

/**
 * Generate an answer based on Wikipedia content and the user's question
 * @param question - The user's question
 * @param wikiContent - Array of Wikipedia page contents
 * @returns The generated answer
 */
async function generateAnswer(
  question: string,
  wikiContent: WikipediaPageContent[]
): Promise<string> {
  const contextText = wikiContent
    .map((page) => `Source: ${page.title}\n${page.extract}`)
    .join("\n\n---\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that answers questions based on Wikipedia content. Provide accurate, factual answers using only the information provided. If the information is insufficient, say so. Keep your answer concise but informative.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nWikipedia Content:\n${contextText}\n\nAnswer the question based on the above Wikipedia content:`,
      },
    ],
    temperature: 0.5,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content?.trim() || "I couldn't generate an answer.";
}

/**
 * Main agent function that processes a question and returns an answer with sources
 * @param question - The user's question
 * @returns Agent response with answer, sources, and reasoning
 */
export async function processQuestion(question: string): Promise<AgentResponse> {
  try {
    // Step 1: Chain-of-thought reasoning - Generate a Wikipedia search query
    console.log("Step 1: Generating search query...");
    const searchQuery = await generateSearchQuery(question);
    console.log("Search query:", searchQuery);

    const reasoning = `I analyzed your question and decided to search Wikipedia for: "${searchQuery}"`;

    // Step 2: Search Wikipedia for relevant pages
    console.log("Step 2: Searching Wikipedia...");
    const searchResults = await searchWikipedia(searchQuery, 3);

    if (searchResults.length === 0) {
      return {
        answer: "I couldn't find any relevant information on Wikipedia for your question. Please try rephrasing or asking something else.",
        sources: [],
        reasoning,
      };
    }

    // Step 3: Fetch content from top results
    console.log("Step 3: Fetching page content...");
    const pageIds = searchResults.map((result) => result.pageid);
    const wikiPages = await fetchMultipleWikipediaPages(pageIds);

    if (wikiPages.length === 0) {
      return {
        answer: "I found relevant pages but couldn't retrieve their content. Please try again.",
        sources: [],
        reasoning,
      };
    }

    // Step 4: Generate answer using LLM
    console.log("Step 4: Generating answer...");
    const answer = await generateAnswer(question, wikiPages);

    // Step 5: Return answer with sources
    const sources = wikiPages.map((page) => page.url);

    return {
      answer,
      sources,
      reasoning,
    };
  } catch (error) {
    console.error("Error processing question:", error);
    throw new Error("Failed to process your question. Please try again.");
  }
}
