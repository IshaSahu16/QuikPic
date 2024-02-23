import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  Spinner,
  RadioGroup,
  Radio,
  Switch,
  Card,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { UserFeedPage } from "./assets/pages/UserFeedPage";
import CreatePostPage from "./assets/pages/CreatePostPage";
import PostViewPage from "./assets/pages/PostViewPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";
import UserProfilePage from "./assets/pages/UserProfilePage";
import SettingPage from "./assets/pages/SettingPage";


export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <NextUIProvider navigate={navigate}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {/* Your app here... */}
          <Routes>
            <Route path="/UserFeedPage" element={<UserFeedPage />} />
            <Route path="/CreatePost" element={<CreatePostPage />} />
            <Route path="/ViewPost" element={<PostViewPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/UserProfile" element={<UserProfilePage />} />
            <Route path="/Setting" element={<SettingPage />} />
            {/* ... */}
          </Routes>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}
