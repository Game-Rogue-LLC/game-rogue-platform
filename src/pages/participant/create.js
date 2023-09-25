import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { STAFF_ROLES } from "@/src/config/global";
import Validator from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const initialInputs = {
  tid: ""
};

const rules = {
  tid: "required"
};

const customMessages = {
  "required.tid": "Team ID is required."
};

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, team, event } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (router?.query.event) {
      const newEID = router.query.event;
      event.setCurrent(newEID);
      organizer.setCurrent(event.events[newEID].oid);
    }
  }, [router]);

  useEffect(() => {
    setTitle("ADD A PARTICIPANT");
  }, []);

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    if (!Object.keys(team.teams).includes(data.tid)) {
      setErrors({
        tid: "Team with the id does not exist."
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handle = {
    create: async (e) => {
      // if (event.events[event.current].participants?.length >= event.events[event.current].participantsCount) {
      //   alert('You can\'t add more than ' + event.events[event.current].participantsCount + ' participants');
      //   return;
      // }
      if (validate(inputs, rules, customMessages) === false) return;

      setSaving(true);
      const res = await event.addParticipant(event.current, inputs.tid);
      if (res.code === "succeed") {
        router.push("/participant?event=" + event.current);
      } else if (res.code === "failed") {
        console.warn(res.message);
      }
      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Box>
        <FormControl fullWidth error={errors.tid !== undefined}>
          <OutlinedInput
            id="team-id"
            name="tid"
            value={inputs.tid}
            aria-describedby="team-id-helper"
            onChange={handle.inputs}
            sx={{ mt: 1 }}
            fullWidth
            required
          />
          {errors.tid !== undefined && (
            <FormHelperText id="team-id-helper" sx={{ mt: 2 }}>
              {errors.tid}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <LoadingButton loading={saving} variant="contained" onClick={handle.create}>
          ADD
        </LoadingButton>
      </Box>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
