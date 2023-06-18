import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import Splash from "@/src/content/Splash";
import _ from "lodash";
import axios from "axios";
import { nanoid } from "nanoid";
import store from "@/lib/firestore/collections";
import { useAuthContext } from "@/src/context/AuthContext";

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
  const organization = {
    organizations,
    setOrganizations,
    current: useMemo(() => currentOrganization, [currentOrganization]),
    setCurrent: setCurrentOrganization,
    activecount: (uid) => {
      return _.filter(organizations, (val) => val.uid === uid).length;
    },
    create: async (newOrganization) => {
      const res = await store.organization.save(null, newOrganization);
      return res;
    },
    read: async (uid) => {
      setOrganizationLoading(true);
      const res = await store.organization.read(
        uid,
        (data, active) => {
          setOrganizations(data);
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
    upload: store.organization.uploadFile
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
        (data, active) => {
          setEvents(data);
          setActiveEventCount(active);
        },
        () => setEventLoading(false)
      );
    },
    readAll: async () => {
      setEventLoading(true);
      const res = await store.event.read(
        "",
        (data) => {
          setAllEvents(data);
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
        alert("Only " + events[id].participantsCount + " participants are allowed.");
        return {
          code: "failed",
          message: "Only " + events[id].participantsCount + " participants are allowed."
        };
      }
      if (events[id].participants?.findIndex((val) => val.id === tid) >= 0) {
        alert("This team is already registered.");
        return {
          code: "failed",
          message: "This team is already registered."
        };
      }
      let newParticipants = events[id]?.participants;
      if (!newParticipants) newParticipants = [];
      newParticipants = [
        ...newParticipants,
        {
          id: tid,
          score: 0,
          wins: 0,
          loses: 0,
          draws: 0,
          deleted: false,
          createdAt: new Date(),
          registeredAt: new Date()
        }
      ];

      const res = await event.update(id, { participants: newParticipants });
      return res;
    }
  };
  /** End Event Data / Functions */

  /** Begin Ticket Data / Functions */
  const [tickets, setTickets] = useState({});
  const [ticketLoading, setTicketLoading] = useState(true);
  const ticket = {
    tickets,
    setTickets,
    create: async (newTicket) => {
      const res = await store.ticket.save(null, newTicket);
      return res;
    },
    read: async () => {
      setTicketLoading(true);
      const res = await store.ticket.read(
        (data) => {
          setTickets(data);
        },
        () => setTicketLoading(false)
      );
    },
    update: async (id, newTicket) => {
      const res = await store.ticket.save(id, newTicket);
      return res;
    },
    delete: async (id) => {
      const res = await store.ticket.save(id, { deleted: true });
      return res;
    }
  };
  /** End Ticket Data / Functions */

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
        (data) => {
          setTeams(data);
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
            code: "succeed"
          };
        } else {
          return {
            code: "failed",
            message: "Access Code does not match"
          };
        }
      }
      return {
        code: "failed",
        message: res.message
      };
    },
    getPlacements: async (id) => {
      const res = await store.event.placements(id);
      if (res.code === "succeed") return res.data;
      else console.warn(res.message);
    },
    getUpcomingGames: (id) => {},
    getNews: (id) => {},
    upload: store.team.uploadFile
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
          setPlayers(data);
        },
        () => setPlayerLoading(false)
      );
    },
    exists: async (id) => {
      const res = await store.player.exists(id);
      if (res.code === "succeed") return true;
      return false;
    },
    update: async (id, newPlayer) => {
      console.log(id, newPlayer);
      const res = await store.player.save(id, newPlayer);
      return res;
    },
    delete: async (id) => {
      await store.player.save(id, { deleted: true });
      // router.push('/');
    },
    upload: store.player.uploadFile
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
        (data) => {
          setMatches(data);
        },
        () => setMatchLoading(false)
      );
    },
    update: async (id, newMatch) => {
      const res = await store.match.save(id, newMatch);
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
    upload: store.match.uploadFile
  };
  /** End Match Data / Functions */

  /** Begin Message Data / Functions */
  const [messages, setMessages] = useState({});
  const [messageLoading, setMessageLoading] = useState(true);
  const message = {
    messages,
    setMessages,
    create: async (newMessage) => {
      const res = await store.message.save(nanoid(), newMessage);
      return res;
    },
    read: async () => {
      setPostLoading(true);
      const res = await store.post.readAll(
        (data) => {
          setPosts(data);
        },
        () => setPostLoading(false)
      );
    },
    update: async (id, newMessage) => {
      const res = await store.message.save(id, newMessage);
      return res;
    },
    delete: async (id) => {
      await store.message.save(id, { deleted: true });
      // router.push('/');
    },
    fullDelete: async (id) => {
      const res = await store.message.delete(id);
      return res;
    }
  };
  /** End Message Data / Functions */

  /** Begin Posting Data / Functions */
  const [posts, setPosts] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const post = {
    posts,
    setPosts,
    create: async (newPost) => {
      const res = await store.post.save(null, newPost);
      return res;
    },
    read: async () => {
      setPostLoading(true);
      const res = await store.post.readAll(
        (data) => {
          setPosts(data);
        },
        () => setPostLoading(false)
      );
    },
    update: async (id, newPost, merge) => {
      const res = await store.post.save(id, newPost, merge);
      return res;
    },
    delete: async (id) => {
      await store.post.save(id, { deleted: true });
      // router.push('/');
    },
    fullDelete: async (id) => {
      const res = await store.post.delete(id);
      return res;
    }
  };
  /** End Posting Data / Functions */

  /** Begin Shop Data / Functions */
  const [shops, setShops] = useState([]);
  const [shopLoading, setShopLoading] = useState(true);
  const shop = {
    shops,
    setShops,
    create: async (newShop) => {
      const res = await store.shop.save(nanoid(5), newShop);
      return res;
    },
    read: async () => {
      setShopLoading(true);
      const res = await store.shop.read(
        (data) => {
          setShops(data);
        },
        () => setShopLoading(false)
      );
    },
    update: async (id, newShop) => {
      const res = await store.shop.save(id, newShop);
      return res;
    },
    delete: async (id) => {
      await store.shop.save(id, { deleted: true });
      // router.push('/');
    },
    fullDelete: async (id) => {
      const res = await store.shop.delete(id);
      return res;
    },
    upload: store.shop.uploadFile
  };
  /** End Match Data / Functions */

  const isLoading = useMemo(() => {
    return (
      organizationLoading ||
      eventLoading ||
      teamLoading ||
      playerLoading ||
      ticketLoading ||
      shopLoading
    );
  }, [organizationLoading, eventLoading, teamLoading, playerLoading, ticketLoading, shopLoading]);

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
    post.read();
    ticket.read();
    shop.read();
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
        ticket,
        post,
        shop,
        message,
        organizationLoading,
        eventLoading,
        matchLoading,
        playerLoading,
        teamLoading,
        postLoading,
        currentTime,
        setCurrentTime
      }}
    >
      {isLoading ? <Splash content={"Loading data..."} /> : props.children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;
