# WikiAgent

WikiAgent is an AI-powered web app built with Next.js & TypeScript that answers factual questions by searching and summarizing Wikipedia. It uses an LLM agent with chain-of-thought reasoning to deliver accurate, sourced answers with Wikipedia links — all through a clean, scrollable chat interface.

## Features

- 🤖 **AI-Powered Answers**: Uses OpenAI GPT to generate factual answers
- 📚 **Wikipedia Integration**: Searches and extracts content from Wikipedia
- 🧠 **Chain-of-Thought Reasoning**: Agent decides what to search based on your question
- 🔗 **Source Citations**: Every answer includes clickable Wikipedia source links
- 💬 **Clean Chat Interface**: Scrollable conversation history with loading states
- ⚡ **Built with Next.js 14**: Modern App Router architecture with TypeScript

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **OpenAI SDK** for LLM calls
- **Wikipedia REST API** for search and content

## Project Structure

```
genesis/
├── app/
│   ├── api/
│   │   └── agent/
│   │       └── route.ts        # Agent API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main chat UI
├── components/
│   ├── ChatMessage.tsx         # Message bubble component
│   └── SourceLinks.tsx         # Wikipedia source links
├── lib/
│   ├── agent.ts                # Chain-of-thought agent logic
│   └── wikipedia.ts            # Wikipedia API helpers
└── .env.example                # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SofiFaizAhmed/genesis.git
cd genesis
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_api_key_here
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Start asking questions! Try:
   - "What is quantum computing?"
   - "Who was Albert Einstein?"
   - "How does photosynthesis work?"

### Building for Production

```bash
npm run build
npm start
```

## How It Works

1. **User Input**: You type a factual question in the chat interface
2. **Query Generation**: The AI agent analyzes your question and generates an optimal Wikipedia search query
3. **Wikipedia Search**: The agent searches Wikipedia and retrieves the top 3 relevant pages
4. **Content Extraction**: Full content is fetched from the selected Wikipedia pages
5. **Answer Generation**: OpenAI GPT synthesizes the information into a concise, factual answer
6. **Display Results**: The answer is displayed with clickable Wikipedia source links

## API Routes

### POST /api/agent

Processes a user question and returns an AI-generated answer with sources.

**Request Body:**
```json
{
  "question": "What is quantum computing?"
}
```

**Response:**
```json
{
  "answer": "Quantum computing is a type of computation that...",
  "sources": [
    "https://en.wikipedia.org/wiki/Quantum_computing",
    "https://en.wikipedia.org/wiki/Qubit"
  ],
  "reasoning": "I analyzed your question and decided to search Wikipedia for: \"quantum computing\""
}
```

## Error Handling

The application gracefully handles:
- Missing or invalid API keys
- Wikipedia API failures
- OpenAI API errors
- Network issues
- Invalid user input

All errors are displayed as user-friendly messages in the chat interface.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
