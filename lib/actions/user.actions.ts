'use server'

import { currentUser } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"

export async function getUser() {
    const user = await currentUser()
    return parseStringify(user)
}