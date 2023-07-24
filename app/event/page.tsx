"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import fetchEventAPIs from "../api/EventAPI";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
  PencilSquareIcon,
  HandRaisedIcon,
  UserMinusIcon,
  UserPlusIcon,
  FlagIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import GoogleMap from "../components/GoogleMap";

export type EventDetail = {
  id: string;
  name: string;
  category: string;
  start_time: string;
  duration: string;
  location: string;
  max_person: number;
  current_person: number;
  detail_location: string;
  gather_location: string;
  requirement: string | null;
  event_descr: string | null;
  create_time: string;
  event_owner: string;
  imageUrl: string;
};

const timeline = [
  {
    id: 1,
    content: "Event Created By",
    target: "aaa",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: FlagIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 2,
    content: "Joined event by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: UserPlusIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 3,
    content: "Joined event by",
    target: "Katherine Snyder",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: UserPlusIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Left event by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: UserMinusIcon,
    iconBackground: "bg-yellow-500",
  },
  {
    id: 5,
    content: "Joined event by",
    target: "bbb",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: UserPlusIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 6,
    content: "Event date changed",
    target: "",
    href: "#",
    date: "Oct 5",
    datetime: "2020-10-05",
    icon: PencilSquareIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 7,
    content: "Event paused",
    target: "",
    href: "#",
    date: "Oct 5",
    datetime: "2020-10-05",
    icon: HandRaisedIcon,
    iconBackground: "bg-red-500",
  },
  {
    id: 8,
    content: "Event started",
    target: "",
    href: "#",
    date: "Oct 6",
    datetime: "2020-10-06",
    icon: RocketLaunchIcon,
    iconBackground: "bg-blue-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function progress(current: number, max: number) {
  return (current / max) * 100 + "%";
}

export default function Event() {
  const params = useSearchParams();

  const eventId = params.get("eventId");

  const [eventData, setEventData] = useState<EventDetail>({
    id: "",
    name: "",
    category: "",
    start_time: "",
    duration: "",
    location: "",
    max_person: 1,
    current_person: 1,
    detail_location: "",
    gather_location: "",
    requirement: null,
    event_descr: null,
    create_time: "",
    event_owner: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [showMap, setShowMap] = useState<boolean>(false);

  useEffect(() => {
    fetchEventAPIs(eventId, setEventData, setLoading);
    console.log(eventData);
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-6">
            <div className="col-span-1 flex-1 bg-white p-8 rounded-lg md:col-span-4">
              <p className="font-bold text-xl mb-2 p-2 bg-sky-50 rounded-xl">
                {" "}
                🎗 {eventData.category}
              </p>
              <img
                className="mx-auto w-full object-cover max-h-96 flex-shrink-0 border-2 border-gray-500 rounded"
                style={{ height: "500px" }}
                alt=""
                src={`data:image/jpeg;base64,${eventData.imageUrl}`}
              />
              <div className="mt-4 items-start justify-between">
                <h1 className="mt-6 text-xl text-gray-900 text-center font-bold">
                  {eventData.name}
                </h1>
                <dl className="mt-4 gap-4 flex flex-grow flex-col justify-between text-left">
                  <dd className="mt-3 flex flex-row text-yellow-400">
                    {eventData.current_person !== eventData.max_person ? (
                      <>
                        🎊 Current Party Size: &nbsp;
                        <div className="w-1/2 bg-green-100 rounded-full h-1.5 mt-2 dark:bg-green-500 ">
                          <div
                            className="bg-green-600 h-1.5 rounded-full dark:bg-green-500"
                            style={{
                              width: progress(
                                eventData.current_person,
                                eventData.max_person
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {eventData.current_person}/{eventData.max_person}
                        </div>
                      </>
                    ) : (
                      <>
                        🎊 Party Full: &nbsp;
                        <div className="w-1/2 bg-red-100 rounded-full h-1.5 mt-2 dark:bg-red-500 ">
                          <div
                            className="bg-red-600 h-1.5 rounded-full dark:bg-red-500"
                            style={{
                              width: progress(
                                eventData.current_person,
                                eventData.max_person
                              ),
                            }}
                          ></div>
                        </div>
                        <div className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          {eventData.current_person}/{eventData.max_person}
                        </div>
                      </>
                    )}
                  </dd>
                  <dd className="text-green-500">
                    📅 Start Time:
                    <span className="text-black"> {eventData.start_time}</span>
                  </dd>
                  <dd className="text-sky-700">
                    ⏳ Duration:{" "}
                    <span className="text-black">
                      {eventData.duration + " Hours"}
                    </span>
                  </dd>
                  <dd className="text-emerald-700">
                    👩🏼‍🤝‍👨🏾 Requirement:{" "}
                    <span className="text-black">{eventData.requirement}</span>
                  </dd>
                  <dd className=" text-blue-400">
                    📢 Description:
                    <span className="text-black">
                      {" "}
                      {eventData.event_descr ?? "None"}
                    </span>
                  </dd>
                  <dd className="text-blue-500">
                    🛎️ Gather Location:{" "}
                    <span className="text-black">
                      {eventData.gather_location}
                    </span>
                  </dd>
                  <dd className="text-yellow-600">
                    🌍 Event Location:{" "}
                    <span className="text-black">
                      {eventData.detail_location}
                    </span>
                    <button
                      className="flex flex-1 bg-yellow-100 p-2 rounded-xl mt-2"
                      onClick={() => setShowMap(!showMap)}
                    >
                      <span className="text-sm">Show Map</span>
                      {!showMap && <ChevronDownIcon width="20px" />}
                      {showMap && <ChevronUpIcon width="20px" />}
                    </button>
                    <GoogleMap
                      location={eventData.detail_location}
                      show={showMap}
                    />
                  </dd>
                </dl>
              </div>
            </div>

            <div className="col-span-1 flex-1 bg-white p-8 rounded-lg md:col-span-2">
              <div className="flow-root">
                <div className="relative flex space-x-3 mb-5">Status</div>
                <ul role="list" className="-mb-8">
                  {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}

                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                event.iconBackground,
                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                              )}
                            >
                              <event.icon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {event.content}{" "}
                                <a
                                  href={event.href}
                                  className="font-medium text-gray-900"
                                >
                                  {event.target}
                                </a>
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={event.datetime}>
                                {event.date}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
