'use client'

import moment from 'moment'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR(
    'https://api.openweathermap.org/data/2.5/weather?q=neftekamsk&units=metric&appid=7484f462f852c04cbab6a6a5ad8c9d37',
    fetcher,
  )
  const [millis, setMillis] = useState(0) // Store elapsed time in milliseconds
  const [startTime] = useState<number>(Date.now()) // Set the initial start time when component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      setMillis(Date.now() - startTime) // Update elapsed time
    }, 100)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval)
  }, [startTime])

  const time = moment.utc(millis).format('mm:ss:SSS')

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <div>
        <h1 className='text-xl font-bold mb-2'>catboy</h1>
        <div className='mb-4 text-overlay0'>
          {data && !error && (
            <p>
              he/they, {Math.round(data.main.temp)}°C {data.weather[0].description}, {time}
            </p>
          )}
        </div>
      </div>
      <ul className='animated-list grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>github</span>
            <a
              className='underlined'
              href='https://github.com/catboy009'
            >
              catboy009
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>email</span>
            <a
              className='underlined'
              href='mailto:catboy@catboy.at'
            >
              catboy@catboy.at
            </a>
          </div>
        </li>
      </ul>
      <h2 className='text-xl font-bold mt-16 mb-4'>projects</h2>
      <ul className='animated-list grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>view your weather</span>
            <a
              className='underlined'
              href='https://weather.catboy.at'
            >
              weather
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>simple todo app</span>
            <a
              className='underlined'
              href='https://todo.catboy.at'
            >
              todo
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>information about countries</span>
            <a
              className='underlined'
              href='https://cn.catboy.at'
            >
              countryinfo
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>cli information about countries</span>
            <a
              className='underlined'
              href='https://github.com/catboy009/countryfetch-rs'
            >
              countryfetch-rs
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>information about ip's</span>
            <a
              className='underlined'
              href='https://ip.catboy.at'
            >
              ipinfo
            </a>
          </div>
        </li>
        <li>
          <div className='flex flex-col'>
            <span className='text-overlay0'>track postal shipments</span>
            <a
              className='underlined'
              href='https://tracking.catboy.at'
            >
              tracking
            </a>
          </div>
        </li>
      </ul>
    </main>
  )
}
