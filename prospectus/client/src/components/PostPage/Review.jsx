import React from "react"
import { Star } from 'lucide-react'
import { formatDistance } from 'date-fns'

export default function Review({ review }) {
    return (
        <div className="w-64 h-auto border-2 p-2 rounded-lg">
            <div className="flex gap-1 p-2">
                {Array.from({ length: review.stars }, () => (
                    <Star fill="#000000" strokeWidth={1} />
                ))}
                {Array.from({ length: 5 - review.stars }, () => (
                    <Star strokeWidth={1} />
                ))}
            </div>
            <p className="p-2">{review.text}</p>
            <div className="flex gap-2 items-center">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 m-2">
                        <img src={review.reviewerProfile.avatar} />
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    {review.reviewerProfile.name}
                    <br />
                    {formatDistance(review.time, Date(), { addSuffix: true })}
                </div>
            </div>
        </div>
    )
}