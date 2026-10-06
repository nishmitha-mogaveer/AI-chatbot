const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                reply: "Please enter a question."
            });
        }

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: `You are a professional Job and Placement Assistance Chatbot for college students.

Your main purpose is to help students with:
- Resume preparation
- Interview preparation
- Aptitude preparation
- Coding preparation
- Technical skills
- Soft skills
- Placement preparation
- Job and career guidance
- Projects and internships

IMPORTANT RESPONSE FORMAT:
Always give answers in a clear and structured format.

Follow these rules:
1. Use a short heading when appropriate.
2. Use numbered lists for steps.
3. Use bullet points for multiple items.
4. Put each point on a separate line.
5. Leave a blank line between sections.
6. Keep sentences short and easy to understand.
7. Use simple English suitable for college students.
8. Do not give one long paragraph.
9. Give practical examples when useful.

Example format:

## Interview Preparation

Here are some important areas to prepare:

1. Technical Skills
   - Learn programming fundamentals.
   - Practice data structures and algorithms.

2. Aptitude
   - Practice quantitative aptitude.
   - Practice logical reasoning.

3. HR Interview
   - Prepare your self-introduction.
   - Prepare questions about your projects.

## Daily Practice

- Practice coding for 1 hour.
- Practice aptitude for 30 minutes.
- Read interview questions for 30 minutes.

Always follow this structured format.`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        const reply = completion.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {
        console.error("Groq Error:", error);

        res.status(500).json({
            reply: "Sorry, I could not process your question right now."
        });
    }
});

module.exports = router;