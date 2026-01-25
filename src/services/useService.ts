import { createClient } from '@supabase/supabase-js'

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supaKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supaUrl, supaKey)

async function LogIn(Correo: string, Password: string){

    let {data, error} = await supabase.auth.signInWithPassword({
        email: Correo,
        password: Password
    })

}

async function SignUp(Correo:string, Password: string) {
    let {data, error} = await supabase.auth.signUp({
        email:Correo,
        password:Password
    })
}