// import RipenForm from "~/components/RipenForm";
import dynamic from "next/dynamic";
const RipenForm = dynamic(() => import("~/components/RipenForm"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main>
      <RipenForm />
    </main>
  );
}
