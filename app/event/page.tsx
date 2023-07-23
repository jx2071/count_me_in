'use client'
import { useSearchParams } from 'next/navigation'
import { useState,useEffect } from 'react'
import fetchEventAPIs from '../api/EventAPI'
export default function Event(){
    const params = useSearchParams()
    const eventId = params.get('eventId')
    const [eventData,setEventData] = useState<any[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    useEffect(() => {
        fetchEventAPIs(eventId,setEventData,setLoading)
        console.log(eventData)
    },[])

    return(<div>
        {!loading &&<>
        <h1>Event ID: {eventId}</h1>
        <h1>{eventData[0].title}</h1>
        <p>{eventData[0].body}</p>
        </> 
        }
        </div>)
}