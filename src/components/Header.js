import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black/90 to-transparent z-20 flex justify-between items-center">
      <img
        className="w-32 md:w-44 transition-transform duration-300 hover:scale-105"
        src={LOGO}
        alt="Netflix Logo"
      />

      {user && (
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 cursor-pointer transition-transform duration-300 hover:scale-110 hover:ring-2 hover:ring-red-600 rounded-full"
            src={user?.photoURL}
            alt="User Icon"
          />
          <button
            onClick={handleSignOut}
            className="text-white font-semibold bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
