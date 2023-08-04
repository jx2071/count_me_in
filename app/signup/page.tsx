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

function LoadingSpin(props: { show: boolean }) {
  const { show } = props;
  if (show) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await postSignupAPI(userData, setUserInfo, setSignupSuccess, setLoading);
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
          🎈 Let&apos;s get started 🎈
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
            <LoadingSpin show={loading} />
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
