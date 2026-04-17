import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { userLoggedIn } from "@/features/authSlice";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    registerUser,
    {
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      data: registerData,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      data: loginData,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const onInputChange = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setSignupInput((prev) => ({ ...prev, [name]: value }))
      : setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => registerUser(signupInput);
  const handleLogin = () => loginUser(loginInput);

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup failed.");
    }

    if (loginIsSuccess && loginData?.user) {
      dispatch(userLoggedIn(loginData.user));
      toast.success(loginData.message || "Login successful.");
      localStorage.setItem("user", JSON.stringify(loginData.user));
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login failed.");
    }
  }, [
    registerIsSuccess,
    registerError,
    loginIsSuccess,
    loginError,
    registerData,
    loginData,
    dispatch,
    navigate,
  ]);

  return (
    <div className="flex justify-center pt-50 min-h-screen w-full bg-[#cacaca] dark:bg-[#121212] transition-colors duration-500">
      <Tabs defaultValue="login" className="w-[400px] relative">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <div className="relative min-h-[360px]">
          {/* Signup */}
          <TabsContent
            value="signup"
            className="absolute inset-0 transition-opacity duration-300"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {["name", "email", "password"].map((field) => (
                  <div className="space-y-1" key={field}>
                    <Label htmlFor={field}>
                      {field[0].toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      type={
                        field === "password"
                          ? "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      name={field}
                      value={signupInput[field]}
                      placeholder={`Enter ${field}`}
                      onChange={(e) => onInputChange(e, "signup")}
                      required
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() =>
                    toast.promise(handleSignup, {
                      loading: "Creating your account...",
                      success: "Account created!",
                      error: "Signup failed!",
                    })
                  }
                  className="w-full text-white"
                  style={{ backgroundColor: "#68d388" }}
                >
                  {registerIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Signup
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Login */}
          <TabsContent
            value="login"
            className="absolute inset-0 transition-opacity duration-300"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {["email", "password"].map((field) => (
                  <div className="space-y-1" key={field}>
                    <Label htmlFor={field}>
                      {field[0].toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      type={field}
                      name={field}
                      value={loginInput[field]}
                      placeholder={`Enter ${field}`}
                      onChange={(e) => onInputChange(e, "login")}
                      required
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() =>
                    toast.promise(handleLogin, {
                      loading: "Logging in...",
                      success: "Login successful!",
                      error: "Login failed!",
                    })
                  }
                  className="w-full text-white"
                  style={{ backgroundColor: "#68d388" }}
                >
                  {loginIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Login;
