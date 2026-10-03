
import type {Group, Event} from "@/types/group";


export type User = {

    name: string;
    groups: Group[];
    nextEvent: Event[]

}