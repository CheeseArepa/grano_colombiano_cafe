export function IconoGranoCafe({ tamano = 22, className = '', relleno = '#F5E9D3', trazo = '#3B2418' }) {
  return (
    <svg
      className={className}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cuerpo del grano: forma orgánica, ligeramente asimétrica */}
      <path
        d="M12.2 2.4C8.9 2.1 5.1 4.6 4.3 8.9C3.5 13.2 6 18.3 10.4 19.6C14.8 20.9 19.3 17.9 20.1 13.4C20.9 8.9 17.9 4.5 13.9 2.9C13.3 2.7 12.7 2.5 12.2 2.4Z"
        fill={relleno}
      />
      {/* Hendidura central característica del grano */}
      <path
        d="M12.6 3.6C10.3 6 13.2 9 11.6 12C10 15 13 17.8 10.8 20.4"
        stroke={trazo}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
