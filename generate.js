// generateQuestions.js
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");
const hf = process.env.HUGGING_FACE_TOKEN;
const client = new HfInference(hf);

async function generateQuestions(req) {
  const { mood } = req.body;

  if (!mood) {
    throw new Error("Mood is required");
  }

  try {
    const chatCompletion = await client.chatCompletion({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages: [
        {
          role: "system",
          content: `You are a meditation expert and emotional well-being coach. Generate 4 questions about emotional well-being, following this example format:

Here's an example (DO NOT use these exact questions, create new ones based on the user's mood):

1. How often do you practice mindfulness meditation?
a) Daily, as part of my routine
b) A few times per week when I remember
c) Only when I feel stressed
d) I haven't tried meditation yet

2. What activities help you feel grounded?
a) Spending time in nature
b) Physical exercise
c) Creative activities
d) Connecting with friends

[Generate 2 more example questions following this format]`,
        },
        {
          role: "user",
          content: `The user is feeling ${mood}. Create 4 empathetic questions that will help understand the source of their ${mood} feelings. Each question should have 4 specific, relevant answer choices. Focus on actionable insights and emotional well-being.`,
        },
      ],
      max_tokens: 800,
      temperature: 0.8,
    });

    const rawQuestions = chatCompletion.choices[0].message.content;
    const questions = [];
    const lines = rawQuestions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let currentQuestion = null;
    let currentOptions = [];

    for (const line of lines) {
      if (/^\d+\./.test(line)) {
        if (currentQuestion && currentOptions.length > 0) {
          questions.push({
            question: currentQuestion,
            options: [...currentOptions],
          });
          currentOptions = [];
        }
        currentQuestion = line.replace(/^\d+\.\s*/, "");
      } else if (/^[a-d]\)/.test(line)) {
        const option = line.replace(/^[a-d]\)\s*/, "");
        currentOptions.push(option);
      }
    }

    if (currentQuestion && currentOptions.length > 0) {
      questions.push({
        question: currentQuestion,
        options: [...currentOptions],
      });
    }

    const formattedQuestions = questions
      .map((q) => ({
        question: q.question,
        options:
          q.options.length === 4
            ? q.options
            : [
                ...q.options,
                ...Array(4 - q.options.length).fill("No response"),
              ].slice(0, 4),
      }))
      .slice(0, 4);

    while (formattedQuestions.length < 4) {
      formattedQuestions.push({
        question: `What aspects of your ${mood} feelings would you like to explore further?`,
        options: [
          "Physical sensations",
          "Emotional triggers",
          "Thought patterns",
          "Environmental factors",
        ],
      });
    }

    return formattedQuestions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}

// generateActivities.js
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

async function generateActivities(req) {
  const { mood, answers } = req.body;

  if (!mood || !answers || answers.length !== 4) {
    throw new Error("Mood and all answers are required");
  }

  try {
    const chatCompletion = await client.chatCompletion({
      model: "microsoft/Phi-3-mini-4k-instruct",
      messages: [
        {
          role: "system",
          content: `You are a meditation expert and emotional well-being coach. Generate 4 activities in this exact format:

Example format (DO NOT use these exact activities, create new personalized ones):

1. Title: Mindful Breathing
Description: Practice deep belly breathing for 5 minutes in a quiet space

2. Title: Gratitude Journaling
Description: Write down three things you're grateful for today

3. Title: Nature Connection
Description: Spend 10 minutes observing nature from your window or garden

4. Title: Body Scan Meditation
Description: Lie down and progressively relax each part of your body`,
        },
        {
          role: "user",
          content: `Based on the user's mood (${mood}) and their answers:
${answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}

Generate 4 specific, personalized activities for mental wellness and emotional balance. Each activity should have a clear, concise title and a specific, actionable description. Focus on practical, achievable activities that address their current emotional state.`,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const rawActivities = chatCompletion.choices[0].message.content;
    const activityRegex =
      /\d+\.\s*Title:\s*(.*?)\s*Description:\s*(.*?)(?=(?:\d+\.|$))/gs;
    const matches = [...rawActivities.matchAll(activityRegex)];

    const activities = matches.map((match) => ({
      title: match[1].trim(),
      description: match[2].trim(),
      icon: getEmojiForActivity(match[1]),
    }));

    const defaultActivities = [
      {
        title: "Mindful Breathing",
        description:
          "Take 10 deep, conscious breaths while focusing on the present moment",
        icon: "🌬️",
      },
      {
        title: "Quick Meditation",
        description: "Find a quiet space for a 5-minute meditation session",
        icon: "🧘",
      },
      {
        title: "Gratitude Practice",
        description: "Write down three things you're grateful for right now",
        icon: "📓",
      },
      {
        title: "Gentle Movement",
        description: "Do some light stretching or take a short walk",
        icon: "🚶",
      },
    ];

    const finalActivities = [
      ...activities,
      ...defaultActivities.slice(0, Math.max(0, 4 - activities.length)),
    ].slice(0, 4);

    return finalActivities;
  } catch (error) {
    console.error("Error generating activities:", error);
    throw error;
  }
}

module.exports = { generateQuestions, generateActivities };
