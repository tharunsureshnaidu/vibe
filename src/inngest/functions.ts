import { inngest } from "./client";
import Groq from "groq-sdk";
import {Sandbox} from "@e2b/code-interpreter"
import { getSandbox } from "./utils";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Define Groq LLM prompt and system message
    const sandboxId=await step.run("get-sandbox-id",async ()=>{
      const sandbox = await Sandbox.create("vibe-test-next3");
      return sandbox.sandboxId
    })
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

    const sandboxurl= await step.run("get-sandbox-url",async ()=>{
      const sandbox=await getSandbox(sandboxId)
      const host=sandbox.getHost(3000)
      return `https://${host}`
    })
    console.log(output);
    return { output ,sandboxurl};
  }
);
