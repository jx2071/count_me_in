"use client";
import {
  QuestionMarkCircleIcon,
  CheckIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useUserInfo } from "../context/userInfoContext";
import postSignupAPI from "../api/SignupAPI";
type UserDetail = {
  name: string;
  email: string;
  gender: string;
};
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default function SignupPage() {
  const { setUserInfo } = useUserInfo();

  const [userDetail, setUserDetail] = useState({} as UserDetail);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState({
    length: false,
    number: false,
    upperCase: false,
    lowerCase: false,
  });
  const [incorrectInformation, setIncorrectInformation] = useState("");

  useEffect(() => {
    setUserDetail((prev) => ({
      ...prev,
      gender: "M",
    }));
  }, []);

  useEffect(() => {
    validatePassword();
  }, [password]);

  const validatePassword = () => {
    const passwordLength = password.length >= 8;
    const passwordNumber = /\d/.test(password);
    const passwordUpperCase = /[A-Z]/.test(password);
    const passwordLowerCase = /[a-z]/.test(password);
    setPasswordError({
      length: passwordLength,
      number: passwordNumber,
      upperCase: passwordUpperCase,
      lowerCase: passwordLowerCase,
    });
  };

  const handleSignUp = async () => {
    if (!emailRegex.test(userDetail.email)) {
      setIncorrectInformation("Please enter a valid email address");
      return;
    }
    if (!userDetail.name || !userDetail.email || !password || !password2) {
      setIncorrectInformation("Please fill in all the fields");
      return;
    }
    if (
      !passwordError.length ||
      !passwordError.number ||
      !passwordError.lowerCase ||
      !passwordError.upperCase
    ) {
      setIncorrectInformation("Password is not valid");
      return;
    }
    if (password !== password2) {
      setIncorrectInformation("Passwords do not match");
      return;
    }
    const userData = {
      name: userDetail.name,
      email: userDetail.email,
      gender: userDetail.gender,
      password: password,
    };
    await postSignupAPI(userData, setUserInfo, setSignupSuccess);
  };

  useEffect(() => {
    if (signupSuccess) {
      window.location.href = "/";
    }
  }, [signupSuccess]);

  return (
    <div className="bg-white px-20 py-10 rounded-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          🎈 Let's get started 🎈
        </h2>
      </div>
      <div className="mt-10 w-80 sm:mx-auto sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, email: e.target.value })
                }
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, name: e.target.value })
                }
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Gender
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                defaultValue="M"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, gender: e.target.value })
                }
                required
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="U">I choose not to disclose</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2 flex">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {password &&
                passwordError.length &&
                passwordError.number &&
                passwordError.lowerCase &&
                passwordError.upperCase && (
                  <CheckIcon className="h-5 w-5 text-green-500 relative top-2" />
                )}
              {password &&
                (!passwordError.length ||
                  !passwordError.number ||
                  !passwordError.lowerCase ||
                  !passwordError.upperCase) && (
                  <XMarkIcon className="h-5 w-5 text-red-400 relative top-2" />
                )}
            </div>
            {password && passwordFocus && (
              <div className="mt-2">
                <ul className="list-inside text-xs text-gray-500">
                  <li className="flex">
                    {passwordError.length ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    )}{" "}
                    Must be at least 8 characters
                  </li>
                  <li className="flex">
                    {passwordError.number ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    )}{" "}
                    Must contain at least 1 number
                  </li>
                  <li className="flex">
                    {passwordError.upperCase ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    )}{" "}
                    Must contain at least 1 uppercase letter
                  </li>
                  <li className="flex">
                    {passwordError.lowerCase ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    )}{" "}
                    Must contain at least 1 lowercase letter
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <div className="flex ">
              <label
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2 flex">
              <input
                id="password2"
                name="password2"
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {password2 &&
                password === password2 &&
                passwordError.length &&
                passwordError.number &&
                passwordError.lowerCase &&
                passwordError.upperCase && (
                  <CheckIcon className="h-5 w-5 text-green-500 relative top-2" />
                )}
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={handleSignUp}
            className="flex mt-4 w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up 🌟
          </button>
          {incorrectInformation && (
            <div className="rounded-md bg-red-50 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {incorrectInformation}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Already has an account?
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <a
            href="/login"
            className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in 🕺
          </a>
        </div>
      </div>
    </div>
  );
}
