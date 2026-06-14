import { useCallback, useMemo, useState } from "react";
import {
  changeMemberRole,
  deleteMember,
} from "../../../services/rankingApi.js";

const getMemberVariant = (member) => {
  const role = String(member?.role || "subadmin").toLowerCase();

  if (role.includes("guest")) {
    return "guest";
  }

  if (role.includes("sub_admin")) {
    return "subadmin";
  }

  return "admin";
};

const useMemberSection = ({ currentRanking, members }) => {
  const [activeTab, setActiveTab] = useState("subadmin");
  const [openOptionsForMember, setOpenOptionsForMember] = useState(false);
  const [optionsMember, setOptionsMember] = useState(null);

  const filteredMembers = useMemo(() => {
    const safeMembers = Array.isArray(members) ? members : [];
    return safeMembers.filter((member) => getMemberVariant(member) === activeTab);
  }, [activeTab, members]);

  const handleOptionsClick = useCallback((member) => {
    console.log("Options clicked for member:", member);
    setOptionsMember(member);
    setOpenOptionsForMember(true);
  }, []);

  const handleCloseOptions = useCallback(() => {
    setOpenOptionsForMember(false);
  }, []);

  const handleChangeRole = useCallback(
    async (member) => {
      if (!currentRanking?.id || !member?.email) {
        setOpenOptionsForMember(false);
        return;
      }

      console.log(`Changing role for member ${member.email} ${currentRanking.id} `);
      try {
        await changeMemberRole(currentRanking.id, member.email);
        console.log(`Role changed successfully for member ${member.email}`);
      } catch (error) {
        console.error(`Error changing role for member ${member.email}:`, error);
      } finally {
        setOpenOptionsForMember(false);
      }
    },
    [currentRanking?.id],
  );

  const handleDelete = useCallback(
    async (member) => {
      if (!currentRanking?.id || !member?.email) {
        setOpenOptionsForMember(false);
        return;
      }

      console.log(`Deleting member ${member.email}`);
      try {
        await deleteMember(currentRanking.id, member.email);
        console.log(`Member deleted successfully: ${member.email}`);
      } catch (error) {
        console.error(`Error deleting member ${member.email}:`, error);
      } finally {
        setOpenOptionsForMember(false);
      }
    },
    [currentRanking?.id],
  );

  return {
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
  };
};

export default useMemberSection;
