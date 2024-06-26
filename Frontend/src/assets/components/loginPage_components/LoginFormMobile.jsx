import React from "react";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Input, Link, Divider, Button, Avatar, NavbarItem, Switch, Navbar, Progress } from "@nextui-org/react";
import { MailIcon } from '../../icons/LoginSignupForm/MailIcon';
import { EyeFilledIcon } from "../../icons/LoginSignupForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../icons/LoginSignupForm/EyeSlashFilledIcon";
import { useTheme } from "next-themes";
import { SunIcon } from "../../icons/Navbar/SunIcon";
import { MoonIcon } from "../../icons/Navbar/Moonicon";
import LoginReducer, { login } from "../../redux/reducers/LoginReducer";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../components/globle_Components/ForgotPassword.jsx";
import { me } from "../../redux/reducers/MeReducer.jsx";
import { fetchFeed } from "../../redux/reducers/UserFeedReducers.jsx";
import { UsernameIcon } from "../../icons/LoginSignupForm/UsernameIcon";


const LoginFormMobile = () => {
    // const [email, setEmail] = useState('');
    // const [isInvalid, setIsInvalid] = useState(false);
    // const { theme, setTheme } = useTheme();

    // const handleChange = (event) => {
    //     setEmail(event.target.value);
    // };

    // const handleBlur = () => {
    //     // Check if the email is valid when the user finishes writing
    //     const isValidEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    //     setIsInvalid(!isValidEmail);
    // };

    // const [isVisible, setIsVisible] = React.useState(false);

    // const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const { theme, setTheme } = useTheme();
    const dispatch = useDispatch();
    const result = useSelector((state) => state.login.data);
    const loading = useSelector((state) => state.login.loading);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setEmail(event.target.value);
        // console.log(email, password)
    };
    const handleChangepass = (event) => {
        setPassword(event.target.value);
        // console.log(email, password)
    };
    const Login = async (e) => {


        await dispatch(login({ userName: email, password: password }));
        dispatch(me())
        dispatch(fetchFeed())
        navigate("/Home");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    };

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="w-full flex flex-row">

            <div className=" hidden md:flex flex-1 ">
                <img className="w-full h-full" src="https://img.freepik.com/free-vector/flat-geometric-mosaic-pattern-design_23-2149280518.jpg?w=740&t=st=1710430511~exp=1710431111~hmac=8d193bc87a8b38ac8ed8eb269063b0fa4f1702803458650247b43f7237f6a416" alt="" />
            </div>


            <div className="flex-1 flex-col">
                {loading ? (
                    <Progress
                        size="sm"
                        isIndeterminate
                        aria-label="Loading..."
                        className="max-w-md"
                    />
                ) : (
                    <div style={{ paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "4rem" }} className="flex w-full h-screen flex-col md:flex-nowrap mb-2 md:mb-0 gap-4 ">

                        <div className="flex flex-row items-center px-8" style={{ marginBottom: "1.8rem", gap: ".8rem" }}>
                            <Avatar src="https://github.com/SingupalliKartik/QuikPic/blob/main/Frontend/src/assets/icons/QuikPic_logo.png?raw=true" size="md" style={{ width: "4.2rem", height: "2.2rem", borderRadius: "50%" }} />
                            <h2>QuikPic</h2>
                            <Navbar >
                                <NavbarItem>
                                    <Switch
                                        defaultSelected
                                        size="md"
                                        color="success"
                                        startContent={<SunIcon />}
                                        endContent={<MoonIcon />}
                                        onChange={(e) => {
                                            theme === "light" ? setTheme("dark") : setTheme("light");
                                        }}
                                    ></Switch>
                                </NavbarItem>
                            </Navbar>
                        </div>

                        <div className="py-4 text-xl font-semibold">
                            <h1>Nice to see you again!</h1>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <div style={{ marginBottom: "1rem" }}>
                                <Input
                                    type="username"
                                    label="Username"
                                    variant="bordered"
                                    placeholder="Enter your username"
                                    className="md:max-w-xs"
                                    value={email}
                                    onChange={handleChange}
                                    endContent={
                                        <UsernameIcon style={{ marginBottom: "10px" }} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }

                                    isInvalid={isInvalid}
                                    errorMessage={isInvalid ? "Please enter a valid email" : null}
                                />
                            </div>
                            <Input
                                label="Password"
                                variant="bordered"
                                placeholder="Enter your password"
                                onChange={handleChangepass}
                                value={password}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <EyeSlashFilledIcon style={{ marginBottom: "10px" }} className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon style={{ marginBottom: "10px" }} className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }

                                type={isVisible ? "text" : "password"}
                                className="md:max-w-xs"

                            />

                            <div className="flex justify-end md:max-w-xs" style={{ paddingBottom: "1rem" }}>
                                <ForgotPassword />
                            </div>

                            <div>
                                <Button onClick={Login} className="w-full md:max-w-xs" color="primary" variant="shadow">
                                    Login
                                </Button>
                            </div>
                        </form>

                        <div className="my-1 md:max-w-xs w-full">
                            <Divider className="my-1" />
                        </div>

                        <div className="flex justify-center">
                            <h3>Don't have an account? {" "}
                                <Link href="/Signup" size="md" underline="active">Signup</Link></h3>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default LoginFormMobile;