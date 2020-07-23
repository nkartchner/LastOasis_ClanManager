import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { RequestToJoin, User } from "../../models";
import RequestDialog from "./Requests/RequestReasonDialog";

import * as UserActions from "../../store/user/user.actions";

interface Props {
  user: User;
  clanId: number;
  members: User[];
  requests: RequestToJoin[];
  navigateTo: (path: string) => void;
  updateMembers: (members: User[]) => void;
  updateRequests: (requests: RequestToJoin[]) => void;
}

const ClanDetailsHeader: React.FC<Props> = ({
  user,
  clanId,
  members,
  requests,
  navigateTo,
  updateMembers,
  updateRequests,
}) => {
  const [dialogOpen, toggleDialog] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const handleDisban = () => {
    if (
      clanId &&
      window.confirm(
        "Are you sure you want to disban the clan?? All members will be removed from the clan!"
      )
    ) {
      Axios.delete("/api/clan/delete/" + clanId)
        .then(() => {
          dispatch(
            UserActions.updateUser({ ...user!, clan: null, clanId: null })
          );
          navigateTo("/clans");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmitToJoin = (reason: string) => {
    toggleDialog(false);
    Axios.post<RequestToJoin>(`/api/clan/${clanId}/join`, {
      UserId: user.id,
      ClanId: clanId,
      Reason: reason,
    })
      .then((response) => {
        updateRequests([...requests, response.data]);
      })
      .catch((err) =>
        console.log("Something went wrong when requesting to join", err)
      );
  };
  const handleLeaveClan = () => {
    Axios.post(`/api/clan/${clanId}/leave`)
      .then((response) => {
        updateMembers(members.filter((u) => u.id !== user.id));
      })
      .catch((err) => console.log(err));
  };

  const handleRequestToJoin = () => {
    toggleDialog(true);
  };

  const handleCancel = () => {
    const index = requests.findIndex((r) => r.userId === user!.id);
    const request = requests[index];
    Axios.post(`/api/clan/${request.id}/cancel`, null)
      .then(() => {
        updateRequests(requests.filter((req) => req.id !== request.id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user.clanId ? (
        user.clanId === clanId && user.role === "Founder" ? (
          <Button variant="contained" color="secondary" onClick={handleDisban}>
            Disban Clan
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={handleLeaveClan}
          >
            Leave Clan
          </Button>
        )
      ) : requests.findIndex((r) => r.userId === user.id) !== -1 ? (
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel Request
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestToJoin}
        >
          Request To Join
        </Button>
      )}
      <RequestDialog
        close={() => toggleDialog(false)}
        isOpen={dialogOpen}
        submit={handleSubmitToJoin}
      />
    </>
  );
};

export default ClanDetailsHeader;
