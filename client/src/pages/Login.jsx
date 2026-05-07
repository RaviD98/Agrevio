import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

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

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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
      ? setSignupInput((prev) => ({
          ...prev,
          [name]: value,
        }))
      : setLoginInput((prev) => ({
          ...prev,
          [name]: value,
        }));
  };

  const handleSignup = async () => {
    try {
      await registerUser(signupInput).unwrap();

      await loginUser({
        email: signupInput.email,

        password: signupInput.password,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => loginUser(loginInput);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");

      navigate("/");
    }

    if (registerError) {
      toast.error(registerError?.data?.message || "Signup failed.");
    }

    if (loginIsSuccess) {
      toast.success(loginData?.message || "Login successful.");

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
    <section
      className="
        flex min-h-screen items-center justify-center
        bg-[#FBFAF5]
        px-4 py-10
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        font-['Manrope']
      "
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <p
            className="
              mb-3 text-sm
              font-semibold uppercase tracking-[0.2em]
              text-[#007200]
            "
          >
            Welcome
          </p>

          <h1
            className="
              text-4xl font-bold
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            AgroHub
          </h1>

          <p
            className="
              mt-4 text-sm leading-relaxed
              text-gray-600
              dark:text-gray-300
            "
          >
            Access your agricultural marketplace account.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList
            className="
              mb-6 grid w-full grid-cols-2
              rounded-2xl
              bg-[#EAE7DC]
              p-1
              dark:bg-[#3A3A3A]
            "
          >
            <TabsTrigger
              value="signup"
              className="
                cursor-pointer rounded-xl
                data-[state=active]:bg-[#007200]
                data-[state=active]:text-white
              "
            >
              Signup
            </TabsTrigger>

            <TabsTrigger
              value="login"
              className="
                cursor-pointer rounded-xl
                data-[state=active]:bg-[#007200]
                data-[state=active]:text-white
              "
            >
              Login
            </TabsTrigger>
          </TabsList>

          {/* Signup */}
          <TabsContent value="signup">
            <Card
              className="
                rounded-[2rem]
                border border-gray-200
                bg-white
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                dark:border-[#4A4A4A]
                dark:bg-[#3A3A3A]
              "
            >
              <CardHeader className="space-y-2">
                <CardTitle
                  className="
                    text-3xl font-bold
                    text-[#1F2937]
                    dark:text-white
                    font-['Arvo']
                  "
                >
                  Create Account
                </CardTitle>

                <CardDescription
                  className="
                    text-sm text-gray-600
                    dark:text-gray-300
                  "
                >
                  Join AgroHub and explore smart farming solutions.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {["name", "email", "password"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label className="font-semibold">
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
                      className="
                          rounded-2xl
                          border-gray-200
                          bg-[#FBFAF5]
                          py-6
                          focus-visible:ring-[#007200]
                          dark:border-[#4A4A4A]
                          dark:bg-[#2C2C2C]
                        "
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
                  className="
                    h-12 w-full
                    cursor-pointer
                    rounded-2xl
                    bg-[#007200]
                    text-white
                    transition-all duration-300
                    hover:bg-[#04471c]
                  "
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
          <TabsContent value="login">
            <Card
              className="
                rounded-[2rem]
                border border-gray-200
                bg-white
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                dark:border-[#4A4A4A]
                dark:bg-[#3A3A3A]
              "
            >
              <CardHeader className="space-y-2">
                <CardTitle
                  className="
                    text-3xl font-bold
                    text-[#1F2937]
                    dark:text-white
                    font-['Arvo']
                  "
                >
                  Welcome Back
                </CardTitle>

                <CardDescription
                  className="
                    text-sm text-gray-600
                    dark:text-gray-300
                  "
                >
                  Login to continue managing your agricultural needs.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {["email", "password"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label className="font-semibold">
                      {field[0].toUpperCase() + field.slice(1)}
                    </Label>

                    <Input
                      type={field === "password" ? "password" : "email"}
                      name={field}
                      value={loginInput[field]}
                      placeholder={`Enter ${field}`}
                      onChange={(e) => onInputChange(e, "login")}
                      required
                      className="
                        rounded-2xl
                        border-gray-200
                        bg-[#FBFAF5]
                        py-6
                        focus-visible:ring-[#007200]
                        dark:border-[#4A4A4A]
                        dark:bg-[#2C2C2C]
                      "
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
                  className="
                    h-12 w-full
                    cursor-pointer
                    rounded-2xl
                    bg-[#007200]
                    text-white
                    transition-all duration-300
                    hover:bg-[#04471c]
                  "
                >
                  {loginIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Login;
