#Use an AI API to get practice questions and stuff for exam study
import google.generativeai as genai
genai.configure(api_key= "AIzaSyAoAB5RSPQU-VPwLgbKsELGIG9H0oLv31A")

model = genai.GenerativeModel("gemini-3.1-flash-lite-preview")

response = model.generate_content("Generate 3 computer science logic questions about natural deduction.")
print(response.text)

