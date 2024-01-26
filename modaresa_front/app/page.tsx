import Image from "next/image";
import Calendar from "../components/calendar/Calendar";
import type { Event, Appointment, Client, Member } from "@/app/types/calendar";

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start px-24 py-6 overflow-hidden">
            <div className="w-full bg-slate-300 mb-8 rounded-md p-2">
                <h1 className="font-bold text-xs">ModaResa Calendar </h1>
            </div>
            <Calendar />
        </main>
    );
}
