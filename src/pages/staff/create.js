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
import { STAFF_ROLES } from "@/src/config/global";
import Validator from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const initialInputs = {
  uid: "",
  role: ""
};

const rules = {
  uid: "required"
};

const customMessages = {
  "required.uid": "Rogue ID is required."
};

const steps = ["Input Rogue ID", "Select staff position"];

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, player } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (router?.query.organizer) {
      const newOID = router.query.organizer;
      organizer.setCurrent(newOID);
    }
  }, [router]);

  useEffect(() => {
    setTitle("ADD A STAFF");
  }, []);

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    if (!Object.keys(player.players).includes(data.uid)) {
      setErrors({
        uid: "User with the id does not exist."
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handle = {
    create: async (e) => {
      let newStaff = organizer.organizers[organizer.current]?.staff;
      if (!newStaff) newStaff = [];
      newStaff = [
        ...newStaff.filter((val) => val.uid !== inputs.uid),
        {
          uid: inputs.uid,
          role: inputs.role,
          deleted: false,
          lastLogin: new Date(),
          createdAt: new Date()
          // modifiedAt: new Date()
        }
      ];

      const res = await organizer.update(organizer.current, {
        staff: newStaff
      });

      if (res.code === "succeed") {
        router.push("/staff?organizer=" + organizer.current);
      } else if (res.code === "failed") {
        console.warn(res.message);
      }
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    next: () => {
      if (!validate(inputs, rules, customMessages)) return;
      setActiveStep((prev) => prev + 1);
    },
    finish: () => {
      setActiveStep((prev) => prev + 1);
    },
    back: () => {
      setActiveStep((prev) => prev - 1);
    },
    reset: () => {
      setActiveStep(0);
    }
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handle.create}>
                Save
              </Button>
              <Button variant="contained" onClick={handle.reset}>
                Reset
              </Button>
            </Box>
          </Fragment>
        ) : activeStep === 0 ? (
          <Fragment>
            <FormControl fullWidth error={errors.uid !== undefined}>
              <OutlinedInput
                id="rogue-id"
                name="uid"
                value={inputs.uid}
                aria-describedby="rogue-id-helper"
                onChange={handle.inputs}
                sx={{ mt: 1 }}
                fullWidth
                required
              />
              {errors.uid !== undefined && (
                <FormHelperText id="rogue-id-helper" sx={{ mt: 2 }}>
                  {errors.uid}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handle.back}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handle.next}>
                Next
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Select
              labelId="position-select-label"
              id="position-select"
              variant="outlined"
              sx={{ mt: 1 }}
              value={inputs.role}
              name="role"
              onChange={handle.inputs}
              fullWidth
            >
              {STAFF_ROLES.map((val, i) => (
                <MenuItem key={"staff_role_" + val.id} value={val.id}>
                  {val.name}
                </MenuItem>
              ))}
            </Select>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handle.back}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handle.finish}>
                Finish
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
