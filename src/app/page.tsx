import SearchBar from "@/components/home/SearchBar";
import OrderByFilter from "@/components/home/OrderByFilter";
import SelectSourceDropdown from "@/components/home/SelectSourceDropdown";

/** 
Layout for home page which displays the list of all posts
*/
export default function Home() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32">
      <div className="flex flex-col space-y-8">

        {/* Title and search and filter */}
        <div className="flex flex-col space-y-6">
          {/* Title */}
          <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-4xl 2xl:text-5xl'>What Singaporeans Are Yapping About</h1>


          {/* Search and filter */}
          <div className='flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0'>
            <SearchBar />
            <div className='flex flex-row justify-start items-center space-y-0 space-x-4'>
              <OrderByFilter />
              <SelectSourceDropdown />
            </div>
          </div>
        </div>

        {/* Cards for posts */}
        {/* TODO */}
        
      </div>
    </div>
  );

}
