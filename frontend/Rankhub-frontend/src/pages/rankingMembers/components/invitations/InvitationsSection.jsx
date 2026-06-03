import PropTypes from "prop-types";
import { useMemo } from "react";
import InvitationCard from "./InvitationCard.jsx";
import { cancelInvitation } from "../../../../services/invitationApi.js";


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

const InvitationsSection = ({ currentRanking, invitations, loading, error }) => {
  const hasInvitations = Array.isArray(invitations) && invitations.length > 0;
  const invitationSummary = useMemo(() => {
    if (!hasInvitations) {
      return "No invitations yet";
    }

    return `${invitations.length} invitation${invitations.length === 1 ? "" : "s"}`;
  }, [hasInvitations, invitations.length]);

 const handleCancelInvitation = (invitation) => {
    if (!invitation) {
      console.warn("No invitation provided for cancellation.");
      return;
    }
    cancelInvitation(invitation?.id )
      .then(() => {
        console.log("Invitation cancelled successfully");
      })
      .catch((error) => {
        console.error("Error cancelling invitation:", error);
      });


  }
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
        {invitations.map((invitation, index) => (
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
  onInviteClick: PropTypes.func,
};

export default InvitationsSection;
