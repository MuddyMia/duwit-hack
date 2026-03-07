#Use an AI API to get practice questions and stuff for exam study
import google.generativeai as genai
genai.configure(api_key= "AIzaSyCOwGCi_oiy4kAFyjas1xeECq-LXsji528") #uses the api key
import re

model = genai.GenerativeModel("gemini-3.1-flash-lite-preview")

def generate_question_bank(count, subject):
    #generates a question and answer based on a prompt
    response = model.generate_content(f"Generate 10 flashcards about {subject} Format them EXACTLY like this:" \
                                    "Q: <question>" \
                                    "A: <answer>")
    print(response.text) #for debugging

    parts = re.split(r"(Q:|A:)",response.text) #separates up response.text

    print(parts)

    #store all the questions in the list QUESTIONS and all the answers in the list ANSWERS
    QUESTIONS = []
    ANSWERS = []

    i=1
    while i < len(parts):
        if parts[i] == "Q:":
            QUESTIONS.append(parts[i+1])
        else:
            ANSWERS.append(parts[i+1])
        i+=2

    print(QUESTIONS)
    print(ANSWERS)

    flashcards = {
        "name": subject,
        "id": count,
        "questions": QUESTIONS,
        "answers": ANSWERS
    }

    return flashcards

    #write to json file
    import json
    file_name = "flashcards_"+subject

    file = open(file_name+".json", "w")
    json.dump(flashcards,file,indent=4)
    file.close()


#generate_question_bank("propositional logic")

def generate_question_banks(topic):
    #generates a list of subtopics
    response = model.generate_content(f"Generate 10 subtopics in this university level computer science {topic} Format them EXACTLY like this:" \
                                    "T: <topic1>" \
                                    "T: <topic2>"
                                    )
    parts = response.text.split("T:") #separates up response.text
    
    print(parts)

    i=1
    subjects = []
    while i < len(parts):
       subjects.append(parts[i].strip()) #appends the subtopics to the list subjects (stip makes sure the format is valid)
       i+=1
    count = 0

    topic_flashcards = []

    for subject in subjects:
        topic_flashcards.append(generate_question_bank(count,subject)) #generates a bank of flashcards for that subtopic
        count += 1

    print(topic_flashcards) #for debugging

    topic_dict = {
        topic: topic_flashcards
    }

    print(topic_dict) #for debugging

    #write to json file
    import json
    file_name = "flashcards_"+topic

    file = open(file_name+".json", "w")
    json.dump(topic_dict,file,indent=4)
    file.close()

#big test
topics = ["logic","algorithms and data structures","calculus","linear algebra"]
for topic in topics:
    generate_question_banks(topic)