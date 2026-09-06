"use client";
import { Buzz, Points } from "@/utilities/types";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type BuzzEntryProps = {
  addBuzz: (buzz: Buzz) => void;
  roster: string[];
  onUnfocus: () => void;
};

const BuzzEntry = ({ addBuzz, roster, onUnfocus }: BuzzEntryProps) => {
  const [player, setPlayer] = useState("");
  const [points, setPoints] = useState<Points>(10);
  const [selecting, setSelecting] = useState(true);

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPoints(parseInt(e.target.value) as Points);
  };

  const handleSubmit = () => {
    if (player === "") return;
    const buzz = {
      player,
      points,
    };
    addBuzz(buzz);
    setPlayer("");
    setPoints(10);
  };

  const handleKeyPresses = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (e.shiftKey) {
          break;
        }
        if (!selecting && player !== "") {
          handleSubmit();
          setSelecting(true);
        } else {
          setSelecting(false);
        }
        break;
      case "Tab":
        e.preventDefault();
        if (points === 15) {
          setPoints(10);
        } else if (points === 10) {
          setPoints(-5);
        } else {
          setPoints(15);
        }
        break;
      default:
        return undefined;
    }
  };

  const renderAutocompleteTextField = (
    params: AutocompleteRenderInputParams,
  ) => (
    <TextField
      {...params}
      // onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPlayer(e.target.value)}
      // value={player}
      sx={{ backgroundClip: "white" }}
      size="small"
      autoFocus
    />
  );

  return (
    <Stack
      direction={"row"}
      sx={{ padding: 0.5, border: "1px solid black", borderRadius: 2 }}
      onKeyDown={handleKeyPresses}
      onBlur={onUnfocus}
    >
      <Autocomplete
        autoSelect
        autoHighlight
        popupIcon={null}
        onOpen={() => {
          setSelecting(true);
        }}
        options={roster}
        onChange={(event, value) => setPlayer(value ?? "")}
        value={player}
        renderInput={renderAutocompleteTextField}
        sx={{ pr: "1vw", minWidth: "10vw" }}
      />
      <RadioGroup
        row
        id="points-selector"
        aria-labelledby="points-radio-label"
        onChange={handlePointsChange}
        value={points}
      >
        <FormControlLabel value={15} control={<Radio />} label="15" />
        <FormControlLabel value={10} control={<Radio />} label="10" />
        <FormControlLabel value={-5} control={<Radio />} label="-5" />
      </RadioGroup>
      <Button onClick={handleSubmit}>Add</Button>
    </Stack>
  );
};

export default BuzzEntry;
