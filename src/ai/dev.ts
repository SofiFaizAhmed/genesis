import { config } from 'dotenv';
config();

import '@genkit-ai/google-genai';
import { answerQuestionWithWikipedia } from '@/ai/flows/answer-question-with-wikipedia';