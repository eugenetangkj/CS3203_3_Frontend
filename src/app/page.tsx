import Image from "next/image";
import SearchBar from "@/components/home/SearchBar";
import OrderByFilter from "@/components/home/OrderByFilter";

export default function Home() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-6">
          {/* Title */}
          <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-4xl xl:text-5xl'>What Singaporeans Are Yapping About</h1>


          {/* Search and filter */}
          <div className='flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0'>
            <SearchBar />
            <OrderByFilter />
            


     

          </div>
        </div>

        {/* Cards for posts */}
        
      </div>






        
      












{/* 




      <footer classNameName="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          classNameName="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          classNameName="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          classNameName="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
