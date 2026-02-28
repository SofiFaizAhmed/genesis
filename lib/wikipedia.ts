/**
 * Wikipedia API Helper Functions
 * 
 * Provides functions to search Wikipedia and fetch page content
 * using the Wikipedia REST API.
 */

export interface WikipediaSearchResult {
  title: string;
  pageid: number;
  snippet: string;
}

export interface WikipediaPageContent {
  title: string;
  extract: string;
  url: string;
}

/**
 * Search Wikipedia for pages matching the query
 * @param query - The search query
 * @param limit - Maximum number of results to return (default: 5)
 * @returns Array of search results
 */
export async function searchWikipedia(
  query: string,
  limit: number = 5
): Promise<WikipediaSearchResult[]> {
  try {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
      origin: "*",
      srlimit: limit.toString(),
    });

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?${params}`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.query?.search || [];
  } catch (error) {
    console.error("Error searching Wikipedia:", error);
    throw new Error("Failed to search Wikipedia");
  }
}

/**
 * Fetch the content of a Wikipedia page by page ID
 * @param pageId - The Wikipedia page ID
 * @returns Page content including title, extract, and URL
 */
export async function fetchWikipediaPage(
  pageId: number
): Promise<WikipediaPageContent> {
  try {
    const params = new URLSearchParams({
      action: "query",
      prop: "extracts|info",
      exintro: "1",
      explaintext: "1",
      inprop: "url",
      format: "json",
      origin: "*",
      pageids: pageId.toString(),
    });

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?${params}`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia fetch failed: ${response.statusText}`);
    }

    const data = await response.json();
    const page = data.query?.pages?.[pageId];

    if (!page) {
      throw new Error("Page not found");
    }

    return {
      title: page.title,
      extract: page.extract || "",
      url: page.fullurl || `https://en.wikipedia.org/?curid=${pageId}`,
    };
  } catch (error) {
    console.error("Error fetching Wikipedia page:", error);
    throw new Error("Failed to fetch Wikipedia page");
  }
}

/**
 * Fetch multiple Wikipedia pages by their IDs
 * @param pageIds - Array of Wikipedia page IDs
 * @returns Array of page contents
 */
export async function fetchMultipleWikipediaPages(
  pageIds: number[]
): Promise<WikipediaPageContent[]> {
  const pagePromises = pageIds.map((id) => fetchWikipediaPage(id));
  const results = await Promise.allSettled(pagePromises);

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<WikipediaPageContent>).value);
}
