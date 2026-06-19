import PropTypes from "prop-types";
import InvitationCard from "./InvitationCard.jsx";
import useInvitationSection from "../../hooks/useInvitationSection.js";


const resolveInvitationLabel = (invitation) => {
  if (typeof invitation === "string") {
    return invitation;
  }

  return (
    invitation?.email ||
    invitation?.recipientEmail ||
    invitation?.targetEmail ||
    invitation?.invitedEmail ||
    invitation?.name ||
    "Invitation"
  );
};

const resolveInvitationStatus = (invitation) => {
  if (typeof invitation === "string") {
    return "pending";
  }

  return invitation?.status || invitation?.state || invitation?.role || "pending";
};

const InvitationsSection = ({ currentRanking, invitations, loading, error, onRetry }) => {
  const { invitationList, invitationSummary, handleCancelInvitation } =
    useInvitationSection({ invitations, onInvitationsUpdated: onRetry });

  return (
    <section className="mb-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
              Invitations Pending
            </h2>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              {currentRanking?.name || "Active ranking"} · {invitationSummary}
            </p>
          </div>

        </div>

       <ul className="space-y-3">
        {invitationList.map((invitation) => (
          <li
            key={invitation?.id }
            
          >
            <InvitationCard
              invitation={invitation}
              onClickCancel={handleCancelInvitation}
            />
           </li>
        ))}
      </ul>
      
    </section>
  );
};

InvitationsSection.propTypes = {
  currentRanking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }),
  invitations: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRetry: PropTypes.func,
};

export default InvitationsSection;
