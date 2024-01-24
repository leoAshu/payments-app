const Header = () => {
  return (
    <header className="shadow-md py-3 px-4">
      <div className="md:max-w-4xl xl:max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">Payments App</div>

        <div className="flex items-center">
          <div className="mr-3 font-medium">Hello, User</div>
          <div className="bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center font-medium">U</div>
        </div>
      </div>
    </header>
  )
}

export default Header
