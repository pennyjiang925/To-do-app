import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Todo } from "../../types"

import { Rows } from "./Rows"

export default {
    title: "Rows",
    component: Rows,
} as ComponentMeta<typeof Rows>

export const ROWS = (args: Todo) => <Rows {...args} />

export const Default: ComponentStory<typeof Rows> = () => (
    <Rows
        content={"hello"}
        description={"world"}
        due_date={"2022-10-26"}
        is_completed={false}
    />
)
