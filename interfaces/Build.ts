import { Area } from "./Area"

export interface Build {
    Id: string
    BuildTitle: string
    Map: string
    Worship: string
    Areas: Area[]
}