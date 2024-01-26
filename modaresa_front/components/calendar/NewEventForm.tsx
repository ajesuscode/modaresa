"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, setMinutes, setHours } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { type Member, Client, Event as CalEvent } from "@/app/types/calendar";
import { start } from "repl";
import { fi } from "date-fns/locale";
import { Input } from "../ui/input";
import { DataContext } from "@/app/context/Providers";
import { createAppointment } from "@/lib/data";
import { Dispatch, SetStateAction } from "react";

interface NewEventFormProps {
    selectedDate: Date | string;
    allEvents: CalEvent[];
    setAllEvents: (events: CalEvent[]) => void;
    handleClose: Dispatch<SetStateAction<boolean>>;
}

//we need it to validate form inputs
const FormSchema = z.object({
    member: z.string({ required_error: "A staff member is required." }),
    client: z.string({ required_error: "A client is required." }),
    date: z.date({
        required_error: "A date of appointment is required.",
    }),
    startTime: z.string({ required_error: "Start time is required" }),
    endTime: z.string({ required_error: "End time is required" }),
});

export function NewEventForm({
    selectedDate,
    allEvents,
    setAllEvents,
    handleClose,
}: NewEventFormProps): JSX.Element {
    const { members, clients } = useContext(DataContext);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date:
                typeof selectedDate === "string"
                    ? new Date(selectedDate)
                    : selectedDate,
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const { date, startTime, endTime, member, client } = data;

            //assigning hours and minutes to our date
            const [startHours, startMinutes] = startTime.split(":").map(Number);
            const [endHours, endMinutes] = endTime.split(":").map(Number);
            const startDate = setMinutes(
                setHours(date, startHours),
                startMinutes
            );
            const endDate = setMinutes(setHours(date, endHours), endMinutes);

            const currentEvent = {
                start: startDate,
                end: endDate,
                allDay: false,
                title: "New Event",
                id: new Date().getTime().toString(),
            };

            const eventToDb = {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                memberId: Number(member),
                companyId: Number(client),
            };

            createAppointment(eventToDb);

            setAllEvents([...allEvents, currentEvent]);
            handleClose(false);
        } catch (error) {
            alert(error);
        }
    }

    function handleSetMember(id: string): string {
        const memberSelected = members.find(
            (member) => Number(member.memberId) === Number(id)
        );
        return memberSelected?.name + " " + memberSelected?.lastName;
    }

    function handleSetClient(id: string): string {
        const clientSelected = clients.find(
            (client) => Number(client.companyId) === Number(id)
        );
        return clientSelected?.companyName ?? "";
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="member"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Member</FormLabel>
                            <Select onValueChange={onChange} value={value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a staff member">
                                            {handleSetMember(value)}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {members?.map((member: Member) => (
                                        <SelectItem
                                            key={member.memberId}
                                            value={member.memberId}
                                        >
                                            {member.name} {member.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="client"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <Select
                                onValueChange={onChange}
                                defaultValue={value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a client">
                                            {handleSetClient(value)}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clients?.map((client: Client) => (
                                        <SelectItem
                                            key={client.companyId}
                                            value={client.companyId}
                                        >
                                            {client.companyName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Appointment date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className="w-[240px] pl-3 text-left font-normal"
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}

                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            typeof selectedDate === "string"
                                                ? new Date(selectedDate)
                                                : selectedDate
                                        }
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <Input type="time" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <Input type="time" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Create</Button>
            </form>
        </Form>
    );
}
