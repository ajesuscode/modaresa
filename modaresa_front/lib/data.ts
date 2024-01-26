import { Appointment, Member, Client, Event } from "@/app/types/calendar";
import { DataContextType } from "@/app/types/calendar";

export async function fetchDataAndSetData(
    setData: React.Dispatch<React.SetStateAction<DataContextType>>
): Promise<void> {
    try {
        const [eventsResponse, membersResponse, clientsResponse] =
            await Promise.all([
                fetch(
                    `${process.env.NEXT_PUBLIC_MODARESA_FRONTEND_URL}/appointments/all`,
                    { cache: "no-store" }
                ),
                fetch(
                    `${process.env.NEXT_PUBLIC_MODARESA_FRONTEND_URL}/members/all`,
                    { cache: "no-store" }
                ),
                fetch(
                    `${process.env.NEXT_PUBLIC_MODARESA_FRONTEND_URL}/clients/all`,
                    { cache: "no-store" }
                ),
            ]);

        if (!eventsResponse.ok || !membersResponse.ok || !clientsResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const [events, members, clients] = await Promise.all([
            eventsResponse.json() as Promise<Appointment[]>,
            membersResponse.json() as Promise<Member[]>,
            clientsResponse.json() as Promise<Client[]>,
        ]);

        const transformedEvents: Event[] = events?.map((event) => {
            const member = members.find(
                (m) => Number(m.memberId) === event.memberId
            ) || { name: "Unknown" };
            const client = clients.find(
                (c) => Number(c.companyId) === event.companyId
            ) || { companyName: "Unknown" };
            return {
                id: event.appointmentId!,
                title: `${member.name || "Unknown"}, meets ${
                    client.companyName || "Unknown"
                }`,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
                member: member.name,
                company: client.companyName,
            };
        });

        setData({ events, members, clients, transformedEvents });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function createAppointment(
    appointment: Appointment
): Promise<void> {
    await fetch(
        `${process.env.NEXT_PUBLIC_MODARESA_FRONTEND_URL}/appointments/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
        }
    );
}
