'use server'
import { cookies } from 'next/headers'
import OnboardingClient from './client.page'


const getCookie = async (name: string) => {
  const cookieStore = await cookies()
  return cookieStore.get(name)
}

export default async function Page() {
  const celebrityRandomNumber = Math.random()
  const username = await getCookie('wswe_username')
  return <OnboardingClient initialCelebrityNumber={celebrityRandomNumber} initialUsername={username?.value} />
}