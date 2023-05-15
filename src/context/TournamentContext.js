import {
  useState,
  useCallback,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import store from "@/lib/firestore/collections";
import { useAuthContext } from "./AuthContext";
import Splash from "../content/Splash";

const TournamentContext = createContext({});

export const useTournamentContext = () => useContext(TournamentContext);

const TournamentProvider = (props) => {
  const { user } = useAuthContext();
  const [tournaments, setTournaments] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //     axios.get('/api/tournament').then(res => {
  //         console.log(res.data)
  //     })
  // }, [])

  /** Begin Organization Data / Functions */
  const [organizations, setOrganizations] = useState({});
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [organizationLoading, setOrganizationLoading] = useState(false);
  const [activeOrganizationCount, setActiveOrganizationCount] = useState(0);
  const organization = {
    organizations,
    setOrganizations,
    current: useMemo(() => currentOrganization, [currentOrganization]),
    setCurrent: setCurrentOrganization,
    activeCount: useMemo(
      () => activeOrganizationCount,
      [activeOrganizationCount]
    ),
    setActiveCount: setActiveOrganizationCount,
    create: async (newOrganization) => {
      const res = await store.organization.save(null, newOrganization);
      return res;
    },
    read: async (uid) => {
      setOrganizationLoading(true);
      const res = await store.organization.read(
        uid,
        async (data, active) => {
          await setOrganizations(data);
          setActiveOrganizationCount(active);
          console.info("organizations:", data, active);
        },
        () => setOrganizationLoading(false)
      );
    },
    update: async (id, newOrganization) => {
      const res = await store.organization.save(id, newOrganization);
      return res;
    },
    delete: async (id) => {
      res = await store.organization.save(id, { deleted: true });
      return res;
    },
    upload: store.organization.uploadFile,
  };
  /** End Organization Data / Functions */

  /** Begin Event Data / Functions */
  const [events, setEvents] = useState({});
  const [allEvents, setAllEvents] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [activeEventCount, setActiveEventCount] = useState({});
  const event = {
    events,
    setEvents,
    current: useMemo(() => currentEvent, [currentEvent]),
    setCurrent: setCurrentEvent,
    activeCount: useMemo(() => activeEventCount, [activeEventCount]),
    setActiveCount: setActiveEventCount,
    create: async (newEvent) => {
      const res = await store.event.save(null, newEvent);
      return res;
    },
    read: async (uid) => {
      setEventLoading(true);
      const res = await store.event.read(
        "",
        async (data, active) => {
          await setEvents(data);
          setActiveEventCount(active);
          console.info("events:", data, active);
        },
        () => setEventLoading(false)
      );
    },
    readAll: async () => {
      setEventLoading(true);
      const res = await store.event.read(
        "",
        async (data) => {
          setAllEvents(data);
          console.info("all events:", data);
        },
        () => setEventLoading(false)
      );
    },
    update: async (id, newEvent) => {
      const res = await store.event.save(id, newEvent);
      return res;
    },
    delete: async (id) => {
      res = await store.event.save(id, { deleted: true });
      return res;
    },
    upload: store.event.uploadFile,
    addParticipant: async (id, tid) => {
      if (events[id].participants?.length >= events[id].participantsCount) {
        alert(
          "Only " + events[id].participantsCount + " participants are allowed."
        );
        return {
          code: "failed",
          message:
            "Only " +
            events[id].participantsCount +
            " participants are allowed.",
        };
      }
      if (events[id].participants?.findIndex((val) => val.tid === tid) >= 0) {
        alert("This team is already registered.");
        return {
          code: "failed",
          message: "This team is already registered.",
        };
      }
      let newParticipants = events[id]?.participants;
      if (!newParticipants) newParticipants = [];
      newParticipants = [
        ...newParticipants,
        {
          tid,
          score: 0,
          wins: 0,
          loses: 0,
          draws: 0,
          deleted: false,
          createdAt: new Date(),
          registeredAt: new Date(),
        },
      ];

      const res = await event.update(id, { participants: newParticipants });
      return res;
    },
  };
  /** End Event Data / Functions */

  /** Begin Team Data / Functions */
  const [teams, setTeams] = useState({});
  const [teamLoading, setTeamLoading] = useState(true);
  const team = {
    teams,
    setTeams,
    create: async (newTeam) => {
      const res = await store.team.save(nanoid(5), newTeam);
      return res;
    },
    read: async (uid) => {
      setTeamLoading(true);
      const res = await store.team.read(
        uid,
        async (data) => {
          await setTeams(data);
          console.info("teams:", data);
        },
        () => setTeamLoading(false)
      );
    },
    update: async (id, newTeam) => {
      const res = await store.team.save(id, newTeam);
      return res;
    },
    delete: async (id) => {
      const res = await store.team.save(id, { deleted: true });
      return res;
    },
    check: async ({ id, accessCode }) => {
      const res = await store.team.getById(id);
      if (res.code === "succeed") {
        if (res.data.accessCode === accessCode) {
          return {
            code: "succeed",
          };
        } else {
          return {
            code: "failed",
            message: "Access Code does not match",
          };
        }
      }
      return {
        code: "failed",
        message: res.message,
      };
    },
    upload: store.team.uploadFile,
    positions: [
      {
        val: 0,
        name: "Manager",
      },
      {
        val: 1,
        name: "Player",
      },
    ],
  };
  /** End Team Data / Functions */

  /** Begin Player Data / Functions */
  const [players, setPlayers] = useState({});
  const [playerLoading, setPlayerLoading] = useState(true);
  const player = {
    players,
    setPlayers,
    create: async (newPlayer) => {
      const res = await store.player.save(nanoid(5), newPlayer);
      return res;
    },
    read: async () => {
      setPlayerLoading(true);
      const res = await store.player.readAll(
        async (data) => {
          await setPlayers(data);
          console.info("players:", data);
        },
        () => setPlayerLoading(false)
      );
    },
    update: async (id, newTeam) => {
      const res = await store.player.save(id, newTeam);
      return res;
    },
    delete: async (id) => {
      await store.player.save(id, { deleted: true });
      // router.push('/');
    },
    upload: store.player.uploadFile,
  };
  /** End Player Data / Functions */

  /** Begin Match Data / Functions */
  const [matches, setMatches] = useState([]);
  const [matchLoading, setMatchLoading] = useState(true);
  const match = {
    matches,
    setMatches,
    create: async (newMatch) => {
      const res = await store.match.save(nanoid(5), newMatch);
      return res;
    },
    read: async () => {
      setMatchLoading(true);
      const res = await store.match.read(
        async (data) => {
          setMatches(data);
          console.info("matches:", data);
        },
        () => setMatchLoading(false)
      );
    },
    update: async (id, newTeam) => {
      const res = await store.match.save(id, newTeam);
      return res;
    },
    delete: async (id) => {
      await store.match.save(id, { deleted: true });
      // router.push('/');
    },
    fullDelete: async (id) => {
      const res = await store.match.delete(id);
      return res;
    },
    upload: store.match.uploadFile,
  };
  /** End Match Data / Functions */

  const isLoading = useMemo(() => {
    return organizationLoading || eventLoading || teamLoading || playerLoading;
  }, [organizationLoading, eventLoading, teamLoading, playerLoading]);

  const loadTournament = useCallback(() => {
    if (user && user.id) {
      organization.read(user.id);
      team.read(user.id);
    }
  }, [user]);

  useEffect(() => {
    loadTournament();
  }, [loadTournament]);

  useEffect(() => {
    event.read("");
    player.read();
    organization.read("");
    team.read("");
    match.read();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        matches,
        participants,
        organization,
        event,
        team,
        player,
        match,
        organizationLoading,
        eventLoading,
        matchLoading,
        playerLoading,
        teamLoading,
        currentTime,
        setCurrentTime,
      }}
    >
      {isLoading ? <Splash content={"Loading data..."} /> : props.children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;
