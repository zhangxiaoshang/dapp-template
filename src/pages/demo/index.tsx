import Link from "next/link";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { useSettings } from "@/hooks/use-settings";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAccount, useContractRead } from "wagmi";
import { useSnackbar } from "notistack";
import { useIsMounted } from "@/hooks/use-is-mounted";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

const demoPages = [
  {
    name: "no-layout-page",
    href: "/demo/no-layout-page",
  },
  {
    name: "Hash NFT",
    href: "/demo/hashnft",
  },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Demo() {
  const { settings, setSettings } = useSettings();
  const account = useAccount();
  const isMounted = useIsMounted();
  const { enqueueSnackbar } = useSnackbar();

  const name = useContractRead({
    chainId: 1,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // Tether USD https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#code
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "name",
  });

  return (
    <main className="text-center">
      <h2 className="text-left">Some Demo Pages</h2>

      <ul>
        {demoPages.map((page) => (
          <li key={page.href}>
            {/* doc: https://tailwindcss.com/docs/text-color */}
            <Link href={page.href} className="text-sky-500">
              {page.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-left">Use Mui</h2>

      <Button variant="contained" color="primary">
        Mui Button
      </Button>
      <Button variant="contained" color="secondary">
        Mui Button
      </Button>
      <Button variant="contained" color="success">
        Mui Button
      </Button>
      <Button variant="contained" color="error">
        Mui Button
      </Button>

      <Button variant="contained" color="primary" disabled={true}>
        Mui Button(Disabled)
      </Button>

      <h2 className="text-left">Mui with tailwind</h2>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="text-teal-600" />

      <h2 className="text-left">Ligh/Dark Theme</h2>

      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            onChange={(val) => {
              setSettings(
                val.target.checked
                  ? { ...settings, mode: "dark" }
                  : { ...settings, mode: "light" }
              );
            }}
          />
        }
        label={`MUI ${settings.mode}`}
      />

      <h2 className="text-left">wagmi</h2>
      {/* doc: https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142 */}
      {isMounted && <p>account by wagmi: {account.address}</p>}

      {/* wagmi hooks */}
      {isMounted && <p>name: {name.data}</p>}

      <h2 className="text-left">notistack</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => enqueueSnackbar("Hello", { variant: "success" })}
      >
        Open
      </Button>

      <h2 className="text-left">Card</h2>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </main>
  );
}
