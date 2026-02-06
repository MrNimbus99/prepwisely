export const isMultipleCorrect = (correctAnswer: number | number[]): boolean => {
  return Array.isArray(correctAnswer)
}

export const checkAnswer = (
  userAnswer: number | number[] | null,
  correctAnswer: number | number[]
): boolean => {
  if (userAnswer === null) return false
  
  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) return false
    if (userAnswer.length !== correctAnswer.length) return false
    return userAnswer.sort().every((val, idx) => val === correctAnswer.sort()[idx])
  }
  
  return userAnswer === correctAnswer
}

export const formatCorrectAnswer = (
  correctAnswer: number | number[],
  options: string[]
): string => {
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.map(idx => options[idx]).join(', ')
  }
  return options[correctAnswer]
}
