"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import fetchEventAPIs from "../api/EventAPI";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 5,
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Event() {
  const params = useSearchParams();
  const eventId = params.get("eventId");
  const [eventData, setEventData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchEventAPIs(eventId, setEventData, setLoading);
    console.log(eventData);
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <div className="grid grid-cols-1 gap-6 flex md:grid-cols-6 lg:grid-cols-6">
            <div className="col-span-1 flex-1 bg-white p-8 rounded-lg md:col-span-4">
              Event ID: {eventId}
              <img
                className="mx-auto w-full object-cover max-h-96 flex-shrink-0"
                style={{ height: "500px" }}
                alt=""
              />
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
