"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import postEventCreateAPI from "../api/EventCreateAPI";
import { v4 as uuidv4 } from "uuid";
type EventFormData = {
  eventName: string;
  category: string;
  size: number;
  time: string;
  duration: string;
  location: string | undefined;
  city: string | undefined;
  state: string | undefined;
  gatherLocation: string | undefined;
  detail: string;
  requirement: string;
  preview: string | null;
  file: File | null;
};

export default function CreatePage() {
  const [eventData, setEventdata] = useState<EventFormData>(
    {} as EventFormData
  );

  const [alertShow, setAlertShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventId, _] = useState(uuidv4());

  const [token, setToken] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && locationRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        locationRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.address_components) {
          let city = "";
          let state = "";

          for (let i = 0; i < place.address_components.length; i++) {
            const component = place.address_components[i];
            if (
              component.types.includes("locality") ||
              component.types.includes("sublocality")
            ) {
              city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.short_name; // You can also use 'long_name' if you want the full state name
            }
          }

          setEventdata((prev) => ({
            ...prev,
            location: place.formatted_address,
            city: city,
            state: state,
          }));
        }
      });
    }
  }, []);

  useEffect(() => {
    setToken(sessionStorage.getItem("Token") ?? "");
    setEventdata((prev) => ({
      ...prev,
      category: "Entertainment",
    }));
  }, []);

  const checkRequireField = () => {
    if (eventData.eventName === undefined) {
      console.log(eventData.eventName);
      setErrorMsg(`Please fill in the Event Name field`);
      setErrorShow(true);
      return false;
    } else if (eventData.category === undefined) {
      console.log(eventData.category);
      setErrorMsg(`Please fill in the Category field`);
      setErrorShow(true);
      return false;
    } else if (eventData.size === undefined) {
      console.log(eventData.size);
      setErrorMsg(`Please fill in the Size field`);
      setErrorShow(true);
      return false;
    } else if (eventData.file === undefined) {
      console.log(eventData.file);
      setErrorMsg(`Please Upload an Event Photo`);
      setErrorShow(true);
      return false;
    } else if (eventData.time === undefined) {
      console.log(eventData.time);
      setErrorMsg(`Please fill in the Start Time field`);
      setErrorShow(true);
      return false;
    } else if (eventData.duration === undefined) {
      console.log(eventData.duration);
      setErrorMsg(`Please fill in the Duration field`);
      setErrorShow(true);
      return false;
    } else if (eventData.location === undefined) {
      console.log(eventData.location);
      setErrorMsg(`Please fill in the Location field`);
      setErrorShow(true);
      return false;
    } else if (eventData.city === undefined) {
      console.log(eventData.city);
      setErrorMsg(`Please fill in the City field`);
      setErrorShow(true);
      return false;
    } else if (eventData.state === undefined) {
      console.log(eventData.state);
      setErrorMsg(`Please fill in the State field`);
      setErrorShow(true);
      return false;
    } else if (eventData.gatherLocation === undefined) {
      console.log(eventData.gatherLocation);
      setErrorMsg(`Please fill in the Gathering Location field`);
      setErrorShow(true);
      return false;
    }
    return true;
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async function preparePayload(eventData: any, eventId: string): Promise<any> {
    let fileBase64: string | null = null;

    if (eventData.file) {
      const dataUrl: string = await fileToBase64(eventData.file);
      fileBase64 = dataUrl.split(",")[1]; // Remove the "data:*/*;base64," prefix
    }

    return {
      eventId: eventId,
      eventName: eventData.eventName,
      category: eventData.category,
      size: eventData.size,
      time: eventData.time,
      duration: eventData.duration,
      location: eventData.location ?? "",
      city: eventData.city ?? "",
      state: eventData.state ?? "",
      gatherLocation: eventData.gatherLocation ?? "",
      detail: eventData.detail ?? "",
      requirement: eventData.requirement ?? "",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqeXh1OTZAZ21haWwuY29tIn0.uhSouvFWwUGdHa6hx2JN-veRBkVTcADO28yaHkugVKA",
      file: fileBase64,
    };
  }

  //Submit the form data to the backend
  const handleSubmit = async () => {
    if (!checkRequireField()) {
      return;
    }
    const payload = await preparePayload(eventData, eventId);
    await postEventCreateAPI(payload, setAlertShow, setErrorMsg, setErrorShow);
  };

  //Automatically close the error alert after 5 seconds
  useEffect(() => {
    if (errorShow) {
      const interval = setInterval(() => {
        setErrorShow(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [errorShow]);
  return (
    <div className="block">
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfqa17xfEyd2a8dF5k5K9FX-q1hYgxiLA&libraries=places"
        strategy="beforeInteractive"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold text-gray-600">
          Create a New Event
        </h1>
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Let's start with the basic information that will be displayed on
            </p>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="event_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Name {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="event_name"
                        id="event_name"
                        value={eventData.eventName}
                        required
                        onChange={(e) =>
                          setEventdata((prev) => ({
                            ...prev,
                            eventName: e.target.value,
                          }))
                        }
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-1 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={eventData.category}
                      onChange={(e) =>
                        setEventdata((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option>Entertainment</option>
                      <option>Sports</option>
                      <option>Education</option>
                      <option>Casual</option>
                      <option>Business</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Party Size {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2 w-1/2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="duration"
                        id="duration"
                        step="1"
                        min="1"
                        required
                        value={eventData.size}
                        onChange={(e) => {
                          let partySize = parseInt(e.target.value);
                          if (partySize < 1) {
                            partySize = 1;
                          }
                          setEventdata((prev) => ({
                            ...prev,
                            size: partySize,
                          }));
                        }}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Photo {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            required
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              const preview = file
                                ? URL.createObjectURL(file)
                                : null;
                              console.log(file, preview);

                              setEventdata((prev) => ({
                                ...prev,
                                file,
                                preview,
                              }));
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {eventData.preview && (
                    <div>
                      <h2 className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                        Preview
                      </h2>
                      <div className="mt-2 flex justify-center">
                        <img
                          src={eventData.preview}
                          alt="Preview"
                          className="h-40 w-64 object-cover"
                        />
                      </div>
                      <div className="flex justify-center">
                        <p className="text-xs leading-5 text-gray-600">
                          {eventData.file?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="event_time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Start Time {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="datetime-local"
                        name="event_time"
                        id="event_time"
                        step="1800"
                        required
                        onChange={(e) => {
                          console.log(
                            e.target.value.toString().replace("T", " ")
                          );
                          setEventdata((prev) => ({
                            ...prev,
                            time: e.target.value.toString(),
                          }));
                        }}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Duration {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2 ">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="duration"
                        id="duration"
                        step="0.5"
                        required
                        onChange={(e) => {
                          setEventdata((prev) => ({
                            ...prev,
                            duration: e.target.value.toString(),
                          }));
                        }}
                        className=" flex-1 w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <span className="relative select-none items-center right-2 top-2 text-gray-500 sm:text-sm">
                        Hours
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2 ">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="location"
                        ref={locationRef}
                        id="location"
                        placeholder="Search"
                        value={eventData.location}
                        onChange={(e) =>
                          setEventdata((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className=" flex-1 w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="grid grid-cols-2">
                    <div className="col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City {"("}
                        <span className="text-red-400">*</span>
                        {")"}
                      </label>
                      <div className="mt-2 w-3/4">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={eventData.city}
                            onChange={(e) =>
                              setEventdata((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className=" flex-1 w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State {"("}
                        <span className="text-red-400">*</span>
                        {")"}
                      </label>
                      <div className="mt-2 w-3/4">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={eventData.state}
                            onChange={(e) =>
                              setEventdata((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            className=" flex-1 w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="gatherLocation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gathering Location {"("}
                    <span className="text-red-400">*</span>
                    {")"}
                  </label>
                  <div className="mt-2 ">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="gatherLocation"
                        value={eventData.gatherLocation}
                        id="gatherLocation"
                        onChange={(e) =>
                          setEventdata((prev) => ({
                            ...prev,
                            gatherLocation: e.target.value,
                          }))
                        }
                        className=" flex-1 w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="sameLocation"
                        name="sameLocation"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEventdata((prev) => ({
                              ...prev,
                              gatherLocation: eventData.location,
                            }));
                          } else if (
                            e.target.checked === false &&
                            eventData.gatherLocation === eventData.location
                          ) {
                            setEventdata((prev) => ({
                              ...prev,
                              gatherLocation: "",
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-600"
                      >
                        Same as event location
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description (Optional)
                  </label>
                  <p className="text-sm leading-6 text-gray-600">
                    Write a few sentences about this event.
                  </p>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={eventData.detail}
                      onChange={(e) =>
                        setEventdata((prev) => ({
                          ...prev,
                          detail: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="requirement"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Join Requirement (Optional)
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="requirement"
                      name="requirement"
                      rows={3}
                      className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={eventData.requirement}
                      onChange={(e) =>
                        setEventdata((prev) => ({
                          ...prev,
                          requirement: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  setEventdata({} as EventFormData);
                  window.location.href =
                    sessionStorage.getItem("previous") ?? "/";
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessAlert
        show={alertShow}
        setShow={() => {
          setAlertShow(!alertShow);
        }}
        message={"Event Created Successfully"}
        detail={""}
      />
      <ErrorAlert
        show={errorShow}
        setShow={() => {
          setErrorShow(!errorShow);
        }}
        message={errorMsg}
        detail={""}
      />
    </div>
  );
}
