import { useUser } from '../context/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Login() {
  const { loginWithGithub, loginWithGoogle } = useUser()

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center gap-3 w-full max-w-xs">
        <button
          type="button"
          className="flex justify-center items-center w-full px-3 py-2 text-[#0D0D0D] bg-[#F2F2F2] border border-[#333333] shadow-lg rounded-md dark:border-none dark:shadow-none"
          onClick={loginWithGoogle}
        >
          <FontAwesomeIcon icon={faGoogle} size="xl" />
          <span className="ml-3">Login with Google</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center w-full px-3 py-2 text-[#0D0D0D] bg-[#F2F2F2] border border-[#333333] shadow-lg rounded-md dark:border-none dark:shadow-none"
          onClick={loginWithGithub}
        >
          <FontAwesomeIcon icon={faGithub} size="xl" />
          <span className="ml-3">Login with Github</span>
        </button>
      </div>
    </>
  )
}
