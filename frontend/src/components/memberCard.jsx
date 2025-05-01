import { Link } from "react-router-dom";
import { FaUser, FaEye } from "react-icons/fa";

const MemberCard = ({ member }) => {

  return (
    <div className="card" style={{ padding: 0, height: "100%" }}>
      <div
        style={{
          position: "relative",
          paddingBottom: "75%",
          overflow: "hidden",
        }}
      >
        {member.profileImage ? (
          <img
            src={member.profileImage}
            alt={`${member.name}'s profile`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            className="image-placeholder"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9ecef",
            }}
          >
            <FaUser size={40} />
          </div>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "8px", color: "var(--primary-color)" }}>
          {member.name}
        </h3>
        <p
          style={{
            color: "var(--gray-color)",
            fontSize: "1rem",
            marginBottom: "15px",
          }}
        >
          {member.role}
        </p>

        <Link
          to={`/members/${member._id}`}
          className="button"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            },
          }}
        >
          <FaEye /> View Details
        </Link>
      </div>
    </div>
  );
};

export default MemberCard;
