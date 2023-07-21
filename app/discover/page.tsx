import { UserPlusIcon , FireIcon  } from '@heroicons/react/20/solid'

export type Event = {
    id:string,
    name:string,
    category:string,
    start_time:string,
    location:string,
    duration:string,
    max_person:number,
    current_person:number,
    imageUrl:string
}

const events:Event[] = [
  {
    id:"1",
    name: 'Casual Poker Party',
    category: 'Entertainment',
    start_time: '07/20/2023 14:00 PM',
    location: 'Williamsburg, Brooklyn',
    duration: '2 hours',
    max_person: 6,
    current_person: 3,
    imageUrl:
      'https://www.tightpoker.com/app/uploads/2023/01/Ultimate-Texas-Holdem-2-scaled-1.jpg',
  },
  {
    id:"2",
    name: 'Catan Night',
    category: 'Entertainment',
    start_time: '07/20/2023 19:00 PM',
    location: 'Long Island City, Queens',
    duration: '2 hours',
    max_person: 4,
    current_person: 1,
    imageUrl:
      'https://shop.asmodee.com/product/image/large/cn3071-5.jpg',
  },
  {
    id:"3",
    name: 'Badminton Play',
    category: 'Sports',
    start_time: '07/20/2023 12:00 PM',
    location: 'Rego Park, Brooklyn',
    duration: '4 hours',
    max_person: 2,
    current_person: 2,
    imageUrl:
      'https://www.sportsengine.com/sites/default/files/styles/content_1024_w/public/images/shutterstock_1493553380.jpg?itok=IfOk6QOh',
  },
]

export default function Discover() {

    const progress = (current:number, max:number) => {
        return (current/max)*100+"%";
    }

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {events.map((event) => (
        <li
          key={event.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto w-full object-cover max-h-60 flex-shrink-0" src={event.imageUrl} alt="" />
            <h2 className="mt-6 text-lg font-medium text-gray-900">{event.name}</h2>
            <dl className="mt-4 gap-2 flex flex-grow flex-col justify-between text-left">
              <dt className="sr-only">Category</dt>
              <dd className="text-sm text-gray-500">
              <span className="text-black">
                📜 Category:{" "}
                </span> {event.category}</dd>
              <dt className="sr-only">Start Time</dt>
              <dd className="text-sm text-gray-500">
                <span className="text-black">
                📅 Start Time:{" "}
                </span>
                {event.start_time}</dd>
                <dd className="text-sm text-gray-500">
                <span className="text-black">
                🌍 Location:{" "}
                </span>
                {event.location}</dd>
                <dd className="text-sm text-gray-500">
                <span className="text-black">
                ⏳ Duration:{" "}
                </span>
                {event.duration}</dd>
              <dt className="sr-only">Progress</dt>
              <dd className="mt-3 flex flex-row">
                {event.current_person !== event.max_person ? (<>
              <div className="w-3/4 bg-green-100 rounded-full h-1.5 mt-2 dark:bg-green-500 ">
  <div className="bg-green-600 h-1.5 rounded-full dark:bg-green-500" style={{width:progress(event.current_person,event.max_person)}}></div>
</div>
                <div className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {event.current_person}/{event.max_person}
                </div>
                </>)
                :(<>
                    <div className="w-3/4 bg-red-100 rounded-full h-1.5 mt-2 dark:bg-red-500 ">
        <div className="bg-red-600 h-1.5 rounded-full dark:bg-red-500" style={{width:progress(event.current_person,event.max_person)}}></div>
      </div>
                      <div className="ml-2 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        {event.current_person}/{event.max_person}
                      </div>
                      </>)}
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <UserPlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Join
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <FireIcon  className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Details
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}