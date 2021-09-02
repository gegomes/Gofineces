
import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect
} from 'react'

import * as AuthSession from 'expo-auth-session'

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

interface AutoProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}
interface AutorizationResponse {
  params: {
    access_token: string
  };
  type: string
}

interface IAuthConstData {
  user: User
  singnInWithGoogle(): Promise<void>
  singnInWithApple(): Promise<void>
  signOut(): Promise<void>
  useLoading: boolean
}

const AuthContext = createContext({} as IAuthConstData)

function AutoProvider({ children }: AutoProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [useLoading, setUseLoading] = useState(true)

  const userStorangKey = '@gofinaces:user'

  async function singnInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AutorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json()

        console.log(userInfo);

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture

        })
      }

    } catch (error) {
      throw new Error(error)
    }
  }
  async function singnInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      if (credential) {
          const name = credential.fullName!.givenName!
          const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        }
        setUser(userLogged)
        await AsyncStorage.setItem(userStorangKey, JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error()
    }
  }

  async function signOut(){
    setUser({} as User)
    await AsyncStorage.removeItem(userStorangKey)
  }
  
  useEffect(() => {
     async function loadUserStorangeDate(){
       const useStoranged = await AsyncStorage.getItem(userStorangKey)

       if(useStoranged){
         const userLogged = JSON.parse(useStoranged) as User
         setUser(userLogged)
       }
       setUseLoading(false)
     }
     loadUserStorangeDate 

  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      singnInWithGoogle,
      singnInWithApple,
      signOut,
      useLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AutoProvider, useAuth }