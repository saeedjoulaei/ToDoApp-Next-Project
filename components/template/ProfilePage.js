import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {};

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      <ProfileForm
        name={name}
        password={password}
        lastName={lastName}
        setName={setName}
        setLastName={setLastName}
        setPassword={setPassword}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default ProfilePage;
