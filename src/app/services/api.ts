import { Auth } from 'aws-amplify'
import { API_ENDPOINTS } from '../config/api-config'

class ApiService {
  private async getAuthToken(): Promise<string> {
    try {
      const session = await Auth.currentSession()
      return session.getIdToken().getJwtToken()
    } catch (error) {
      console.error('Error getting auth token:', error)
      throw new Error('Not authenticated')
    }
  }

  private async request(url: string, options: RequestInit = {}) {
    try {
      const token = await this.getAuthToken()
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        }
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async getUser(userId: string) {
    return this.request(API_ENDPOINTS.getUser(userId))
  }

  async updateUser(userId: string, data: any) {
    return this.request(API_ENDPOINTS.updateUser(userId), {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async getQuestions(certId: string, quizNumber: number) {
    return this.request(API_ENDPOINTS.getQuestions(certId, quizNumber))
  }

  async saveProgress(userId: string, certId: string, quizId: number, score: number, passed: boolean) {
    return this.request(API_ENDPOINTS.saveProgress(userId), {
      method: 'POST',
      body: JSON.stringify({ certId, quizId, score, passed })
    })
  }

  async getUserProgress(userId: string, certId?: string) {
    return this.request(API_ENDPOINTS.getUserProgress(userId, certId))
  }
}

export const apiService = new ApiService()
