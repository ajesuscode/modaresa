"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewEventForm } from "./NewEventForm";
import { type Event as CalEvent } from "@/app/types/calendar";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface EventModalProps {
    isOpen: boolean;
    selectedDate: Date | string;
    allEvents: CalEvent[];
    handleClose: Dispatch<SetStateAction<boolean>>;
    setAllEvents: (events: CalEvent[]) => void;
}

export function EventModal({
    isOpen,
    handleClose,
    selectedDate,
    setAllEvents,
    allEvents,
}: EventModalProps): JSX.Element {
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogTrigger />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New appointment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <NewEventForm
                        selectedDate={selectedDate}
                        setAllEvents={setAllEvents}
                        allEvents={allEvents}
                        handleClose={handleClose}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
