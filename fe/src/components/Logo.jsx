export default function Logo({ size }) {
  return (
    <img
      src={
        "https://media.istockphoto.com/id/1321617070/id/vektor/logo-medis-kesehatan.jpg?s=612x612&w=0&k=20&c=zCH2ajNmvD2Z0peBNjXmY1WoR8bDhvxAgYevGH9U_XI="
      }
      alt="logo.png"
      className={`rounded-full object-cover h-${size} w-${size} my-2`}
    />
  );
}
