import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Validator from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const initialInputs = {
  id: "",
  accessCode: ""
};

const rules = {
  id: "required",
  accessCode: "required"
};

const customMessages = {
  "required.id": "Team ID is required.",
  "required.accessCode": "Access Code is required."
};

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { team } = useTournamentContext();
  const [joining, setJoining] = useState(false);

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const joinTeam = async (data) => {
    if (validate(inputs, rules, customMessages) === false) return;
    setJoining(true);
    const res = await team.check(data);
    if (
      res.code === "succeed" &&
      team.teams[data.id].players.findIndex((val) => val.id == user.id) < 0
    ) {
      const newTeam = {
        players: [
          ...team.teams[data.id].players,
          {
            id: user.id,
            position: 1, // Player
            joinedOn: new Date()
          }
        ]
      };
      const upd = await team.update(data.id, newTeam);
      if (upd.code === "succeed") {
        router.push("/team/" + data.id);
      }
    } else {
      console.warn(res.message);
    }
    setJoining(false);
  };

  const handle = {
    join: async (e) => {
      joinTeam(inputs);
    },
    reset: async (e) => {
      setInputs({
        ...initialInputs
      });
    },
    inputs: async (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  useEffect(() => {
    const { id, accessCode } = router.query;
    if (id !== undefined && accessCode !== undefined) {
      setInputs({ id, accessCode });
    }
  }, [router]);

  useEffect(() => {
    setTitle("JOIN A TEAM");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3} spacing={2}>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-id">Team ID</InputLabel>
          <FormControl fullWidth error={errors.id !== undefined}>
            <OutlinedInput
              id="team-id"
              name="id"
              value={inputs.id}
              onChange={handle.inputs}
              aria-describedby="team-id-helper"
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.id !== undefined && (
              <FormHelperText id="team-id-helper" sx={{ mt: 2 }}>
                {errors.id}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-access-code">Access Code</InputLabel>
          <FormControl fullWidth error={errors.accessCode !== undefined}>
            <OutlinedInput
              id="team-access-code"
              name="accessCode"
              value={inputs.accessCode}
              aria-describedby="team-access-code-helper"
              onChange={handle.inputs}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.accessCode !== undefined && (
              <FormHelperText id="team-access-code-helper" sx={{ mt: 2 }}>
                {errors.accessCode}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item>
          <LoadingButton loading={joining} variant="contained" onClick={handle.join} sx={{ mr: 2 }}>
            Join
          </LoadingButton>
          <Button variant="contained" onClick={handle.reset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
