import ParticipantInfo from "@/src/components/widgets/match/ParticipantInfo";
import ParticipantMembers from "@/src/components/widgets/match/ParticipantMembers";

export default function ParticipantProfile({ item }) {
  return (
    <>
      <ParticipantInfo item={item} />
      <ParticipantMembers item={item} />
    </>
  );
}
