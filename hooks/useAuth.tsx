import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
    loginErr: string | null
  }

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
    loginErr: null,
})

interface AuthProviderProps{
    children: React.ReactNode
}

export const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [loginErr, setLoginErr] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    // persisting the user
    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            // Logged in...
            setUser(user)
            setLoading(false)
        } else {
            // Not logged in...
            setUser(null)
            setLoading(true)
            router.push('/login')
        }

        setInitialLoading(false)
    }),[auth])    

    // sign-up
    const signUp = async(email:string, password:string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            setUser(userCredential.user)
            router.push("/")
            setLoading(false)
            setLoginErr(null)
        })
        .catch((err)=>{
            // alert(err.message)
            console.log(err.message);
            const msg = err.message.split('/').join(')').split(')')
            setLoginErr(msg[1])
        })
        .finally(()=>setLoading(false))
    }

    // sign-in
    const signIn = async(email:string, password:string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            setUser(userCredential.user)
            router.push("/")
            setLoading(false)
            setLoginErr(null)
        })
        .catch((err)=>{
            // alert(err.message)
            console.log(err.message)
            const msg = err.message.split('/').join(')').split(')')
            setLoginErr(msg[1])
        })
        .finally(()=>setLoading(false))
    }


    const logout = async() => {
        setLoading(true)

        signOut(auth)
        .then(()=>{
            setUser(null)
            setLoginErr(null)
        })
        .catch((err)=>alert(err.message))
        .finally(()=>setLoading(false))
    }

    const memoedValue = useMemo(()=>({
        user, signIn, signUp,loading, logout, error, loginErr
    }), [user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>
        {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}