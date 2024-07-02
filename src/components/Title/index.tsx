import React from "react"

interface TitleProps {
    text: string
}

export function Title({ text }: TitleProps) {
    return (
        <h3 id="title">{ text }</h3>
    )
}