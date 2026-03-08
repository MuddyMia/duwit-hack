# University Questions Accelerate **UQA**

### Problem to solve
A lot of people may know of revision apps. There are lot's of them for GCSEs and even A levels, but there's nothing for university!  
There's a very valid reason for this, university courses are just too diverse. 
There's no standards like exam boards to mass generate revision content. 
And we can't train ai off of university content for it due to copyright.

### Solution
We decided to generate questions topic-wise rather than course-wise. 
We gave the gemini api topic prompts, and it gave us subtopics, practice questions and answers.
Storing those in JSON files, we were able to implement uni-level revision flashcards.

### Product
We developed a web revision app to accelerate the adaptation and understanding of uni students.  
It has a makeshift database of topics and questions. The user can navigate between topics and save them to their library.
From the library, they can select specific sub topics to learn using our _extremely styled_ flashcards.  
Oh, and it has a super cool car animation.

### Future additions
- user system
- neaten it all up
- different learning modes
  - multiple choice questions
  - short answer questions
- more diverse topics
  - install custom topics
- statistics
- memorisation/learning algorithms

### Issues
- we'd never used an exterior api, let alone an ai api. One of us had never even coded in javascript.
- Windows. (nothing else needs to be said)
- spelling mistakes...
- the will to live
