import { fetchAuthSession } from 'aws-amplify/auth'

const API_BASE_URL = 'https://6f28s2kgi0.execute-api.ap-southeast-2.amazonaws.com/prod'

class ApiService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const session = await fetchAuthSession()
      const token = session.tokens?.idToken?.toString()
      if (token) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
    
    return {
      'Content-Type': 'application/json'
    }
  }

  async getQuestions(certification: string = 'SAA-C03', count: number = 20) {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${API_BASE_URL}/exam/questions?certification=${certification}&count=${count}`, {
        method: 'GET',
        headers
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { questions: data.questions || [], error: null }
    } catch (error) {
      console.error('Error fetching questions:', error)
      return { questions: [], error: error as Error }
    }
  }

  async saveExamResult(result: {
    userId: string
    certification: string
    score: number
    totalQuestions: number
    correctAnswers: number
    timeSpent: number
    answers: number[]
    questions: any[]
  }) {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${API_BASE_URL}/exam/results`, {
        method: 'POST',
        headers,
        body: JSON.stringify(result)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { result: data, error: null }
    } catch (error) {
      console.error('Error saving exam result:', error)
      return { result: null, error: error as Error }
    }
  }

  async toggleBookmark(userId: string, questionId: string) {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${API_BASE_URL}/exam/bookmarks`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userId, questionId })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { success: true, bookmarked: data.bookmarked, error: null }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      return { success: false, bookmarked: false, error: error as Error }
    }
  }

  async getUserBookmarks(userId: string) {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${API_BASE_URL}/exam/bookmarks/${userId}`, {
        method: 'GET',
        headers
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return { bookmarks: data.bookmarks || [], error: null }
    } catch (error) {
      console.error('Error fetching bookmarks:', error)
      return { bookmarks: [], error: error as Error }
    }
  }
}

export const apiService = new ApiService()
