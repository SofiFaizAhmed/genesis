/**
 * SourceLinks Component
 * 
 * Displays clickable Wikipedia source links
 */

interface SourceLinksProps {
  sources: string[];
}

export default function SourceLinks({ sources }: SourceLinksProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-2 font-semibold">Sources:</p>
      <div className="flex flex-col gap-1">
        {sources.map((url, index) => {
          // Extract page title from URL with error handling
          let title = `Wikipedia Page ${index + 1}`;
          try {
            const urlObj = new URL(url);
            if (urlObj.searchParams.get("curid")) {
              title = `Wikipedia Page ${index + 1}`;
            } else {
              const pathTitle = urlObj.pathname.split("/wiki/")[1];
              if (pathTitle) {
                title = decodeURIComponent(pathTitle).replace(/_/g, " ");
              }
            }
          } catch (error) {
            console.error("Error parsing URL:", error);
          }

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="truncate">{title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
