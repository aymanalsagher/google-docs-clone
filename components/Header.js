import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";

function Header() {
  const [session] = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 bg-white shadow-md">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden w-20 h-20 border-0 md:inline-flex"
      >
        <Icon name="menu" size="3xl" />
      </Button>

      <Icon name="description" size="4xl" color="blue" />
      <h1 className="hidden ml-2 text-2xl text-gray-700 md:inline-flex">
        Docs
      </h1>

      <div className="flex items-center flex-grow px-5 py-2 mx-5 text-gray-600 bg-gray-100 rounded-lg md:mx-10 focus-within:text-gray-600 focus-within:shadow-md focus-within:bg-gray-200 ">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden w-20 h-20 ml-1 border-0 md:inline-flex"
      >
        <Icon name="apps" size="3xl" />
      </Button>

      <img
        onClick={signOut}
        loading="lazy"
        className="w-10 h-10 ml-1 rounded-full cursor-pointer md:w-12 md:h-12 md:ml-2"
        src={session?.user?.image}
        alt=""
      />
    </header>
  );
}

export default Header;
