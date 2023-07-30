"use client";
import { UserPlusIcon, FireIcon } from "@heroicons/react/20/solid";
import { fetchActivitiesAPI } from "../api/DiscoverAPI";
import { useState, useEffect } from "react";
import Link from "next/link";

export type Event = {
  id: string;
  name: string;
  category: string;
  start_time: string;
  location: string;
  duration: string;
  max_person: number;
  current_person: number;
  imageUrl: string;
};

export default function Discover() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    fetchActivitiesAPI(token, setEvents, setLoading);
  }, []);

  const progress = (current: number, max: number) => {
    return (current / max) * 100 + "%";
  };
  const sketelon = [1, 2, 3, 4, 5, 6];
  if (loading === true) {
    return (
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {sketelon.map((event) => (
          <li
            key={event}
            className=" animate-pulse col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:shadow-slate-900"
          >
            <div
              className="flex flex-1 flex-col p-8"
              style={{ width: "30rem" }}
            >
              <div
                className="mx-auto object-cover bg-slate-200 rounded"
                style={{ width: "100%", height: "200px" }}
              ></div>
              <div className="mt-6 mb-4 mx-5 h-2 roundead bg-slate-200"></div>
              <dl className="mt-4 gap-2 flex flex-grow flex-col justify-between text-left">
                <dd className="text-sm text-gray-500">
                  <div className="mb-4 bg-slate-200 h-1.5 rounded dark:bg-green-500"></div>
                </dd>
                <dd className="text-sm text-gray-500">
                  <div className="mb-4 bg-slate-200 h-1.5 rounded dark:bg-green-500"></div>
                </dd>
                <dd className="text-sm text-gray-500">
                  <div className="mb-4 bg-slate-200 h-1.5 rounded dark:bg-green-500"></div>
                </dd>
                <dd className="text-sm text-gray-500">
                  <div className="mb-4 bg-slate-200 h-1.5 rounded dark:bg-green-500"></div>
                </dd>
                <dt className="sr-only">Progress</dt>
                <dd className="mt-3 flex flex-row">
                  <div className="w-3/4 bg-slate-200 rounded-full h-1.5 mt-2 dark:bg-green-500 ">
                    <div className="bg-slate-200 h-1.5 rounded-full dark:bg-green-500"></div>
                  </div>
                </dd>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    );
  } else if (loading === false) {
    return (
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {events &&
          events.map((event) => (
            <li
              key={event.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:shadow-slate-900"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="mx-auto w-full object-cover max-h-60 flex-shrink-0"
                  style={{ height: "280px" }}
                  src={`data:image/jpeg;base64,${event.imageUrl}`}
                  alt=""
                />
                <h2 className="mt-6 text-lg font-medium text-gray-900">
                  {event.name}
                </h2>
                <dl className="mt-4 gap-2 flex flex-grow flex-col justify-between text-left">
                  <dt className="sr-only">Category</dt>
                  <dd className="text-sm text-gray-500">
                    <span className="text-black">📜 Category: </span>{" "}
                    {event.category}
                  </dd>
                  <dt className="sr-only">Start Time</dt>
                  <dd className="text-sm text-gray-500">
                    <span className="text-black">📅 Start Time: </span>
                    {event.start_time}
                  </dd>
                  <dd className="text-sm text-gray-500">
                    <span className="text-black">🌍 Location: </span>
                    {event.location}
                  </dd>
                  <dd className="text-sm text-gray-500">
                    <span className="text-black">⏳ Duration: </span>
                    {event.duration} Hours
                  </dd>
                  <dt className="sr-only">Progress</dt>
                  <dd className="mt-3 flex flex-row">
                    {event.current_person !== event.max_person ? (
                      <>
                        <div className="w-3/4 bg-green-100 rounded-full h-1.5 mt-2 dark:bg-green-500 ">
                          <div
                            className="bg-green-600 h-1.5 rounded-full dark:bg-green-500"
                            style={{
                              width: progress(
                                event.current_person,
                                event.max_person
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {event.current_person}/{event.max_person}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-3/4 bg-red-100 rounded-full h-1.5 mt-2 dark:bg-red-500 ">
                          <div
                            className="bg-red-600 h-1.5 rounded-full dark:bg-red-500"
                            style={{
                              width: progress(
                                event.current_person,
                                event.max_person
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="ml-2 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          {event.current_person}/{event.max_person}
                        </div>
                      </>
                    )}
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <UserPlusIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Join
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <Link
                      href={`/event?eventId=${event.id}`}
                      className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <FireIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}
