import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main
      className="mx-auto px-4 py-8 w-full"
      style={{ maxWidth: 480 }}
    >
      <Calculator />
    </main>
  );
}
