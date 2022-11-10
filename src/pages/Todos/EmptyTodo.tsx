import React from "react"
import background from "../../assets/Checklist.jpg"

export const EmptyTodo: React.FC = () => {
    return (
        <div>
            <img src={background} className="background" alt="" />
        </div>
    )
}
