interface ModalProps {
  isOpen: boolean
  userId: string
  firstName: string
  lastName: string
  closeModal: () => void
}

const Modal = ({ isOpen, closeModal, firstName, lastName }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#f5f5f5]" onClick={closeModal}>
          <div
            className="bg-white w-96 p-8 rounded-md shadow-lg flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl font-semibold">Send Money</div>

            <div className="mt-10 flex w-full justify-start items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-semibold flex justify-center items-center">
                {firstName.charAt(0).toUpperCase()}
                {lastName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4 text-lg font-semibold">
                {firstName} {lastName}
              </div>
            </div>

            <form className="mt-6 flex flex-col w-full">
              <label className="mb-2 text-xs font-semibold">Amount (in USD)</label>
              <input
                type="number"
                className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
                placeholder="Enter amount"
                name="amount"
                required
              />

              <input
                type="submit"
                className="mt-6 bg-green-500 text-white py-2 rounded-md text-sm font-medium"
                value="Initiate Transfer"
              />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
