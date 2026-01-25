import { createClient } from '@supabase/supabase-js'

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supaKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supaUrl, supaKey)

export async function LogIn(Correo: string, Password: string) {
    return await supabase.auth.signInWithPassword({
        email: Correo,
        password: Password
    })
}

export async function SignUp(Correo: string, Password: string) {
    return await supabase.auth.signUp({
        email: Correo,
        password: Password
    })
}

export async function SignInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}