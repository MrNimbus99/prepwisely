export const API_CONFIG = {
  endpoint: 'https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod',
  region: 'ap-southeast-2'
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
