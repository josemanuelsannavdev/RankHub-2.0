import PropTypes from "prop-types";
import MemberCard from "./MemberCard.jsx";
import MembersOptionsModal from "./MembersOptionsModal.jsx";
import useMemberSection from "../../hooks/useMemberSection.js";

const getMemberLabel = (member) => {
  return member?.email || member?.name || member?.username || "Member";
};

const ROLE_TAB_CONFIG = {
  subadmin: {
    title: "SUBADMIN",
    badgeText: "SECTION",
    badgeClassName: "bg-slate-300/20 text-slate-300 border border-slate-300/35",
    variant: "subadmin",
    buttonClassName:
      "data-[active=true]:bg-slate-300/20 data-[active=true]:text-slate-200 data-[active=true]:border-slate-300/40",
  },
  guest: {
    title: "GUEST",
    badgeText: "SECTION",
    badgeClassName: "bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/35",
    variant: "guest",
    buttonClassName:
      "data-[active=true]:bg-[#cd7f32]/20 data-[active=true]:text-[#cd7f32] data-[active=true]:border-[#cd7f32]/40",
  },
};

const MembersSection = ({
  currentRanking,
  members,
  loading,
  error,
  onRetry,
}) => {
  const {
    activeTab,
    setActiveTab,
    filteredMembers,
    getMemberVariant,
    openOptionsForMember,
    optionsMember,
    handleOptionsClick,
    handleChangeRole,
    handleDelete,
    handleCloseOptions,
  } = useMemberSection({ currentRanking, members });

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
            Members
          </h2>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            {currentRanking?.name || "Active ranking"}
          </p>
        </div>
      </div>

      <div className="mb-8" role="tablist" aria-label="Ranking sections">
        <div className="inline-flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low/50 p-1 backdrop-blur-sm">
          {Object.entries(ROLE_TAB_CONFIG).map(([key, config]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              data-active={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={`rounded-lg border border-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors ${config.buttonClassName}`}
            >
              {config.title}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-3">
        {filteredMembers.map((member) => (
          <li key={member.id ?? getMemberLabel(member)}>
            <MemberCard
              member={member}
              variant={getMemberVariant(member)}
              onClickOption={handleOptionsClick}
            />
          </li>
        ))}
      </ul>

      {openOptionsForMember && (
        <MembersOptionsModal
          member={optionsMember}
          onChangeRole={handleChangeRole}
          onDelete={handleDelete}
          onClose={handleCloseOptions}
        />
      )}
    </section>
  );
};

MembersSection.propTypes = {
  currentRanking: PropTypes.shape({
    name: PropTypes.string,
  }),
  members: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRetry: PropTypes.func,
};

export default MembersSection;
