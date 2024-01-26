"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
    Draggable,
    DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { type Event as CalEvent } from "@/app/types/calendar";
import { useEffect, useState, useContext } from "react";
import { title } from "process";
import { EventModal } from "./EventModal";
import { Button } from "../ui/button";
import { DataContext } from "@/app/context/Providers";

export default function Calendar(): JSX.Element {
    const { transformedEvents } = useContext(DataContext);
    const [currentEvent, setCurrentEvent] = useState<CalEvent | null>(null);
    const [allEvents, setAllEvents] = useState<CalEvent[]>([]);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    useEffect(() => {
        if (transformedEvents) {
            setAllEvents(transformedEvents);
        }
    }, [transformedEvents]);

    //we getting the date, to pass it later into New Event Form
    const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
        setCurrentEvent({
            start: arg.date,
            id: new Date().getTime().toString(),
        });
        setShowEventModal(true);
    };

    const handleCreateAppointment = (): void => {
        handleDateClick;
    };

    return (
        <main className="w-full overflow-hidden">
            <Button
                className="px-4 py-2 rounded-md mb-10"
                onClick={handleCreateAppointment}
            >
                Create new appointment
            </Button>
            <FullCalendar
                height="auto"
                contentHeight={600}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridDay,timeGridWeek,dayGridMonth",
                }}
                nowIndicator={true}
                selectMirror={true}
                dateClick={handleDateClick}
                // eventClick={}
                events={allEvents}
                eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                handleWindowResize
            />
            {showEventModal && currentEvent && (
                <EventModal
                    isOpen={showEventModal}
                    handleClose={setShowEventModal}
                    selectedDate={currentEvent.start}
                    allEvents={allEvents}
                    setAllEvents={setAllEvents}
                />
            )}
        </main>
    );
}
