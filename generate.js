// generateQuestions.js and generateActivities.js combined
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");
const hf = process.env.HUGGING_FACE_TOKEN;
const client = new HfInference(hf);

const activityEmojis = {
  meditation: "🧘",
  breathe: "🌬️",
  breathing: "🌬️",
  nature: "🌳",
  walk: "🚶",
  journal: "📓",
  write: "✍️",
  yoga: "🧘‍♀️",
  exercise: "💪",
  music: "🎵",
  read: "📚",
  sleep: "😴",
  tea: "🍵",
  art: "🎨",
  paint: "🎨",
  draw: "✏️",
  garden: "🌱",
  cook: "👩‍🍳",
  bath: "🛁",
  stretch: "🤸",
  default: "💫",
};

function getEmojiForActivity(title) {
  const lowercaseTitle = title.toLowerCase();
  const emoji = Object.entries(activityEmojis).find(([keyword]) =>
    lowercaseTitle.includes(keyword)
  )?.[1];
  return emoji || activityEmojis.default;
}

async function generateQuestions(req) {
  const { mood } = req.body;

  if (!mood) {
    throw new Error("Mood is required");
  }

  try {
    const systemPrompt = `You are generating a set of 4 emotional well-being assessment questions specifically tailored for someone feeling ${mood}. Each question must have exactly 4 options labeled a) through d).

Required question themes:
1. Current emotional state and awareness
2. Coping mechanisms and stress management
3. Support systems and connections
4. Self-care practices

Format each question exactly like this:
1. [Question text here?]
a) [First option]
b) [Second option]
c) [Third option]
d) [Fourth option]

Ensure each question:
- Is relevant to the user's current mood (${mood})
- Has progressive answer choices (most active/helpful to least)
- Uses clear, accessible language
- Provides actionable insights
- Avoids clinical terminology
- Maintains a supportive tone`;

    const chatCompletion = await client.chatCompletion({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create 4 empathetic questions for someone feeling ${mood}. Each question must have exactly 4 options (a through d). Focus on understanding their emotional state and potential support needs.`,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const rawQuestions = chatCompletion.choices[0].message.content;
    const questionRegex =
      /\d+\.\s*(.*?)\s*\n\s*a\)\s*(.*?)\s*\n\s*b\)\s*(.*?)\s*\n\s*c\)\s*(.*?)\s*\n\s*d\)\s*(.*?)(?=(?:\n\d+\.|\n*$))/gs;
    const matches = [...rawQuestions.matchAll(questionRegex)];

    if (matches.length < 4) {
      throw new Error("Failed to generate enough valid questions");
    }

    return matches.slice(0, 4).map((match) => ({
      question: match[1].trim(),
      options: [match[2], match[3], match[4], match[5]].map((opt) =>
        opt.trim()
      ),
    }));
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions. Please try again.");
  }
}

async function generateActivities(req) {
  const { mood, answers } = req.body;

  if (!mood || !answers || answers.length !== 4) {
    throw new Error("Mood and all answers are required");
  }

  try {
    const systemPrompt = `Generate 4 specific therapeutic activities for someone feeling ${mood}. The activities should address:

1. Meditation/mindfulness (first activity)
2. Creative expression (second activity)
3. Music/sound therapy (third activity)
4. Physical movement (fourth activity)

Format each activity exactly like this:
1. Title: [Activity name]
Description: [One clear, actionable sentence]

Requirements:
- Each activity must be unique
- Include specific duration (5-20 minutes)
- Be immediately actionable
- Require minimal or no special equipment
- Be appropriate for the user's current mood (${mood})
- Consider their questionnaire responses:
${answers
  .map((answer, index) => `Question ${index + 1}: ${answer}`)
  .join("\n")}`;

    const chatCompletion = await client.chatCompletion({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const rawActivities = chatCompletion.choices[0].message.content;
    const activityRegex =
      /\d+\.\s*Title:\s*(.*?)\s*Description:\s*(.*?)(?=(?:\d+\.|$))/gs;
    const matches = [...rawActivities.matchAll(activityRegex)];

    if (matches.length < 4) {
      throw new Error("Failed to generate enough valid activities");
    }

    return matches.slice(0, 4).map((match) => ({
      title: match[1].trim(),
      description: match[2].trim(),
      icon: getEmojiForActivity(match[1]),
    }));
  } catch (error) {
    console.error("Error generating activities:", error);
    throw new Error("Failed to generate activities. Please try again.");
  }
}

module.exports = { generateQuestions, generateActivities };
