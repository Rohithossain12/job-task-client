import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const {
    createUser,
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
    showPassword,
    setShowPassword,
  } = useAuth();

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // reset error message
    setErrorMessage("");
    if (password.length < 6) {
      setErrorMessage("password should be 6 character or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(" at least one uppercase,one lowercase,one number");
      return;
    }
    try {
      const result = await createUser(email, password);
      const user = result.user;
      setUsers(user);
      toast.success("Register Successful");

      const userData = {
        uid: user?.uid,
        name,
        email,
        photo,
      };

      // Send user data to the database using Axios
      await axios.post("https://job-task-server-nine-black.vercel.app/users", userData);
      event.target.reset();
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>

        {/* Email and Password Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-semibold text-gray-700"
            >
              PhotoURL
            </label>
            <input
              type="text"
              name="photo"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your PhotoURL "
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 "
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}

        {/* Custom Google Login Button with React Icons */}
        <div className="mt-4 text-center">
          <SocialLogin></SocialLogin>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-700">Already have an account?</span>
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Please Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
