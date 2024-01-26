"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import type { Event, Appointment, Client, Member } from "@/app/types/calendar";
import { fetchDataAndSetData } from "@/lib/data";
import { DataContextType } from "@/app/types/calendar";

const defaultState: DataContextType = {
    events: [],
    members: [],
    clients: [],
    transformedEvents: [],
};

export const DataContext = createContext<DataContextType>(defaultState);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<DataContextType>(defaultState);

    useEffect(() => {
        fetchDataAndSetData(setData);
    }, []);

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
