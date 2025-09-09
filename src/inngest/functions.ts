import { inngest } from "./client";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Define Groq LLM prompt and system message
    const prompt = `create the components for the following: ${event.data.value}`;
    const system_message = "You are an expert in coding in nextjs ";

    // Run completion call (ChatCompletion for Groq SDK)
    const { choices } = await groq.chat.completions.create({
      messages: [
        { role: "system", content: system_message },
        { role: "user", content: prompt }
      ],
      model: "openai/gpt-oss-20b" // Update with Groq model of choice
    });

    const output = choices?.[0].message?.content || "";
    console.log(output);
    return { output };
  }
);
