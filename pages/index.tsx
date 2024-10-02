import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-3 m-0-auto forest-bg min-h-screen max-h-screen">
      <h1>Mathler. For Dynamic, by Joseph.</h1>

      <Link
        className="text-[12px] mt-3 underline decoration-dotted text-[#386e39] flex items-center"
        href="https://github.com/josephwilliams/"
        target="_blank"
      >
        Github
      </Link>
    </div>
  );
}
