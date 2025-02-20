import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, users, setUsers } = useAuth();

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUsers(user);
        toast.success(" Login successful");

        const userData = {
          uid: users?.uid,
          name: users?.displayName,
          email: users?.email,
          photo: users?.photoURL,
        };

        axios.post("http://localhost:5000/users", userData);

        navigate("/");
      })
      .catch(() => {
        toast.error(" Login Unsuccessful");
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full p-3 bg-white text-gray-800 rounded-md flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition duration-200"
      >
        <FaGoogle className="mr-2 text-xl" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
