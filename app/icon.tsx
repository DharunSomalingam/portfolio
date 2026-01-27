import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: '#000000', // Matches your bg-black
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20%', // Classy rounded look
                    border: '1px solid #333', // Subtle border
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f97316" // Matches text-orange-500
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}