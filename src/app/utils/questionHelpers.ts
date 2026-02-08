// Normalize correctAnswer to always be number or number[]
const normalizeCorrectAnswer = (correctAnswer: any): number | number[] => {
  if (Array.isArray(correctAnswer)) {
    return correctAnswer
  }
  if (typeof correctAnswer === 'string' && correctAnswer.includes(',')) {
    return correctAnswer.split(',').map((n: string) => parseInt(n.trim()))
  }
  return typeof correctAnswer === 'number' ? correctAnswer : parseInt(correctAnswer)
}

export const isMultipleCorrect = (correctAnswer: any): boolean => {
  const normalized = normalizeCorrectAnswer(correctAnswer)
  return Array.isArray(normalized)
}

export const checkAnswer = (
  userAnswer: number | number[] | null,
  correctAnswer: any
): boolean => {
  if (userAnswer === null) return false
  
  const normalized = normalizeCorrectAnswer(correctAnswer)
  
  if (Array.isArray(normalized)) {
    if (!Array.isArray(userAnswer)) return false
    if (userAnswer.length !== normalized.length) return false
    return userAnswer.sort().every((val, idx) => val === normalized.sort()[idx])
  }
  
  return userAnswer === normalized
}

export const formatCorrectAnswer = (
  correctAnswer: any,
  options: string[]
): string => {
  const normalized = normalizeCorrectAnswer(correctAnswer)
  if (Array.isArray(normalized)) {
    return normalized.map(idx => options[idx]).join(', ')
  }
  return options[normalized]
}
