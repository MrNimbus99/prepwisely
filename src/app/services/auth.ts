import { getCurrentUser, signIn, signUp, signOut, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword } from 'aws-amplify/auth'

export interface SignUpParams {
  email: string
  password: string
  name: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface ConfirmSignUpParams {
  email: string
  confirmationCode: string
}

export interface ResetPasswordParams {
  email: string
}

export interface ConfirmResetPasswordParams {
  email: string
  confirmationCode: string
  newPassword: string
}

class AuthService {
  async getCurrentUser() {
    try {
      const user = await getCurrentUser()
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signUp({ email, password, name }: SignUpParams) {
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name
          }
        }
      })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }

  async confirmSignUp({ email, confirmationCode }: ConfirmSignUpParams) {
    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode
      })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }

  async resendConfirmationCode(email: string) {
    try {
      const result = await resendSignUpCode({ username: email })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }

  async signIn({ email, password }: SignInParams) {
    try {
      const result = await signIn({ username: email, password })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }

  async signOut() {
    try {
      await signOut()
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async resetPassword({ email }: ResetPasswordParams) {
    try {
      const result = await resetPassword({ username: email })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }

  async confirmResetPassword({ email, confirmationCode, newPassword }: ConfirmResetPasswordParams) {
    try {
      const result = await confirmResetPassword({
        username: email,
        confirmationCode,
        newPassword
      })
      return { result, error: null }
    } catch (error) {
      return { result: null, error: error as Error }
    }
  }
}

export const authService = new AuthService()
