export const API_CONFIG = {
  endpoint: process.env.REACT_APP_API_ENDPOINT || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1'
}

export const API_ENDPOINTS = {
  getUser: (userId: string) => `${API_CONFIG.endpoint}/users/${userId}`,
  updateUser: (userId: string) => `${API_CONFIG.endpoint}/users/${userId}`,
  getQuestions: (certId: string, quizNumber: number) => `${API_CONFIG.endpoint}/questions/${certId}/${quizNumber}`,
  saveProgress: (userId: string) => `${API_CONFIG.endpoint}/progress/${userId}`,
  getUserProgress: (userId: string, certId?: string) => {
    const url = `${API_CONFIG.endpoint}/progress/${userId}`
    return certId ? `${url}?certId=${certId}` : url
  }
}
