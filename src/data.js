// ---- EDIT HERE: topics, vocabulary, interview questions ----
export const WEEKS = [
  { name: 'Week 1 – Building the Foundation', start: 1, end: 7, words: [
    ['articulate', 'to express ideas clearly', 'I want to articulate my thoughts more calmly.'],
    ['routine', 'a regular set of actions', 'My morning routine starts with a short walk.'],
    ['passionate', 'having strong enthusiasm', 'I am passionate about building small apps.']] },
  { name: 'Week 2 – Improving Fluency', start: 8, end: 14, words: [
    ['elaborate', 'to explain in more detail', 'Could you elaborate on that point?'],
    ['in my opinion', 'a phrase to share your view', 'In my opinion, practice matters more than talent.'],
    ['moreover', 'in addition; also', 'The course is practical; moreover, it is free.']] },
  { name: 'Week 3 – Confidence and Spontaneous Speaking', start: 15, end: 21, words: [
    ['spontaneous', 'done without planning', 'Her spontaneous answer impressed everyone.'],
    ['to be honest', 'a phrase to introduce a frank point', 'To be honest, I was nervous at first.'],
    ['resolve', 'to find a solution', 'We resolved the issue by splitting the tasks.']] },
  { name: 'Week 4 – Interview Preparation', start: 22, end: 30, words: [
    ['proficient', 'skilled and competent', 'I am proficient in Python and React.'],
    ['collaborate', 'to work together', 'I enjoy collaborating with my teammates.'],
    ['contribute', 'to give support or effort', 'I hope to contribute to your team from day one.']] },
]
const TITLES = ['Introduce Yourself','Describe Your Daily Routine','Talk About Your Hobbies and Interests','Describe Your Favourite Subject','Talk About Your Strengths and Weaknesses','Describe a Person Who Inspires You','Weekly Speaking Review and Self-Assessment','Speak About Your Favourite Movie or Series','Describe a Memorable Experience','Explain a Technical Concept in Simple English','Talk About Your College Life','Express Your Opinions on a Topic','Speak for Two Minutes Without Stopping','Weekly Fluency Assessment','Describe a Picture or Situation','Answer Random Questions Without Preparation','Explain a Problem and Its Solution','Participate in a Mock Group Discussion','Practise Storytelling','Speak About a Current Technology Trend','Weekly Confidence Assessment','Tell Me About Yourself','Why Should We Hire You?','What Are Your Strengths and Weaknesses?','Explain Your Favourite Project','Describe a Challenge You Faced','Why Do You Want to Join Our Company?','Handle Unexpected Interview Questions','Complete Mock Interview','Final Speaking Assessment and Reflection']
export const DAYS = TITLES.map((title, i) => {
  const n = i + 1, week = WEEKS.findIndex(w => n >= w.start && n <= w.end)
  return {
    n, title, week, vocab: WEEKS[week].words,
    reading: `Today's topic is "${title}". Read this slowly and clearly: "I will speak in short, complete sentences. I will pause at full stops and stress the important words. I do not need to be perfect today; I only need to be clearer than yesterday. When I speak about this topic, I will give one example and one reason, so my answer sounds natural and confident."`,
    shadow: `Find a short English video or podcast clip (1–2 minutes) about "${title}" on YouTube or TED. Play one sentence, pause, and repeat it immediately, copying the rhythm, stress and tone. Do this for about 10 sentences.`,
    questions: [`What is the main thing you want people to know about "${title}"?`, 'Can you give one real example from your own life?', 'What would you do differently next time, and why?'],
  }
})
export const SAMPLE_VOCAB = [
  { id: 1, word: 'fluent', meaning: 'able to speak smoothly and easily', example: 'She is fluent in three languages.', level: 'beginner', learned: false },
  { id: 2, word: 'eloquent', meaning: 'speaking clearly and persuasively', example: 'He gave an eloquent presentation.', level: 'intermediate', learned: false },
  { id: 3, word: 'articulate', meaning: 'to express ideas clearly and effectively', example: 'I want to articulate my ideas with confidence.', level: 'advanced', learned: true },
]
export const INTERVIEW = {
  'Personal Introduction': ['Tell me about yourself.', 'Where are you from and what are you studying?', 'What are your hobbies and interests?'],
  'HR Interview': ['Why should we hire you?', 'What are your strengths and weaknesses?', 'Where do you see yourself in five years?'],
  'Technical Interview': ['Explain a technical concept you know well in simple words.', 'What programming languages or tools are you comfortable with?', 'How do you debug a problem you have never seen?'],
  'Project Explanation': ['Explain your favourite project.', 'What was your role and what challenges did you face?', 'What would you improve in that project?'],
  'Situational Questions': ['Describe a time you faced a difficult challenge.', 'How would you handle a disagreement in a team?', 'What would you do if you missed a deadline?'],
}
// ---- Calculations ----
export const today = () => new Date().toISOString().slice(0, 10)
export function getStreak(done) {
  const dates = new Set(Object.values(done))
  let d = new Date(), count = 0
  if (!dates.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1) // today may not be done yet
  while (dates.has(d.toISOString().slice(0, 10))) { count++; d.setDate(d.getDate() - 1) }
  return count
}
export const currentDay = done => DAYS.find(d => !done[d.n])?.n ?? 30
export function avgConf(reviews) {
  const v = Object.values(reviews).map(r => +r.conf).filter(Boolean)
  return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : '–'
}
