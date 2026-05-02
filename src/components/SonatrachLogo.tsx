export function SonatrachLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Sonatrach">
      <circle cx="50" cy="50" r="48" fill="#005831"/>
      <ellipse cx="50" cy="50" r="35" fill="#004a28"/>
      <path d="M50 18C50 18 35 35 33 50C31 63 40 70 50 70C60 70 69 63 67 50C65 35 50 18 50 18Z" fill="#FFD700"/>
      <path d="M50 18C50 18 42 35 44 50C46 62 50 70 50 70C54 62 58 46 56 32Z" fill="#FFA500" opacity="0.6"/>
      <circle cx="50" cy="72" r="6" fill="#FFD700"/>
      <rect x="44" y="77" width="12" height="10" rx="2" fill="#FFD700"/>
    </svg>
  )
}
