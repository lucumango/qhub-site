import { useState } from "react";
import { LogIn, SignUp, SignInWithGoogle } from "@/services/useService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await LogIn(email, password);
        setLoading(false);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error al iniciar sesión",
                description: error.message,
            });
        } else {
            toast({
                title: "Sesión iniciada",
                description: "Bienvenido de vuelta!",
            });
            navigate("/"); // Redirect to home on success
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await SignUp(email, password);
        setLoading(false);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error al registrarse",
                description: error.message,
            });
        } else {
            toast({
                title: "Cuenta creada",
                description: "Revisa tu correo para confirmar tu cuenta (si está habilitado), o inicia sesión.",
            });
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { data, error } = await SignInWithGoogle();
        setLoading(false);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error con Google",
                description: error.message,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                    <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entrar a tu cuenta</CardTitle>
                            <CardDescription>
                                Ingresa tus credenciales para acceder a la plataforma.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="usuario@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-quantum-purple hover:bg-quantum-purple/90" disabled={loading}>
                                    {loading ? "Cargando..." : "Ingresar"}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        O continúa con
                                    </span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google
                            </Button>

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crea una cuenta</CardTitle>
                            <CardDescription>
                                Regístrate para acceder a todos los cursos y recursos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="r-email">Correo electrónico</Label>
                                    <Input
                                        id="r-email"
                                        type="email"
                                        placeholder="usuario@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="r-password">Contraseña</Label>
                                    <Input
                                        id="r-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-quantum-purple hover:bg-quantum-purple/90" disabled={loading}>
                                    {loading ? "Cargando..." : "Registrarse"}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        O continúa con
                                    </span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Google
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AuthPage;
