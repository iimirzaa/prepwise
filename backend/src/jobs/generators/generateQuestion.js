
import { groq } from "../../config/groq.js";
const generateQuestion=async(prompt)=>{
    try{
      const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });
     const raw = completion.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();
  

    const mcqs = JSON.parse(raw);
    return mcqs;

    }catch(err){
        throw err;
    }


}
export default generateQuestion;